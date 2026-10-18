// Options page (option reference) and Examples page

import { test, expect, css, maskImage } from './helpers.js';
import { options } from '../src/.vitepress/theme/data/options.js';
import { exampleGroups } from '../src/.vitepress/theme/data/examples.js';
import { slugify } from '../src/.vitepress/theme/lib/autonumeric.js';

test.describe('Options page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/options');
    });

    test('lists every documented option, in the summary table and as demos', async ({ page }) => {
        await expect(page.locator('.option-summary tbody tr')).toHaveCount(await page.locator('section.option-demo').count());
        expect(await page.locator('section.option-demo').count()).toBeGreaterThanOrEqual(options.length);
    });

    test('links to the complete documentation', async ({ page }) => {
        const link = page.locator('.vp-doc').getByRole('link', { name: 'complete documentation' });
        await expect(link).toHaveAttribute('href', '/docs/');
    });

    test('the filter keeps the matching options, in the table and the demos', async ({ page }) => {
        await page.getByLabel(/Filter the \d+ options/).fill('caret');
        await expect(page.locator('section#caretPositionOnFocus')).toBeVisible();
        await expect(page.locator('section#currencySymbol')).toHaveCount(0);
        await expect(page.locator('.option-summary tbody tr')).toHaveCount(await page.locator('section.option-demo').count());
        await expect(page.locator('.filter-field__count')).toHaveText(/^\d+ \/ \d+$/);
    });

    test('the filter stays visible while scrolling', async ({ page }) => {
        await page.locator('section#valuesToStrings').scrollIntoViewIfNeeded();
        await expect(page.locator('#options-filter')).toBeInViewport();
    });

    test('the "back to top" button appears when scrolling down, and scrolls back up', async ({ page }) => {
        const button = page.getByRole('button', { name: 'Back to top' });
        await expect(button).toBeHidden();
        await page.evaluate(() => window.scrollTo(0, 4000));
        await expect(button).toBeVisible();
        await button.click();
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
        await expect(button).toBeHidden();
    });

    test('the Description column uses a smaller font', async ({ page }) => {
        const row = page.locator('.option-summary tbody tr').first();
        const optionSize = parseFloat(await css(row.locator('td').first(), 'font-size'));
        const descriptionSize = parseFloat(await css(row.locator('td.an-description'), 'font-size'));
        expect(descriptionSize).toBeLessThan(optionSize);
    });

    test('demos are formatted once scrolled into view, and share their value', async ({ page }) => {
        const demo = page.locator('section#decimalPlaces');
        await demo.scrollIntoViewIfNeeded();
        const inputs = demo.locator('.an-input');
        await expect(inputs.first()).toHaveValue(/\d/);

        await inputs.first().click();
        await inputs.first().press('ControlOrMeta+a');
        await inputs.first().pressSequentially('42');
        await expect(inputs.nth(1)).toHaveValue(/42/);
        await expect(demo.locator('.option-demo__raw')).toContainText('42');
    });

    test('each option links to the configurator', async ({ page }) => {
        const link = page.locator('section#decimalPlaces .option-demo__configure');
        await expect(link).toHaveAttribute('href', '/configurator#decimalPlaces');
        await link.click();
        await expect(page.locator('fieldset#decimalPlaces')).toBeInViewport();
    });

    test('the tip box has the documentation look (title in normal case, icon)', async ({ page }) => {
        const title = page.locator('.custom-block.tip .custom-block-title');
        await expect(title).toHaveText('Build your own configuration');
        expect(await css(title, 'text-transform')).toBe('none');
        expect(await maskImage(title, '::before')).toContain('data:image/svg+xml');
        expect(await css(page.locator('.custom-block.tip'), 'border-top-color')).toBe('rgb(0, 191, 165)');
    });
});

test.describe('Examples page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/examples');
    });

    test('every example is formatted, with its raw value and code', async ({ page }) => {
        const examples = exampleGroups.flatMap(group => group.examples);
        await expect(page.locator('section.example')).toHaveCount(examples.length);

        for (const example of examples) {
            const section = page.locator(`section#${slugify(example.name)}`);
            await section.scrollIntoViewIfNeeded();
            await expect(section.locator('.an-input'), example.name).toHaveValue(/\S/);
            await expect(section.locator('.example__raw code'), example.name).toHaveText(/\S/);
            await expect(section.locator('.an-code'), example.name).toContainText('new AutoNumeric(');
            await expect(section.locator('.an-error'), example.name).toHaveCount(0);
        }
    });

    test('style rules apply their CSS classes', async ({ page }) => {
        const example = exampleGroups.find(group => group.id === 'styleRules').examples
            .find(item => item.styleRule === 'positiveNegative');
        const input = page.locator(`section#${slugify(example.name)} .an-input`);
        await input.scrollIntoViewIfNeeded();
        await expect(input).toHaveClass(/autoNumeric-positive/);

        await input.click();
        await input.press('ControlOrMeta+a');
        await input.pressSequentially('-5');
        await expect(input).toHaveClass(/autoNumeric-negative/);
    });

    test('each example has an anchor link', async ({ page }) => {
        const first = exampleGroups[0].examples[0];
        await expect(page.locator(`section#${slugify(first.name)} .example__anchor`)).toHaveAttribute('href', `#${slugify(first.name)}`);
    });
});
