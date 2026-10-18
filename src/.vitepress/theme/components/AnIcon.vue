<script setup>
const paths = {
    'help'        : 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
    'list'        : 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
    'chevron-left': 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z',
    'chevron-right': 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
};

defineProps({
    name: { type: String, required: true },
});
</script>

<template>
    <svg class="an-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path :d="paths[name]" fill="currentColor" />
    </svg>
</template>

<style scoped>
.an-icon {
    flex-shrink : 0;
    width       : 1.35em;
    height      : 1.35em;
}
</style>
