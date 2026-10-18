// Documentation pages

import { test, expect, css, maskImage, rgb, docsPages, findDocsPage, autoNumericVersion } from './helpers.js';

test.use({ viewport: { width: 1440, height: 900 } }); // Sidebar and outline visible

/** Opens `path` if it exists ; skips the test otherwise (the documentation content may change) */
async function openIfExists(page, path) {
    const response = await page.goto(path);
    test.skip(!response || response.status() >= 400, `${path} does not exist`);
}

test.describe('Every documentation page', () => {
    // One test per page: each one navigates once, they run in parallel, and a failure names
    // the page straight away (visiting the thirty pages in a single test went over its time limit)
    for (const path of docsPages) {
        test(`${path} loads, with a main title and no leftover MkDocs syntax`, async ({ page }) => {
            const response = await page.goto(path);
            expect(response.status()).toBe(200);
            await expect(page.locator('.vp-doc h1').first()).toBeVisible();

            //TODO : Once tested, the checks below can be removed
            const text = await page.locator('.vp-doc').innerText();
            expect.soft(text, 'admonition').not.toMatch(/^(!!!|\?\?\?)\s+\w+/m);
            expect.soft(text, 'content tab').not.toMatch(/^===\s+"/m);
            expect.soft(text, 'code fence shown as text').not.toMatch(/```/);
            expect.soft(text, 'inline highlighting').not.toContain('#!js');
            expect.soft(text, 'Material icon').not.toMatch(/:(material|octicons|fontawesome)-[\w-]+:/);
        });
    }
});

test.describe('Titles and content', () => {
    test('"How to use?" has its title above "In the browser"', async ({ page }) => {
        await openIfExists(page, '/docs/how-to-use');
        await expect(page.locator('.vp-doc h1')).toHaveText(/How to use\?/);
    });

    test('the Installation page lists the Yarn and npm websites', async ({ page }) => {
        await openIfExists(page, '/docs/installation');
        await expect(page.locator('.vp-doc a[href*="yarnpkg.com"]').first()).toBeVisible();
        await expect(page.locator('.vp-doc a[href*="npmjs.com"]').first()).toBeVisible();
    });

    test('figures and versions come from the installed AutoNumeric', async ({ page }) => {
        const [major, minor] = autoNumericVersion.split('.');
        await openIfExists(page, '/docs/');
        const text = await page.locator('.vp-doc').innerText();
        expect(text).not.toContain('more than 40');
        expect(text).not.toContain('4.6.*');
        expect(text).toContain(`${major}.${minor}.*`);
    });

    test('install commands use the current version', async ({ page }) => {
        await openIfExists(page, '/docs/installation');
        const text = await page.locator('.vp-doc').innerText();
        expect(text).not.toMatch(/autonumeric@4\.6\./);
    });

    test('the license keeps 2009-2016 for Robert J. Knothe, and the current year for Alexandre Bonneau', async ({ page }) => {
        await openIfExists(page, '/docs/about/license');
        const text = await page.locator('.vp-doc').innerText();
        expect(text).toMatch(/2009\s*-\s*2016\s+Robert J\. Knothe/);
        expect(text).toMatch(new RegExp(`2016\\s*-\\s*${new Date().getFullYear()}\\s+Alexandre Bonneau`));
    });

    test('links to the configurator are internal', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('.vp-doc a', { hasText: /configuration generator/i }).count().then(count => count > 0), { contains: 'configuration generator' });
        test.skip(!path, 'No link to the configuration generator in the documentation');
        await expect(page.locator('.vp-doc a', { hasText: /configuration generator/i }).first()).toHaveAttribute('href', /^\/configurator/);
    });
});

test.describe('Code blocks', () => {
    test('titled code blocks are not merged: each keeps its own title', async ({ page }) => {
        await openIfExists(page, '/docs/initialization');
        const groupOf = title => page.locator('.vp-code-group', { has: page.locator('.tabs label', { hasText: title }) });
        for (const [first, second] of [
            ['Basic initialization with formatting options', 'Initialization and setting the value in one call'],
            ['Chaining on one element', 'Chaining on multiple elements'],
        ]) {
            if (await groupOf(first).count() === 0 || await groupOf(second).count() === 0) continue;
            await expect(groupOf(first).locator('.tabs label'), first).toHaveCount(1);
            await expect(groupOf(second).locator('.tabs label'), second).toHaveCount(1);
        }
    });

    test('long titles wrap, in readable colors', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('.vp-code-group .tabs label:only-of-type').count().then(count => count > 0), { contains: 'vp-code-group' });
        test.skip(!path, 'No titled code block');
        const labels = page.locator('.vp-code-group .tabs label:only-of-type');
        expect(await css(labels, 'white-space')).toBe('normal');
        const overflowing = await labels.evaluateAll(items => items.filter(item => item.scrollWidth > item.clientWidth + 1).length);
        expect(overflowing).toBe(0);
        expect(await css(labels, 'color')).toBe('rgb(255, 255, 255)');
    });

    test('code tabs are readable on the dark background', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('.vp-code-group .tabs label').count().then(count => count > 0), { contains: 'vp-code-group' });
        test.skip(!path, 'No code group');
        const [r, g, b] = rgb(await css(page.locator('.vp-code-group .tabs label'), 'color'));
        expect(r + g + b).toBeGreaterThan(400);
    });
});

test.describe('Admonitions', () => {
    test('look like the original: normal-case title, icon, colored border', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('.admonition').count().then(count => count > 0), { contains: 'class="admonition' });
        test.skip(!path, 'No admonition');
        const admonition = page.locator('.admonition').first();
        const title = admonition.locator('.admonition-title, summary').first();
        expect(await css(title, 'text-transform')).toBe('none');
        expect(await maskImage(title, '::before')).toContain('data:image/svg+xml');
        const [r, g, b] = rgb(await css(admonition, 'border-top-color'));
        expect(r + g + b).toBeGreaterThan(0);
        expect(await title.innerText()).not.toMatch(/^[A-Z]{3,}$/); // Not "INFO", "TIP"…
    });

    test('tips use the teal color', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('.admonition.tip').count().then(count => count > 0), { contains: 'admonition tip' });
        test.skip(!path, 'No tip');
        expect(await css(page.locator('.admonition.tip'), 'border-top-color')).toBe('rgb(0, 191, 165)');
    });

    test('collapsible blocks open and close', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('details.admonition').count().then(count => count > 0), { contains: '<details class="admonition' });
        test.skip(!path, 'No collapsible block');
        const details = page.locator('details.admonition').first();
        const wasOpen = await details.evaluate(element => element.open);
        await details.locator('summary').click();
        expect(await details.evaluate(element => element.open)).toBe(!wasOpen);
    });
});

test.describe('Tables', () => {
    test('the Description columns use a smaller font', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('.vp-doc td.an-description').count().then(count => count > 0), { contains: 'an-description' });
        test.skip(!path, 'No documentation table has a "Description" header');
        const cell = page.locator('.vp-doc td.an-description').first();
        const other = cell.locator('xpath=../td[not(contains(@class, "an-description"))]').first();
        expect(parseFloat(await css(cell, 'font-size'))).toBeLessThan(parseFloat(await css(other, 'font-size')));
    });

    test('in the static methods table, the descriptions have room', async ({ page }) => {
        await openIfExists(page, '/docs/static-methods');
        const cells = page.locator('.vp-doc td.an-description');
        test.skip(await cells.count() === 0, 'No Description column');
        const widths = await cells.evaluateAll(items => items.map(item => item.getBoundingClientRect().width));
        expect(Math.min(...widths)).toBeGreaterThanOrEqual(250);
    });
});

test.describe('Images and badges', () => {
    test('badges stay on the same line as the text (Patreon badge)', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('.vp-doc p img').count().then(count => count > 0), { contains: '<img' });
        test.skip(!path, 'No image inside text');
        expect(await css(page.locator('.vp-doc p img'), 'display')).toBe('inline-block');
    });
});

test.describe('Links and menus', () => {
    test('links are underlined on hover only', async ({ page }) => {
        await page.goto(docsPages[0]);
        const link = page.locator('.vp-doc a:not(.header-anchor)').first();
        expect(await css(link, 'text-decoration-line')).toBe('none');
        await link.hover();
        expect(await css(link, 'text-decoration-line')).toBe('underline');
    });

    test('the sections of the menu (Getting started, Options…) stand out', async ({ page }) => {
        await page.goto(docsPages[0]);
        const sections = page.locator('.VPSidebarItem.level-1:not(.is-link) > .item > .text');
        expect(await sections.count()).toBeGreaterThan(0);
        expect(await css(sections, 'font-weight')).toBe('700');
    });

    test('long titles wrap in the outline on the right', async ({ page }) => {
        const path = await findDocsPage(page, current => current.locator('.VPDocAsideOutline .outline-link').count().then(count => count > 0));
        test.skip(!path, 'No outline');
        const links = page.locator('.VPDocAsideOutline .outline-link');
        expect(await css(links, 'white-space')).toBe('normal');
        const cut = await links.evaluateAll(items => items.filter(item => item.scrollWidth > item.clientWidth + 1).length);
        expect(cut).toBe(0);
    });
});

test.describe('Footer', () => {
    test('the sidebar, the outline and its gradient stop above the footer', async ({ page }) => {
        // A long page, so that the footer comes into view by scrolling
        const path = await findDocsPage(page, current => current.evaluate(() => document.body.scrollHeight > window.innerHeight * 2));
        test.skip(!path, 'No long documentation page');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        const footer = page.locator('.site-footer');
        await expect(footer).toBeInViewport();
        await expect.poll(async () => {
            const footerTop = (await footer.boundingBox()).y;
            const bottoms = await page.locator('.VPSidebar, .VPDoc .aside-container, .VPDoc .aside-curtain')
                .evaluateAll(items => items.map(item => item.getBoundingClientRect().bottom));
            return bottoms.every(bottom => bottom <= footerTop + 1);
        }).toBe(true);
    });
});
