import { defineConfig, devices } from '@playwright/test';

// End-to-end tests, run against the built website : `npm run build && npm test`.
//
// Port the tests use. Change it here (or with `PORT=9000 npm test`) ; this configuration starts
// its own preview server, so it does not have to match the `preview` script of package.json
const port = Number(process.env.PORT ?? 8082);

export default defineConfig({
    testDir      : 'tests',
    timeout      : 60_000, // Some tests visit every documentation page, which takes a while
    globalSetup  : './tests/global-setup.js', // Fails early if the website is not served
    fullyParallel: true,
    retries      : process.env.CI ? 1 : 0,
    reporter     : process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
    use          : {
        baseURL : `http://localhost:${port}`,
        viewport: { width: 1440, height: 900 }, // Large screen: every menu and panel is visible
        trace   : 'retain-on-failure',
    },
    projects     : [
        { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } } },
    ],
    webServer    : {
        command            : `npx vitepress preview src --port ${port}`,
        url                : `http://localhost:${port}`,
        // Never reuse a server we did not start : it could be another project on the same port
        reuseExistingServer: false,
        timeout            : 60_000,
    },
});
