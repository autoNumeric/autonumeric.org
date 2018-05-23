/* global process */

import Vue            from 'vue';
import VueRouter      from 'vue-router';
import VueHighlightjs from '../directives/vue-highlightjs';

import routes from './routes';

Vue.use(VueRouter);
Vue.directive('highlightjs', VueHighlightjs);

const Router = new VueRouter({
    /*
     * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
     *
     * When going with "history" mode, please also make sure "build.publicPath"
     * is set to something other than an empty string.
     * Example: '/' instead of ''
     */

    // Leave as is and change from quasar.conf.js instead!
    mode          : process.env.VUE_ROUTER_MODE,
    base          : process.env.VUE_ROUTER_BASE,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) {
            return {
                selector: to.hash,
                // , offset: { x: 0, y: 10 }
            };
        } else {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        }
    },
    routes,
});

export default Router;
