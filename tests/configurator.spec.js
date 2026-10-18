// Configurator : generated code, option dependencies, live input, shareable URL, formats, links

import { test, expect } from './helpers.js';
import { options } from '../src/.vitepress/theme/data/options.js';

const code = page => page.locator('.cfg__code');
const choose = (page, option, choice) => page.locator(`#${option} input[type=radio][value="${choice}"]`).check();

test.beforeEach(async ({ page }) => {
    await page.goto('/configurator');
    await expect(page.locator('#cfg-try')).toHaveValue(/\d/); // AutoNumeric is loaded
});

test.describe('Generated code', () => {
    test('is empty until an option is chosen, and default values are left out', async ({ page }) => {
        await expect(code(page)).toHaveText('{}');
        await choose(page, 'decimalPlaces', 'two'); // The default value
        await expect(code(page)).toHaveText('{}');
        await expect(page.getByRole('button', { name: 'Select at least one option' })).toBeDisabled();
    });

    test('contains the chosen options, in simplified or detailed form', async ({ page }) => {
        await choose(page, 'decimalPlaces', 'none');
        await expect(code(page)).toContainText('decimalPlaces: 0');

        await page.getByRole('radio', { name: 'Detailed code' }).click();
        await expect(code(page)).toContainText('decimalPlaces: AutoNumeric.options.decimalPlaces.none');
    });

    test('marks the modified options', async ({ page }) => {
        await choose(page, 'decimalPlaces', 'none');
        await expect(page.locator('#decimalPlaces')).toHaveClass(/modified/);
        await expect(page.locator('#currencySymbol')).not.toHaveClass(/modified/);
    });

    test('accepts custom values', async ({ page }) => {
        const option = options.find(item => item.isOptionChoiceOpen).name;
        await page.locator(`#${option} .cfg__custom`).fill('7');
        await expect(page.locator(`#${option} input[type=radio][value="__custom__"]`)).toBeChecked();
        await expect(code(page)).toContainText(`${option}: '7'`);
    });

    test('"Clear the form" removes every option', async ({ page }) => {
        await choose(page, 'decimalPlaces', 'none');
        await page.getByRole('button', { name: 'Clear the form' }).click();
        await expect(code(page)).toHaveText('{}');
        await expect(page.locator('#decimalPlaces input[value="none"]')).not.toBeChecked();
    });
});

test.describe('Option dependencies', () => {
    test('choosing a caret position adds selectOnFocus: false, with a note', async ({ page }) => {
        await choose(page, 'caretPositionOnFocus', 'end');
        await expect(code(page)).toContainText("caretPositionOnFocus: 'end'");
        await expect(code(page)).toContainText('selectOnFocus: false');
        await expect(page.locator('.cfg__note').first()).toContainText('selectOnFocus');
    });

    test('warns when selectOnFocus was explicitly set to select', async ({ page }) => {
        await choose(page, 'selectOnFocus', 'select');
        await choose(page, 'caretPositionOnFocus', 'end');
        await expect(page.locator('.cfg__note--warning')).toContainText('has no effect');
        await expect(code(page)).not.toContainText('selectOnFocus');
    });
});

test.describe('Live test input', () => {
    test('applies the chosen options', async ({ page }) => {
        const input = page.locator('#cfg-try');
        await expect(input).toHaveValue(/\.\d/);
        await choose(page, 'decimalPlaces', 'none');
        await expect(input).not.toHaveValue(/\.\d/);
    });

    test('by default, the whole value is selected on focus', async ({ page }) => {
        const input = page.locator('#cfg-try');
        await input.focus();
        await expect.poll(() => input.evaluate(element => element.selectionStart === 0
            && element.selectionEnd === element.value.length)).toBe(true);
    });

    test('the caret position option is really applied (the reported bug)', async ({ page }) => {
        await choose(page, 'caretPositionOnFocus', 'end');
        const input = page.locator('#cfg-try');
        await page.locator('#cfg-filter').focus(); // Make sure the input is not focused yet
        await input.focus();
        await expect.poll(() => input.evaluate(element => element.selectionStart === element.selectionEnd
            && element.selectionEnd === element.value.length)).toBe(true);

        await page.locator('#cfg-filter').focus();
        await choose(page, 'caretPositionOnFocus', 'start');
        await input.focus();
        await expect.poll(() => input.evaluate(element => element.selectionStart === element.selectionEnd
            && element.selectionStart <= 1)).toBe(true);
    });
});

test.describe('Shareable URL', () => {
    test('follows the form', async ({ page }) => {
        await choose(page, 'caretPositionOnFocus', 'end');
        await expect(page).toHaveURL(/caretPositionOnFocus=end/);
        await page.locator('.cfg__format select').selectOption('vue');
        await expect(page).toHaveURL(/format=vue/);
        await page.getByRole('button', { name: 'Clear the form' }).click();
        await expect(page).not.toHaveURL(/caretPositionOnFocus/);
    });

    test('restores a configuration, including custom values, the code style and the format', async ({ page }) => {
        const open = options.find(item => item.isOptionChoiceOpen).name;
        await page.goto(`/configurator?decimalPlaces=none&${open}=~7&code=detailed&format=javascript`);

        await expect(page.locator('#decimalPlaces input[value="none"]')).toBeChecked();
        await expect(page.locator(`#${open} input[type=radio][value="__custom__"]`)).toBeChecked();
        await expect(page.locator(`#${open} .cfg__custom`)).toHaveValue('7');
        await expect(page.getByRole('radio', { name: 'Detailed code' })).toHaveAttribute('aria-checked', 'true');
        await expect(code(page)).toContainText("new AutoNumeric('#myInput'");
        await expect(code(page)).toContainText('AutoNumeric.options.decimalPlaces.none');
    });

    test('ignores unknown options and choices', async ({ page }) => {
        await page.goto('/configurator?notAnOption=1&decimalPlaces=notAChoice');
        await expect(code(page)).toHaveText('{}');
    });
});

test.describe('Copy', () => {
    test('copies the code, then the link', async ({ page, context, browserName }) => {
        // Only Chromium lets a test read the clipboard
        test.skip(browserName !== 'chromium', 'The clipboard can only be read in Chromium');
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);

        await choose(page, 'decimalPlaces', 'none');
        await page.getByRole('button', { name: /Copy the option/ }).click();
        await expect(page.locator('.cfg__status')).toContainText('copied');
        expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('decimalPlaces: 0');

        await page.getByRole('button', { name: 'Copy link' }).click();
        expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('/configurator?decimalPlaces=none');
    });
});

test.describe('Output formats', () => {
    const cases = {
        javascript: ["import AutoNumeric from 'autonumeric'", "new AutoNumeric('#myInput', {"],
        vue       : ['<script setup>', 'onMounted', 'new AutoNumeric(input.value, {', 'anElement?.remove()'],
        react     : ['useEffect', 'new AutoNumeric(input.current, {', '<input ref={input}'],
    };

    for (const [format, fragments] of Object.entries(cases)) {
        test(`${format} snippet`, async ({ page }) => {
            await choose(page, 'decimalPlaces', 'none');
            await page.locator('.cfg__format select').selectOption(format);
            for (const fragment of fragments) await expect(code(page)).toContainText(fragment);
            await expect(code(page)).toContainText('decimalPlaces: 0');
        });
    }
});

test.describe('Filter and links', () => {
    test('the filter keeps the matching options only', async ({ page }) => {
        await page.locator('#cfg-filter').fill('wheel');
        await expect(page.locator('#wheelStep')).toBeVisible();
        await expect(page.locator('#currencySymbol')).toHaveCount(0);
        await page.locator('#cfg-filter').fill('zzzz');
        await expect(page.locator('.cfg__empty')).toBeVisible();
    });

    test('each option links to its demo on the Options page', async ({ page }) => {
        const link = page.locator('#decimalPlaces .cfg__demo-link');
        await expect(link).toHaveAttribute('href', '/options#decimalPlaces');
        await link.click();
        await expect(page).toHaveURL(/\/options#decimalPlaces$/);
        await expect(page.locator('section#decimalPlaces')).toBeInViewport();
    });

    test('the result panel stays visible while scrolling (large screens)', async ({ page }) => {
        await page.locator('#valuesToStrings').scrollIntoViewIfNeeded();
        await expect(page.locator('.cfg__code')).toBeInViewport();
    });
});
