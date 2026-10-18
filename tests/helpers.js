// Shared fixture and helpers for the Playwright tests

import fs from 'node:fs';
import { test as base, expect } from '@playwright/test';

/** `page` fails the test on any JavaScript error, and on Vue hydration mismatches (the static HTML and the page rendered in the browser differ) */
export const test = base.extend({
    page: async ({ page }, use) => {
        // Navigate as soon as the HTML is parsed : waiting for the "load" event would also wait for the external resources (ie. Google fonts), which makes the tests depend on the network
        const [goto, reload] = [page.goto.bind(page), page.reload.bind(page)];
        page.goto = (url, options) => goto(url, { waitUntil: 'domcontentloaded', ...options });
        page.reload = options => reload({ waitUntil: 'domcontentloaded', ...options });

        const problems = [];
        page.on('pageerror', error => problems.push(`JavaScript error: ${error.message}`));
        page.on('console', message => {
            if (/hydration/i.test(message.text())) problems.push(`Hydration: ${message.text()}`);
        });

        await use(page);

        expect(problems, 'errors on the page').toEqual([]);
    },
});

export { expect };

// ---------------------------------------------------------------------------
// Website structure
// ---------------------------------------------------------------------------

/** Every documentation page, from the generated sidebar */
export const docsPages = (() => {
    const links = [];
    const walk = items => items.forEach(item => {
        if (item.link?.startsWith('/docs/')) links.push(item.link);
        if (item.items) walk(item.items);
    });
    walk(JSON.parse(fs.readFileSync(new URL('../src/.vitepress/docs.json', import.meta.url), 'utf8')).sidebar);

    return [...new Set(links)];
})();

/** The website pages other than the documentation */
export const sitePages = [
    { path: '/', title: 'AutoNumeric.js' },
    { path: '/configurator', title: 'Configurator' },
    { path: '/options', title: 'Options' },
    { path: '/examples', title: 'Examples' },
    { path: '/contacts', title: 'Contact' },
    { path: '/support', title: 'Support AutoNumeric' },
];

/** The navigation links, in their expected order (also used by the footer) */
export const navLinks = ['Documentation', 'Configuration generator', 'Options', 'Examples', 'Contact', 'Donate'];

/** The AutoNumeric version installed, used by the website and the documentation figures */
export const autoNumericVersion = JSON.parse(
    fs.readFileSync(new URL('../node_modules/autonumeric/package.json', import.meta.url), 'utf8'),
).version;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Computed CSS property of the first element matched by `locator` (optionally of a pseudo-element) */
export function css(locator, property, pseudo = null) {
    return locator.first().evaluate(
        (element, [name, pseudoElement]) => getComputedStyle(element, pseudoElement).getPropertyValue(name),
        [property, pseudo],
    );
}

/**
 * Mask image of an element (or of one of its pseudo-elements): the icons are drawn this way.
 * Chromium exposes it as `-webkit-mask-image`, Firefox as `mask-image`.
 */
export async function maskImage(locator, pseudo = null) {
    return (await css(locator, 'mask-image', pseudo)) || css(locator, '-webkit-mask-image', pseudo);
}

/** "rgb(12, 34, 56)" / "rgba(…)" -> [12, 34, 56] */
export function rgb(color) {
    return color.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
}

/** Opens `path` and scrolls to the top, so that the home page navigation bar is in its "top" state */
export async function open(page, path) {
    const response = await page.goto(path);
    await page.evaluate(() => window.scrollTo(0, 0));

    return response;
}

/**
 * The built content of a documentation page (without the navigation bar and the footer, whose
 * links would match on every page), or `null` when the website has not been built.
 */
function builtContent(route) {
    const file = route.endsWith('/')?`${route}index.html`:`${route}.html`;
    let html;
    try {
        html = fs.readFileSync(new URL(`.${file}`, new URL('../src/.vitepress/dist/', import.meta.url)), 'utf8');
    } catch {
        return null;
    }

    const start = html.indexOf('vp-doc');
    const end = html.indexOf('site-footer');

    return start === -1?html:html.slice(start, end === -1?undefined:end);
}

/**
 * Visits the documentation pages until `predicate(page)` returns true, and returns its path (or `null`).
 * `contains` narrows the candidates to the pages whose built HTML holds that text, which avoids opening the thirty pages one by one.
 */
export async function findDocsPage(page, predicate, { contains = null } = {}) {
    const candidates = contains
                       ?docsPages.filter(route => {
            const content = builtContent(route);
            return content === null || content.toLowerCase().includes(contains.toLowerCase());
        })
                       :docsPages;

    for (const path of candidates) {
        await page.goto(path);
        if (await predicate(page)) return path;
    }

    return null;
}
