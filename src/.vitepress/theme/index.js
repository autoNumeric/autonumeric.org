import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './style.css';

import AnPage from './components/AnPage.vue';
import AnButton from './components/AnButton.vue';
import AnInput from './components/AnInput.vue';
import HomePage from './components/HomePage.vue';
import Configurator from './components/Configurator.vue';
import OptionReference from './components/OptionReference.vue';
import ExampleGroup from './components/ExampleGroup.vue';

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        // `layout: AnPage` in a page frontmatter uses this component as the page layout
        app.component('AnPage', AnPage);

        // Components usable directly in the Markdown pages
        app.component('AnButton', AnButton);
        app.component('AnInput', AnInput);
        app.component('HomePage', HomePage);
        app.component('Configurator', Configurator);
        app.component('OptionReference', OptionReference);
        app.component('ExampleGroup', ExampleGroup);
    },
};
