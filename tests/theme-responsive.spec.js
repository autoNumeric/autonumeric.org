// Light & dark theme, and small screens tests

import { test, expect, css, rgb, sitePages, docsPages } from './helpers.js';

test.describe('Theme', () => {
    test.describe('with a dark system preference', () => {
        test.use({ colorScheme: 'dark' });

        test('the website is still light by default', async ({ page }) => {
            await page.goto('/examples');
            await expect(page.locator('html')).not.toHaveClass(/dark/);
        });
    });

    test('the chosen theme is remembered', async ({ page }) => {
        await page.goto('/examples');
        await page.locator('.VPNavBarAppearance .VPSwitchAppearance').click();
        await expect(page.locator('html')).toHaveClass(/dark/);
        await page.reload();
        await expect(page.locator('html')).toHaveClass(/dark/);
    });

    test('in dark mode, the content and the inputs switch to dark colors', async ({ page }) => {
        await page.goto('/configurator');
        await page.locator('.VPNavBarAppearance .VPSwitchAppearance').click();
        await expect(page.locator('html')).toHaveClass(/dark/);

        const [r, g, b] = rgb(await css(page.locator('#cfg-try'), 'background-color'));
        expect(r + g + b).toBeLessThan(150);
        const [tr, tg, tb] = rgb(await css(page.locator('.vp-doc p').first(), 'color'));
        expect(tr + tg + tb).toBeGreaterThan(500);
    });
});

test.describe('Small screens', () => {
    test.use({ viewport: { width: 375, height: 740 } });

    for (const path of [...sitePages.map(item => item.path), ...docsPages.slice(0, 5)]) {
        test(`${path} does not scroll sideways`, async ({ page }) => {
            await page.goto(path);
            const { overflow, culprits } = await page.evaluate(() => {
                // An element inside a horizontally scrollable box (a table…) may go past the edge
                // without widening the page: only the others are reported
                const scrolls = element => {
                    for (let node = element.parentElement; node && node !== document.documentElement; node = node.parentElement) {
                        if (['auto', 'scroll', 'hidden'].includes(getComputedStyle(node).overflowX)) return true;
                    }
                    return false;
                };
                const describe = element => {
                    const { right, width } = element.getBoundingClientRect();
                    const name = `${element.tagName.toLowerCase()}${[...element.classList].map(item => `.${item}`).join('')}`;
                    const parent = element.parentElement;
                    return `${name} (right: ${Math.round(right)}px, width: ${Math.round(width)}px,`
                        + ` inside ${parent.tagName.toLowerCase()}${[...parent.classList].map(item => `.${item}`).join('')})`;
                };

                return {
                    overflow: document.documentElement.scrollWidth - window.innerWidth,
                    culprits: [...document.querySelectorAll('body *')]
                        .filter(element => element.getBoundingClientRect().right > window.innerWidth + 1
                            && element.getBoundingClientRect().width > 0
                            && getComputedStyle(element).position !== 'fixed'
                            && !scrolls(element))
                        .slice(0, 5)
                        .map(describe),
                };
            });
            expect(overflow, `elements going past the right edge: ${culprits.join(', ') || 'none found'}`).toBeLessThanOrEqual(1);
        });
    }

    test('the navigation is in the menu button', async ({ page }) => {
        await page.goto('/examples');
        await page.locator('.VPNavBarHamburger').click();
        await expect(page.locator('.VPNavScreen').getByRole('link', { name: 'Configuration generator' })).toBeVisible();
    });

    test('the configurator shows the result panel before the options', async ({ page }) => {
        await page.goto('/configurator');
        const panel = await page.locator('.cfg__result').boundingBox();
        const form = await page.locator('.cfg__form').boundingBox();
        expect(panel.y).toBeLessThan(form.y);
    });
});
