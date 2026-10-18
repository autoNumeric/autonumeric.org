<script setup>
// Shared footer. Its links are the navigation bar links, so there is only one list to maintain.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useData } from 'vitepress';
import AnLogo from './AnLogo.vue';

const { theme } = useData();
const year = new Date().getFullYear();

const links = computed(() => (theme.value.nav ?? []).filter(item => item.link));

/*
 * The documentation sidebar and outline are fixed to the window : without this, they would
 * cover the footer when it scrolls into view. The visible footer height is published as
 * `--an-footer-offset`, which style.css uses to make them stop right above it.
 */
const footer = ref(null);
let frame = null;
let resizeObserver = null;

function updateOffset() {
    frame = null;
    if (!footer.value) return;
    const visible = Math.max(0, Math.round(window.innerHeight - footer.value.getBoundingClientRect().top));
    document.documentElement.style.setProperty('--an-footer-offset', `${visible}px`);
}

function scheduleUpdate() {
    if (frame === null) frame = requestAnimationFrame(updateOffset);
}

onMounted(() => {
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    // The page height changes when navigating between pages, without any scroll event
    resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);
    updateOffset();
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', scheduleUpdate);
    window.removeEventListener('resize', scheduleUpdate);
    resizeObserver?.disconnect();
    if (frame !== null) cancelAnimationFrame(frame);
    document.documentElement.style.removeProperty('--an-footer-offset');
});
</script>

<template>
    <footer ref="footer" class="site-footer">
        <nav aria-label="Footer">
            <ul>
                <li v-for="item in links" :key="item.link">
                    <a :href="item.link">{{ item.text }}</a>
                </li>
            </ul>
        </nav>
        <p>
            Copyright 2016–{{ year }} © <a href="mailto:alexandre.bonneau@linuxfr.eu">Alexandre Bonneau</a>
        </p>
        <a href="/" class="site-footer__logo" aria-label="AutoNumeric home"><AnLogo /></a>
    </footer>
</template>

<style scoped>
.site-footer {
    display          : flex;
    flex-direction   : column;
    align-items      : center;
    gap              : 1rem;
    padding          : 2.5rem 1.5rem 4rem;
    color            : #FFF;
    text-align       : center;
    font-family      : var(--an-font-text);
    font-size        : 0.9rem;
    font-weight      : 300;
    background-image : linear-gradient(var(--an-navy), var(--an-navy-deep));
}

ul {
    display         : flex;
    flex-wrap       : wrap;
    justify-content : center;
    gap             : 0.5rem 2rem;
    margin          : 0;
    padding         : 0;
    list-style      : none;
}

a {
    color           : #C9C9C9;
    text-decoration : none;
}

a:hover,
a:focus-visible {
    color : var(--an-hero-link-hover);
}

p a {
    color : #FFF;
}

p {
    margin : 0;
}

.site-footer__logo {
    margin-top : 1.5rem;
    color      : var(--an-navy-light);
}

.site-footer__logo:hover {
    color : #FFF;
}
</style>
