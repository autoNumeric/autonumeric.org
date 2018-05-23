export default [
    { path: '/', component: () => import('pages/Index') },
    {
        path     : '/', component: () => import('layouts/default'),
        children : [
            { path: 'guide', component: () => import('pages/Documentation') },
            { path: 'examples', component: () => import('pages/Examples') },
            { path: 'configurator', component: () => import('pages/ConfiguratorPage') },
            { path: 'support', component: () => import('pages/Support') },
            { path: 'contacts', component: () => import('pages/Contacts') },
        ],
    },

    // Always leave this as last one
    { path     : '*', component: () => import('pages/404') },
];
