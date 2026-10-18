// Home page : the look of the website, the demo, and the navigation bar over the hero

import { test, expect, css, rgb, open } from './helpers.js';
import { options } from '../src/.vitepress/theme/data/options.js';

const WHITE = 'rgb(255, 255, 255)';

/**
 * Small caps must not be disabled : Roboto has none, so the browser has to draw them.
 * `font-synthesis-small-caps` is recent, so browsers without it are not checked.
 */
async function expectSynthesizedSmallCaps(button) {
    const synthesis = await css(button, 'font-synthesis-small-caps');
    if (synthesis) expect(synthesis).toBe('auto');
}
const LINK_BLUE = 'rgb(2, 123, 227)'; // #027be3

test.beforeEach(async ({ page }) => {
    await open(page, '/');
});

test.describe('Hero', () => {
    test('shows the title, the tagline and the two buttons', async ({ page }) => {
        await expect(page.locator('.hero__title')).toHaveText('AutoNumeric.js');
        await expect(page.locator('.hero__tagline')).toContainText('Automatically format your numbers and currencies');
        await expect(page.locator('.hero__actions .an-button')).toHaveText(['Get started', 'Generate your formatting options']);
    });

    test('"Get started" leads to the documentation, the other button to the configurator', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/');
        await expect(page.getByRole('link', { name: 'Generate your formatting options' })).toHaveAttribute('href', '/configurator');
    });

    test('the buttons use small caps and have their icons', async ({ page }) => {
        const buttons = page.locator('.hero__actions .an-button');
        for (const button of await buttons.all()) {
            expect(await css(button, 'font-variant-caps')).toBe('all-small-caps');
            // VitePress disables synthesized small caps, which Roboto needs
            await expectSynthesizedSmallCaps(button);
            await expect(button.locator('svg.an-icon')).toHaveCount(1);
        }
    });

    test('shows the latest AutoNumeric version (4.10 or newer)', async ({ page }) => {
        const version = page.locator('.hero__version code');
        // Up to 3 seconds waiting for jsDelivr, then the version installed is shown
        await expect(version).toHaveText(/^\d+\.\d+\.\d+/, { timeout: 10_000 });
        const [major, minor] = (await version.textContent()).split('.').map(Number);
        expect(major * 1000 + minor).toBeGreaterThanOrEqual(4010);
    });
});

test.describe('Texts', () => {
    test('the option count matches the documented options ("more than 50")', async ({ page }) => {
        const expected = Math.floor(options.length / 10) * 10;
        expect(expected).toBeGreaterThanOrEqual(50); //TODO : Update this test when we add new options to AutoNumeric
        await expect(page.locator('.key-features')).toContainText(`more than ${expected} options`);
        await expect(page.locator('body')).not.toContainText('more than 40');
    });

    test('the feedback text is correct', async ({ page }) => {
        await expect(page.locator('.involve')).toContainText('Your ideas and comments are very important to us.');
    });

    test('links in the light sections are blue, including the feature texts', async ({ page }) => {
        for (const name of ['live demo', 'configuration generator', 'examples', 'Web Workers', 'hard to play with', 'third-party frameworks']) {
            const link = page.locator('.what a, .features a').filter({ hasText: name }).first();
            await expect(link, name).toBeVisible();
            expect(await css(link, 'color'), name).toBe(LINK_BLUE);
        }
    });

    test('inline code has a light grey background', async ({ page }) => {
        const codes = page.locator('.what :not(pre) > code');
        expect(await codes.count()).toBeGreaterThan(2);
        expect(await css(codes, 'background-color')).toBe('rgba(27, 31, 35, 0.05)');
    });
});

test.describe('"Try it" demo', () => {
    test('formats the value, and shows the raw value', async ({ page }) => {
        const input = page.locator('.try__input');
        await expect(input).toHaveValue(/€/); // French format, applied once AutoNumeric is loaded

        await input.click();
        await input.press('ControlOrMeta+a');
        await input.pressSequentially('9876');
        await expect(page.locator('.try__raw')).toContainText('9876');
    });

    test('"Previous options" / "Next options" look is correct (grey, small caps, arrows)', async ({ page }) => {
        const buttons = page.locator('.try__controls .an-button');
        await expect(buttons).toHaveText(['Previous options', 'Next options']);
        for (const button of await buttons.all()) {
            expect(await css(button, 'font-variant-caps')).toBe('all-small-caps');
            expect(await css(button, 'color')).toBe('rgb(158, 158, 158)');
            expect(await css(button, 'background-color')).toBe('rgba(0, 0, 0, 0)');
            await expect(button.locator('svg.an-icon')).toHaveCount(1);
        }

        await buttons.last().hover();
        await expect.poll(() => css(buttons.last(), 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('cycles through the formats, with the code and the dots following', async ({ page }) => {
        const code = page.locator('.source__code');
        const dots = page.locator('.source__dots button');
        await expect(code).toContainText('.french()');
        await expect(dots.nth(0)).toHaveAttribute('aria-selected', 'true');

        await page.getByRole('button', { name: 'Next options' }).click();
        await expect(code).toContainText('.northAmerican()');
        await expect(dots.nth(1)).toHaveAttribute('aria-selected', 'true');
        await expect(page.locator('.try__input')).toHaveValue(/\$/);

        await page.getByRole('button', { name: 'Previous options' }).click();
        await page.getByRole('button', { name: 'Previous options' }).click();
        await expect(dots.last()).toHaveAttribute('aria-selected', 'true');

        await dots.nth(2).click();
        await expect(code).toContainText("currencySymbol : 'Ω'");
    });
});

test.describe('"Try it" demo with style rules', () => {
    test('the style rules format colors the input as soon as it is shown', async ({ page }) => {
        const index = await page.locator('.source__dots button').count();
        for (let i = 0; i < index; i++) {
            await page.locator('.source__dots button').nth(i).click();
            if (await page.locator('.source__code').textContent().then(text => text.includes('styleRules'))) break;
        }
        await expect(page.locator('.try__input')).toHaveClass(/autoNumeric-positive/);

        // Leaving that format removes its classes
        await page.getByRole('button', { name: 'Next options' }).click();
        await expect(page.locator('.try__input')).not.toHaveClass(/autoNumeric-/);
    });
});

test.describe('"Get involved" section', () => {
    test('the three buttons use small caps', async ({ page }) => {
        const buttons = page.locator('.involve .an-button');
        await expect(buttons).toHaveText(['Fork on Github', 'Donate', 'Open an issue']);
        for (const button of await buttons.all()) {
            expect(await css(button, 'font-variant-caps')).toBe('all-small-caps');
            await expectSynthesizedSmallCaps(button);
        }
    });

    test('"Donate" turns green on hover', async ({ page }) => {
        const donate = page.locator('.involve .an-button', { hasText: 'Donate' });
        await donate.hover();
        await expect.poll(() => css(donate, 'background-color')).toBe('rgb(34, 139, 34)'); // forestgreen
    });
});

test.describe('Navigation bar over the hero', () => {
    test('is blue with white links', async ({ page }) => {
        // The navigation bar fades to the hero blue: wait for the end of the transition
        await expect.poll(() => css(page.locator('.VPNavBar'), 'background-color')).toBe('rgb(0, 148, 255)');
        await expect.poll(() => css(page.locator('.VPNavBarMenuLink'), 'color')).toBe(WHITE);
    });

    test('links get a light blue background on hover', async ({ page }) => {
        const link = page.locator('.VPNavBarMenuLink').first();
        await link.hover();
        await expect.poll(() => css(link, 'background-color')).toBe('rgba(174, 217, 255, 0.25)');
    });

    test('the search button is readable (white text)', async ({ page }) => {
        await expect.poll(() => css(page.locator('.DocSearch-Button-Placeholder'), 'color')).toBe(WHITE);
    });

    test('the theme switch looks like on the other pages, with a visible sun', async ({ page }) => {
        const sun = page.locator('.VPNavBarAppearance .vpi-sun');
        const moon = page.locator('.VPNavBarAppearance .vpi-moon');
        await expect.poll(() => css(sun, 'opacity')).toBe('1');
        await expect.poll(() => css(moon, 'opacity')).toBe('0');
        // The sun is drawn on the white knob, so it must not be white !
        const [r, g, b] = rgb(await css(sun, 'color'));
        expect(r + g + b).toBeLessThan(600);

        const onOtherPage = await (async () => {
            await open(page, '/examples');
            return css(page.locator('.VPNavBarAppearance .vpi-sun'), 'color');
        })();
        await open(page, '/');
        expect(await css(page.locator('.VPNavBarAppearance .vpi-sun'), 'color')).toBe(onOtherPage);
    });

    test('the theme switch shows the moon once activated', async ({ page }) => {
        await page.locator('.VPNavBarAppearance .VPSwitchAppearance').click();
        await expect(page.locator('html')).toHaveClass(/dark/);
        await expect.poll(() => css(page.locator('.VPNavBarAppearance .vpi-moon'), 'opacity')).toBe('1');
        await expect.poll(() => css(page.locator('.VPNavBarAppearance .vpi-sun'), 'opacity')).toBe('0');
    });

    test('takes the normal style once the page is scrolled', async ({ page }) => {
        await page.mouse.wheel(0, 800);
        await expect.poll(() => css(page.locator('.VPNavBarMenuLink').first(), 'color')).not.toBe(WHITE);
    });
});
