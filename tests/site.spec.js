// Checks shared by every page : loading, navigation, footer, links

import { test, expect, sitePages, docsPages, navLinks, open } from './helpers.js';

test.describe('Every page', () => {
    for (const { path, title } of sitePages) {
        test(`${path} loads with its title, the navigation and the footer`, async ({ page }) => {
            const response = await open(page, path);
            expect(response.status()).toBe(200);

            await expect(page.locator('h1').first()).toContainText(title);
            await expect(page).toHaveTitle(/AutoNumeric/);
            await expect(page.locator('.VPNavBar')).toBeVisible();
            await expect(page.locator('.site-footer')).toBeVisible();
        });
    }

    test('an unknown page shows the 404 page', async ({ page }) => {
        await page.goto('/this-page-does-not-exist');
        await expect(page.getByText('There is nothing here')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Back to the home page' })).toHaveAttribute('href', '/');
    });

    test('the old /guide address redirects to /options, keeping the anchor', async ({ page }) => {
        await page.goto('/guide#decimalPlaces');
        await expect(page).toHaveURL(/\/options#decimalPlaces$/);
    });

    test('the logo stays available at its old address (used by the AutoNumeric README)', async ({ request }) => {
        const response = await request.get('/statics/icons/apple-icon-152x152.png');
        expect(response.ok()).toBe(true);
        expect(response.headers()['content-type']).toContain('image/png');
    });
});

test.describe('Navigation bar', () => {
    test('links are in the expected order', async ({ page }) => {
        await open(page, '/examples');
        await expect(page.locator('.VPNavBarMenu .VPNavBarMenuLink')).toHaveText(navLinks);
    });

    test('"Documentation" points to the documentation', async ({ page }) => {
        await open(page, '/examples');
        await expect(page.locator('.VPNavBarMenu .VPNavBarMenuLink', { hasText: 'Documentation' })).toHaveAttribute('href', '/docs/');
    });

    test('links lead to their page', async ({ page }) => {
        await open(page, '/');
        await page.locator('.VPNavBarMenu .VPNavBarMenuLink', { hasText: 'Configuration generator' }).click();
        await expect(page).toHaveURL(/\/configurator$/);
        await page.locator('.VPNavBarMenu .VPNavBarMenuLink', { hasText: 'Examples' }).click();
        await expect(page).toHaveURL(/\/examples$/);
    });
});

test.describe('Footer', () => {
    test('uses the same links, in the same order, as the navigation bar', async ({ page }) => {
        await open(page, '/');
        await expect(page.locator('.site-footer nav a')).toHaveText(navLinks);
    });

    test('shows the current copyright year, without the MIT license sentence', async ({ page }) => {
        await open(page, '/');
        const footer = page.locator('.site-footer');
        await expect(footer).toContainText(`2016–${new Date().getFullYear()}`);
        await expect(footer).not.toContainText('MIT license');
    });
});

test.describe('Links', () => {
    const pages = [...sitePages.map(({ path }) => path), ...docsPages];

    test('no link uses http:// for autonumeric.org, and no Travis CI badge is left', async ({ page }) => {
        for (const path of pages) {
            await page.goto(path);
            await expect(page.locator('a[href^="http://autonumeric.org"], a[href^="http://www.autonumeric.org"], a[href^="http://docs.autonumeric.org"]'), path).toHaveCount(0);
            await expect(page.locator('img[src^="http://autonumeric.org"]'), path).toHaveCount(0);
            await expect(page.locator('a[href*="travis-ci."], img[src*="travis"]'), path).toHaveCount(0);
        }
    });

    test('links to the website itself are internal, so they also work locally', async ({ page }) => {
        for (const path of pages) {
            await page.goto(path);
            await expect(page.locator('a[href^="https://autonumeric.org"], a[href^="https://www.autonumeric.org"]'), path).toHaveCount(0);
            // The importer lists the old documentation addresses it could not map
            await expect.soft(page.locator('.vp-doc a[href^="https://docs.autonumeric.org"]'), path).toHaveCount(0);
        }
    });

    test('every internal link leads to an existing page or file', async ({ page, request }) => {
        test.slow();
        const targets = new Map(); // url -> page where it was found
        for (const path of pages) {
            await page.goto(path);
            const hrefs = await page.locator('a[href]').evaluateAll(links => links.map(link => link.href));
            hrefs
                .filter(href => href.startsWith(new URL(page.url()).origin))
                .map(href => href.split('#')[0])
                .forEach(href => { if (!targets.has(href)) targets.set(href, path); });
        }

        for (const [url, foundOn] of targets) {
            const response = await request.get(url);
            expect.soft(response.status(), `${url} (linked from ${foundOn})`).toBeLessThan(400);
        }
    });

    test('images load', async ({ page }) => {
        for (const path of pages) {
            await page.goto(path);
            const broken = await page.locator('main img, .vp-doc img').evaluateAll(images => images
                .filter(image => image.src.startsWith(location.origin))
                .filter(image => image.complete && image.naturalWidth === 0)
                .map(image => image.src));
            expect.soft(broken, path).toEqual([]);
        }
    });
});
