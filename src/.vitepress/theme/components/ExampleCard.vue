<script setup>
import { ref, computed } from 'vue';
import AnInput from './AnInput.vue';
import CodeBlock from './CodeBlock.vue';
import { slugify, toJsObject } from '../lib/autonumeric';

const props = defineProps({
    example: { type: Object, required: true },
});

const id = computed(() => slugify(props.example.name));
const rawValue = ref(props.example.value ?? 1234567.89);
const shownRaw = ref('');
const error = ref('');

// The options given to AutoNumeric ; a style rule is given by name and resolved by AnInput
const options = computed(() => (props.example.styleRule
    ? { styleRules: props.example.styleRule }
    : props.example.options ?? {}));

const code = computed(() => {
    const { options: exampleOptions, styleRule } = props.example;
    if (styleRule) {
        return `new AutoNumeric('#${id.value}', {\n    styleRules: AutoNumeric.options.styleRules.${styleRule},\n});`;
    }

    if (typeof exampleOptions === 'string') {
        return `new AutoNumeric('#${id.value}', '${exampleOptions}');`;
    }

    return `new AutoNumeric('#${id.value}', ${toJsObject(exampleOptions)});`;
});
</script>

<template>
    <section :id="id" class="example">
        <div class="example__text">
            <h3>
                <a :href="`#${id}`" class="example__anchor">{{ example.name }}</a>
            </h3>
            <p v-if="example.description" class="example__lead" v-html="example.description" />
            <p v-if="example.longDescription" class="example__long" v-html="example.longDescription" />
        </div>

        <div class="example__demo">
            <AnInput
                v-model="rawValue"
                :options="options"
                :aria-label="example.name"
                @raw="shownRaw = $event"
                @error="error = $event.message"
            />
            <p class="example__raw">rawValue: <code>{{ shownRaw }}</code></p>
            <p v-if="error" class="an-error" role="alert">{{ error }}</p>
        </div>

        <CodeBlock :code="code" class="example__code" />
    </section>
</template>

<style scoped>
.example {
    display               : grid;
    grid-template-columns : minmax(0, 1.1fr) minmax(0, 0.9fr) minmax(0, 1fr);
    gap                   : 2rem;
    align-items           : start;
    padding               : 1.75rem 0;
    border-bottom         : 1px solid var(--an-rule);
    scroll-margin-top     : calc(var(--vp-nav-height) + 1rem);
}

.example h3 {
    margin      : 0;
    padding     : 0;
    border      : 0;
    font-family : var(--an-font-ui);
    font-size   : 1.3rem;
    font-weight : 400;
    line-height : 1.3;
}

.example__anchor {
    color           : var(--an-title) !important;
    text-decoration : none !important;
}

.example__anchor:hover {
    text-decoration : underline !important;
}

.example p {
    margin : 0.5rem 0 0;
}

.example__lead {
    font-size : 1rem;
}

.example__long {
    font-size   : 0.875rem;
    line-height : 1.6;
    color       : var(--vp-c-text-2);
}

.example__demo {
    display        : flex;
    flex-direction : column;
    align-items    : center;
}

.example__demo .an-input {
    width : 100%;
}

.example .example__raw {
    font-size : 0.8rem;
    color     : var(--vp-c-text-2);
}

.example__code {
    margin : 0 !important;
}

@media (max-width : 960px) {
    .example {
        grid-template-columns : minmax(0, 1fr);
        gap                   : 1rem;
    }
}
</style>
