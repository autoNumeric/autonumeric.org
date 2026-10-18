import fs from 'node:fs';
import { defineConfig } from 'vitepress';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import descriptionColumns from './markdown/descriptionColumns.mjs';

// Sidebar of the documentation
const docs = JSON.parse(fs.readFileSync(new URL('./docs.json', import.meta.url), 'utf8'));

export default defineConfig({
    lang       : 'en-US',
    title      : 'AutoNumeric.js',
    description: 'AutoNumeric is a JavaScript library that provides live as-you-type formatting for international numbers and currencies.',

    cleanUrls : true, // shows /configurator instead of /configurator.html

    // Light/dark toggle in the navigation bar ; light by default, whatever the system preference.
    // The visitor's choice is then remembered by the browser.
    appearance: { initialValue: 'light' },

    head: [
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-icon-152x152.png' }],
        ['meta', { name: 'theme-color', content: '#0094ff' }],
        ['meta', { name: 'author', content: 'Alexandre Bonneau' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', {
            rel : 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Roboto:wght@300;400;500&display=swap',
        }],
    ],

    markdown: {
        theme : 'monokai',
        // Titles of the ::: containers when none is given, in normal case like the documentation
        container: {
            infoLabel   : 'Info',
            tipLabel    : 'Tip',
            warningLabel: 'Warning',
            dangerLabel : 'Danger',
            detailsLabel: 'Details',
        },
        config: md => {
            md.use(footnote); // [^1] footnotes, used by the documentation
            md.use(deflist);  // Term / : definition lists, used by the documentation
            md.use(descriptionColumns); // Smaller "Description" columns in tables
        },
    },

    themeConfig: {
        logo     : '/logo.svg',
        siteTitle: 'AutoNumeric.js',

        nav: [
            { text: 'Documentation', link: '/docs/', activeMatch: '^/docs/' },
            { text: 'Configuration generator', link: '/configurator' },
            { text: 'Options', link: '/options' },
            { text: 'Examples', link: '/examples' },
            { text: 'Contact', link: '/contacts' },
            { text: 'Donate', link: '/support' },
        ],

        sidebar: { '/docs/': docs.sidebar },

        search: {
            provider: 'local',
        },

        outline: {
            level: [2, 3],
        },

        editLink: {
            pattern: 'https://github.com/autoNumeric/autonumeric.org/edit/master/src/:path',
            text   : 'Improve this page on GitHub',
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/autoNumeric/autoNumeric' },
        ],
    },
});
