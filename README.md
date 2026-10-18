# [autonumeric.org](https://autonumeric.org)

This repository is the source of the [autonumeric.org](https://autonumeric.org) website, which presents the [AutoNumeric.js](https://github.com/autoNumeric/autoNumeric/) library and provides interactive tools and examples for it.

It is built with [VitePress](https://vitepress.dev) (Vue 3). Pull requests are welcome!

## Development

```sh
npm install
npm run dev      # http://localhost:8081
npm run build    # static website in src/.vitepress/dist
npm run preview  # serve the built website
npm test         # tests on the built website (run `npx playwright install chromium firefox` once)
```

The `.github/workflows/deploy.yml` workflow builds and tests every push and pull request, and deploys `master` on GitHub Pages when the tests pass.

## Where things are

```
src/
├─ index.md, options.md, examples.md, … One Markdown file per page (guide.md redirects to /options)
├─ docs/                                The documentation, imported from autonumeric-docs
├─ public/                              Static files (logo, icons, CNAME)
└─ .vitepress/
   ├─ config.mjs                        Site title, navigation, fonts
   └─ theme/
      ├─ style.css                      Colors and fonts, used by every page
      ├─ index.js                       Registers the components
      ├─ data/
      │  ├─ options.js                  Description of every AutoNumeric option
      │  └─ examples.js                 Content of the Examples page
      ├─ lib/                           AutoNumeric loader, option catalog, snippets, helpers
      └─ components/
         ├─ AnPage.vue                  Layout of every page but the home page
         ├─ AnInput.vue                 AutoNumeric input, with v-model
         ├─ HomePage.vue                Home page
         ├─ Configurator.vue            Options configurator
         ├─ OptionReference.vue         Options page (uses OptionDemo.vue)
         └─ ExampleGroup.vue            Examples page (uses ExampleCard.vue)
```

### Tests

End-to-end tests (Playwright) run against the built website:

```sh
npx playwright install chromium firefox   # once
npm run build && npm test         # all the tests (the build is required: the tests use it)
PORT=9000 npm test                # on another port (default: 8082, set in playwright.config.js)
npx playwright test --project=firefox   # one browser only
npm run test:ui                   # interactive mode, to debug a test
npx playwright test tests/home.spec.js -g "sun"   # one file, tests matching a name
```

| File | What it checks |
|---|---|
| `tests/site.spec.js` | Every page loads, navigation and footer (order, links), 404, old addresses, no `http://` nor Travis links, every internal link and image works |
| `tests/home.spec.js` | Home page: hero, small caps and icons, link colors, inline code, demo, "Previous / Next options", navigation bar over the hero, theme switch |
| `tests/configurator.spec.js` | Generated code, option dependencies (`caretPositionOnFocus`), caret really placed, shareable URL, copy, output formats, filter, links |
| `tests/options-examples.spec.js` | Options page (filter, back to top, demos, links) and every example |
| `tests/theme-responsive.spec.js` | Light by default, theme remembered, dark colors, small screens |
| `tests/docs.spec.js` | Documentation: titles, conversions, admonitions, code blocks, tables, badges, menus, footer |

Every test runs in Chromium and in Firefox, and fails on a JavaScript error or a Vue hydration mismatch (`tests/helpers.js`). Reading the clipboard is only possible in Chromium, so that single test is skipped in Firefox.

### Adding a page

Create a Markdown file in `src/`, with this frontmatter:

```md
---
layout: AnPage
title: My page
lead: One-line introduction shown under the title.
---

Content in Markdown. Components can be used directly, e.g. <AnInput :options="'euro'" />
```

Then add it to the navigation in `src/.vitepress/config.mjs` and, if needed, to the footer in `SiteFooter.vue`.

### Adding an example or documenting a new option

Edit `src/.vitepress/theme/data/examples.js` or `src/.vitepress/theme/data/options.js`: the pages are generated from these files.

The AutoNumeric version is set in `package.json` (`^4.10.10`). Keep its minimum up to date when a new version is released: npm installs the version tagged `latest` on the registry, which can lag behind the newest release. Note: If somehow the jsDelivr CDN does not respond in a timely manner, the version displayed is the one in this repo.

New AutoNumeric versions need no immediate work: options and named choices that the installed version provides but `options.js` does not describe are added automatically (`lib/optionCatalog.js`), marked as *new*. Describing them in `options.js` is enough.

When an option only works along with another one (like `caretPositionOnFocus`, which needs `selectOnFocus: false`), declare it with `requires` in `options.js`: the configurator then adds it to the generated code.

### Documentation

The original documentation was initially created and managed in the [autonumeric-docs](https://github.com/autoNumeric/autonumeric-docs) repository. This new version of autonumeric.org integrates that documentation so that the website is easier to navigate, to maintain, and more importantly allows for sharing config urls from the configurator, all while using a more up-to-date technology stack.

The documentation now lives at `https://autonumeric.org/docs/`, but links to docs.autonumeric.org are all over the web: issues, Stack Overflow answers, etc.
They have to keep working.

Redirecting pages have been written for the autonumeric-docs repository, which is being retired.
Each page redirects immediately, keeps the anchor, and declares the new address as canonical so search engines follow.

Old links to the `docs.autonumeric.org/Documentation/` website are redirected to the new `autonumeric.org/docs/` urls (static and archived pages are published on the old autonumeric-docs repository).
Old links to the guide are automatically redirected to the options page as well.

### Using AutoNumeric in a component

AutoNumeric needs the browser, so never import it statically. Use `<AnInput>`, or load it in `onMounted`:

```js
import { loadAutoNumeric } from '../lib/autonumeric';

onMounted(async () => {
    const AutoNumeric = await loadAutoNumeric();
});
```

## License

MIT
