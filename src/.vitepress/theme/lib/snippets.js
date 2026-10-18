// Code snippets offered by the configurator, around the generated options object

export const snippetFormats = [
    { id: 'object', label: 'Options object' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'vue', label: 'Vue 3' },
    { id: 'react', label: 'React' },
];

// Indent every line but the first, so a multi-line object fits inside a snippet
const indent = (code, spaces) => code.replace(/\n/g, `\n${' '.repeat(spaces)}`);

export function buildSnippet(format, objectCode, optionCount) {
    const args = spaces => (optionCount > 0 ? `, ${indent(objectCode, spaces)}` : '');

    switch (format) {
        case 'javascript':
            return `import AutoNumeric from 'autonumeric';

const anElement = new AutoNumeric('#myInput'${args(0)});`;

        case 'vue':
            return `<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AutoNumeric from 'autonumeric';

const input = ref(null);
let anElement = null;

onMounted(() => {
    anElement = new AutoNumeric(input.value${args(4)});
});

onBeforeUnmount(() => anElement?.remove());
</script>

<template>
    <input ref="input" type="text">
</template>`;

        case 'react':
            return `import { useEffect, useRef } from 'react';
import AutoNumeric from 'autonumeric';

export function NumericInput() {
    const input = useRef(null);

    useEffect(() => {
        const anElement = new AutoNumeric(input.current${args(8)});
        return () => anElement.remove();
    }, []);

    return <input ref={input} type="text" />;
}`;

        default:
            return objectCode;
    }
}
