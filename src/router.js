import Vue from 'vue';
import VueRouter from 'vue-router';

import Homepage from '@/Homepage.vue';
import Home from '@/Home.vue';
import Documentation from '@/Documentation.vue';
import Examples from '@/Examples.vue';
import Configurator from '@/Configurator.vue';
import Support from '@/Support.vue';
import Contacts from '@/Contacts.vue';
import NotFound from '@/NotFound.vue';

Vue.use(VueRouter);

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
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
        { path: '/',             component: Homepage },
        { path: '/home',         component: Home },
        { path: '/guide',        component: Documentation },
        { path: '/examples',     component: Examples },
        { path: '/configurator', component: Configurator },
        { path: '/support',      component: Support },
        { path: '/contacts',     component: Contacts },
        { path: '*',             component: NotFound }, // Not found (error 404)
    ],
    // routes: [
    //     { path: '/', component: load('Homepage'),
    //         children: [
    //             { path: 'guide', component: load('Documentation') },
    //             { path: 'examples', component: load('Examples') },
    //             { path: 'configurator', component: load('Configurator') },
    //             { path: 'support', component: load('Support') },
    //             { path: 'contacts', component: load('Contacts') },
    //         ],
    //     },
    //     { path: '*', component: load('NotFound') },
    // ],
});
