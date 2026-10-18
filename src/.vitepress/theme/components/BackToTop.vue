<script setup>
// Floating button shown once the page has been scrolled down for a while
import { ref, onMounted, onBeforeUnmount } from 'vue';

const visible = ref(false);

function onScroll() {
    visible.value = window.scrollY > 800;
}

function toTop() {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
    <Transition name="back-to-top">
        <button
            v-show="visible"
            type="button"
            class="back-to-top"
            aria-label="Back to top"
            title="Back to top"
            @click="toTop"
        >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </Transition>
</template>

<style scoped>
.back-to-top {
    position         : fixed;
    right            : 1.25rem;
    bottom           : 1.25rem;
    z-index          : 30;
    display          : grid;
    place-items      : center;
    width            : 44px;
    height           : 44px;
    border           : 0;
    border-radius    : 50%;
    color            : #FFF;
    background-color : var(--an-link);
    box-shadow       : 0 2px 8px rgba(0, 0, 0, 0.25);
    cursor           : pointer;
}

.back-to-top:hover {
    background-color : var(--an-blue-deep);
}

.back-to-top:focus-visible {
    outline        : 2px solid var(--an-focus);
    outline-offset : 2px;
}

.back-to-top-enter-active,
.back-to-top-leave-active {
    transition : opacity 0.2s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
    opacity : 0;
}

@media (prefers-reduced-motion : reduce) {
    .back-to-top-enter-active,
    .back-to-top-leave-active {
        transition : none;
    }
}
</style>
