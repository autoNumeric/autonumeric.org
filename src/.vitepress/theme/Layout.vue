<script setup>
// Wraps the default VitePress layout to add the shared footer and the 404 page
import DefaultTheme from 'vitepress/theme';
import SiteFooter from './components/SiteFooter.vue';
import NotFound from './components/NotFound.vue';

const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #not-found>
            <NotFound />
        </template>
        <template #layout-bottom>
            <SiteFooter />
        </template>
    </Layout>
</template>
