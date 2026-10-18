// Checks, before running anything, that the website served is the one we want to test.
// Without this, a missing build or another server on the same port makes every test fail with confusing "element not found" errors.

import { request } from '@playwright/test';

export default async function globalSetup(config) {
    const { baseURL } = config.projects[0].use;
    const context = await request.newContext({ baseURL });

    const fail = message => {
        throw new Error(`${message}\n\n`
            + `  The tests run against the built website, served at ${baseURL}.\n`
            + '  Build it with `npm run build`, and check that no other server uses that port.\n');
    };

    try {
        const home = await context.get('/');
        if (!home.ok()) fail(`The home page answered ${home.status()} instead of 200.`);
        if (!(await home.text()).includes('AutoNumeric')) fail('The page served at that address is not the AutoNumeric website.');

        for (const path of ['/configurator', '/options', '/docs/']) {
            const page = await context.get(path);
            if (!page.ok()) fail(`${path} answered ${page.status()}: the built website is missing or out of date.`);
        }
    } finally {
        await context.dispose();
    }
}
