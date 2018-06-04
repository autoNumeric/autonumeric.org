// Configuration for your app
const path = require('path');

module.exports = function(ctx) {
    return {
        // app plugins (/src/plugins)
        plugins   : [
            'i18n',
            'axios',
        ],
        css       : [
            'app.styl',
        ],
        extras    : [
            ctx.theme.mat?'roboto-font':null,
            'material-icons',
            // 'ionicons',
            // 'mdi',
            // 'fontawesome'
        ],
        supportIE : true,
        vendor    : {
            add   : [],
            remove: [],
        },
        build     : {
            scopeHoisting: true,
            vueRouterMode: 'history',
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            // useNotifier: false,
            extendWebpack(cfg) {
                cfg.module.rules.push({
                    enforce: 'pre',
                    test   : /\.(js|vue)$/,
                    loader : 'eslint-loader',
                    exclude: /(node_modules|quasar)/,
                });

                // We need to declare the AutoNumeric alias starting with vue-autonumeric 1.2.5 (see https://quasar-framework.org/guide/app-quasar.conf.js.html)
                cfg.resolve.alias = {
                    ...cfg.resolve.alias, // This adds the existing alias

                    // Add your own alias like this
                    AutoNumeric: path.resolve('./node_modules/autonumeric/dist/autoNumeric.min'),
                };
            },
        },
        devServer : {
            // https: true,
            // port: 8080,
            open: true, // opens browser window automatically
        },
        // framework: 'all' --- includes everything; for dev only!
        framework : {
            components: [
                'QBtn',
                'QIcon',
                'QItem',
                'QItemMain',
                'QItemSide',
                'QLayout',
                'QLayoutHeader',
                'QLayoutDrawer',
                'QList',
                'QListHeader',
                'QPageContainer',
                'QPage',
                'QRadio',
                'QToolbar',
                'QToolbarTitle',
                'QTabs',
                'QTab',
                'QTabPane',
            ],
            directives: [
                'Ripple',
                'BackToTop',
            ],
            // Quasar plugins
            plugins   : [
                'Notify',
            ],
        },
        // animations: 'all' --- includes all animations
        animations: [],
        pwa       : {
            cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
            manifest: {
                // name: 'Quasar App',
                // short_name: 'Quasar-PWA',
                // description: 'Best PWA App in town!',
                display         : 'standalone',
                orientation     : 'portrait',
                background_color: '#ffffff',
                theme_color     : '#027be3',
                icons           : [
                    {
                        src  : 'statics/icons/icon-128x128.png',
                        sizes: '128x128',
                        type : 'image/png',
                    },
                    {
                        src  : 'statics/icons/icon-192x192.png',
                        sizes: '192x192',
                        type : 'image/png',
                    },
                    {
                        src  : 'statics/icons/icon-256x256.png',
                        sizes: '256x256',
                        type : 'image/png',
                    },
                    {
                        src  : 'statics/icons/icon-384x384.png',
                        sizes: '384x384',
                        type : 'image/png',
                    },
                    {
                        src  : 'statics/icons/icon-512x512.png',
                        sizes: '512x512',
                        type : 'image/png',
                    },
                ],
            },
        },
        cordova   : {
            // id: 'org.cordova.quasar.app'
        },
        electron  : {
            extendWebpack(cfg) {
                // do something with cfg
            },
            packager: {
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Window only
                // win32metadata: { ... }
            },
        },

        // leave this here for Quasar CLI
        starterKit: '1.0.3',
    };
};
