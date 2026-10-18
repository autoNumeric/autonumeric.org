<script setup>
// Dark code block for code generated at runtime ; matches the Markdown code blocks
import { computed } from 'vue';
import { highlight } from '../lib/highlight';

const props = defineProps({
    code: { type: String, required: true },
});

const html = computed(() => highlight(props.code));
</script>

<template>
    <pre class="an-code"><code v-html="html" /></pre>
</template>
