<script setup>
import { useData } from 'vitepress';
import AnButton from './AnButton.vue';

const { theme } = useData();
</script>

<template>
    <div class="not-found">
        <p class="not-found__code">Error 404</p>
        <h1>Whoops, it seems like there is nothing here!</h1>
        <p>You can check out the <a href="/docs/">documentation</a>, the <a href="/configurator">configurator</a> or the <a href="/options">options</a>.</p>
        <AnButton href="/">Back to the home page</AnButton>
    </div>
</template>

<style scoped>
a {
    color : var(--an-blue);
}

a:hover {
    color : var(--an-blue-deep);
}

.not-found {
    display        : flex;
    flex-direction : column;
    align-items    : center;
    gap            : 1rem;
    padding        : 6rem 1.5rem;
    text-align     : center;
    font-family    : var(--an-font-text);
}

.not-found__code {
    margin      : 0;
    font-family : var(--an-font-ui);
    font-size   : 5rem;
    font-weight : 300;
    line-height : 1;
    color       : var(--an-blue);
}

h1 {
    margin      : 0;
    font-family : var(--an-font-ui);
    font-size   : 1.6rem;
    font-weight : 400;
}

p {
    margin : 0 0 1rem;
}
</style>
