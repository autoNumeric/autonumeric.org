<script setup>
/**
 * Layout used by every page except the home page (`layout: AnPage` in the frontmatter).
 * It opens with a blue banner echoing the home page hero, then renders the Markdown.
 *
 * Frontmatter:
 *   title: Page title (also used for <title>)
 *   lead:  One-line introduction under the title
 *   wide:  true for pages with wide tools (configurator, examples…)
 */
import { useData } from 'vitepress';
import BackToTop from './BackToTop.vue';

const { frontmatter } = useData();
</script>

<template>
    <div class="an-page" :class="{ 'an-page--wide': frontmatter.wide }">
        <header class="an-page__banner">
            <div class="an-page__inner">
                <h1>{{ frontmatter.title }}</h1>
                <p v-if="frontmatter.lead">{{ frontmatter.lead }}</p>
            </div>
        </header>

        <main class="an-page__inner an-page__body">
            <Content class="vp-doc" />
        </main>

        <BackToTop />
    </div>
</template>

<style scoped>
.an-page {
    --an-page-width : 760px;
}

.an-page--wide {
    --an-page-width : 1200px;
}

.an-page__inner {
    width     : 100%;
    max-width : calc(var(--an-page-width) + 3rem);
    margin    : 0 auto;
    padding   : 0 1.5rem;
}

.an-page__banner {
    padding          : 2.5rem 0 2.25rem;
    color            : #FFF;
    background-image : linear-gradient(var(--an-blue), var(--an-blue-deep));
}

.an-page__banner h1 {
    margin      : 0;
    font-family : var(--an-font-ui);
    font-size   : clamp(1.9rem, 4.5vw, 2.6rem);
    font-weight : 300;
    line-height : 1.15;
}

.an-page__banner p {
    max-width   : 640px;
    margin      : 0.6rem 0 0;
    font-family : var(--an-font-text);
    font-size   : 1.1rem;
    font-weight : 300;
    line-height : 1.5;
    opacity     : 0.95;
}

.an-page__body {
    padding-top    : 2.5rem;
    padding-bottom : 5rem;
}
</style>
