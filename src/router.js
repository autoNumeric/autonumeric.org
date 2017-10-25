import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * Lazy load routes
 */
function load(component) {
    // '@' is aliased to src/components
    return () => import(`@/${component}.vue`);
}

function loadPage(page, pageFolder = 'pages') {
    return () => import(`@/../${pageFolder}/${page}.vue`);
}

/*
// Returns all vue files in directory 'page'
const pages = require.context('./components/pages', true, /^\.\/.*\.vue$/)
                     .keys()
                     .filter(page => page.split('/').length >= 2)
                     .map(page => page.slice(2).slice(0, -4));

/!**
 * Page loading function
 * @param page
 * @returns {{path: string, component}}
 *!/
function loadPage(page) {
    return {
        path: `/${page}`,
        component: load(`pages/${page}`),
    };
}

// Add first route with layout
const routes = [
    {
        path: '/',
        component: load('Layout'),
        children: [],
    },
];

// Add all other pages
pages.forEach(page => {
    routes[0].children.push(loadPage(page));
});
*/

export default new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */

    routes: [
        { path: '/', component: loadPage('Index') },
        { path: '/',  component: load('Layout'),
            children: [
                { path: 'guide', component: loadPage('Documentation') },
                { path: 'examples', component: loadPage('Examples') },
                { path: 'configurator', component: loadPage('Configurator') },
                { path: 'support', component: loadPage('Support') },
                { path: 'contacts', component: loadPage('Contacts') },
            ],
        },
        { path: '*', component: loadPage('NotFound') },
        // { path: '*', redirect: '/404' },
    ],

    mode: 'hash',

    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                // , offset: { x: 0, y: 10 }
            };
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
});
