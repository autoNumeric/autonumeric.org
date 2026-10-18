<script setup>
// One option of the Options page : every choice with its own live input.
// All inputs share the same raw value, so the effect of each choice can be compared.
import { ref, computed, onMounted } from 'vue';
import { loadAutoNumeric, shownValue } from '../lib/autonumeric';
import AnInput from './AnInput.vue';

const props = defineProps({
    option: { type: Object, required: true },
});

const value = ref(props.option.initialValue ?? null);
const rawValue = ref('');
const hovered = ref(''); // optionChoice under the pointer/focus ; `null` for the custom row
const customChoice = ref(props.option.defaultCustomValue ?? '');
const customInput = ref(null);
const AutoNumeric = ref(null);

onMounted(async () => {
    AutoNumeric.value = await loadAutoNumeric().catch(() => null);
});

const choiceCount = computed(() => {
    const count = props.option.optionList.length;
    const label = `${count} choice${count > 1 ? 's' : ''}`;

    return props.option.isOptionChoiceOpen ? `${label}, or your own value` : label;
});

// Some options only show their effect along with others (ie. currencySymbolPlacement needs a currencySymbol)
const optionsFor = choiceValue => ({ [props.option.name]: choiceValue, ...(props.option.additionalOptions ?? {}) });

const customOptions = computed(() => {
    if (!AutoNumeric.value) return {};
    const candidate = optionsFor(customChoice.value);
    const valid = AutoNumeric.value.areSettingsValid(candidate);
    customInput.value?.setCustomValidity(valid ? '' : 'This value is not valid for this option');

    return valid ? candidate : {};
});

const codeExample = computed(() => {
    if (hovered.value === '') return '';

    if (hovered.value === null) {
        const custom = customChoice.value;
        const asNumber = Number(custom);
        const shown = custom === '' || Number.isNaN(asNumber) ? `'${custom}'` : asNumber;

        return `{ ${props.option.name}: ${shown} }`;
    }

    return `{ ${props.option.name}: AutoNumeric.options.${props.option.name}.${hovered.value} }`;
});
</script>

<template>
    <section :id="option.name" class="option-demo">
        <h3>
            <a :href="`#${option.name}`">{{ option.name }}</a>
            <span class="option-demo__count">{{ choiceCount }}</span>
            <span v-if="option.undocumented" class="option-demo__new">new in AutoNumeric</span>
            <a :href="`/configurator#${option.name}`" class="option-demo__configure">Open in the configurator</a>
        </h3>
        <p class="option-demo__short" v-html="option.descriptionShort" />
        <div
            v-if="option.description && option.description !== option.descriptionShort"
            class="option-demo__long"
            v-html="option.description"
        />
        <div v-if="option.additionalInfo" class="tip custom-block option-demo__info">
            <p v-html="option.additionalInfo" />
        </div>

        <table class="option-demo__table">
            <thead>
                <tr>
                    <th>Choice</th>
                    <th>Value</th>
                    <th>Try it</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="choice in option.optionList"
                    :key="choice.optionChoice"
                    :class="{ default: choice.defaultValue }"
                    @mouseenter="hovered = choice.optionChoice"
                    @mouseleave="hovered = ''"
                    @focusin="hovered = choice.optionChoice"
                    @focusout="hovered = ''"
                >
                    <td class="option-demo__choice">{{ choice.optionChoice }}</td>
                    <td><code>{{ shownValue(choice.value) }}</code></td>
                    <td>
                        <AnInput
                            v-model="value"
                            :options="optionsFor(choice.value)"
                            :aria-label="`${option.name}: ${choice.optionChoice}`"
                            class="option-demo__input"
                            @raw="rawValue = $event"
                        />
                    </td>
                    <td>
                        <span v-html="choice.description" />
                        <span v-if="choice.defaultValue" class="option-demo__default">Default value</span>
                    </td>
                </tr>

                <tr
                    v-if="option.isOptionChoiceOpen"
                    @mouseenter="hovered = null"
                    @mouseleave="hovered = ''"
                    @focusin="hovered = null"
                    @focusout="hovered = ''"
                >
                    <td colspan="2">
                        <input
                            ref="customInput"
                            v-model="customChoice"
                            type="text"
                            class="option-demo__custom"
                            placeholder="Custom value"
                            :aria-label="`Custom value for ${option.name}`"
                        >
                    </td>
                    <td>
                        <AnInput
                            v-model="value"
                            :options="customOptions"
                            :aria-label="`${option.name}: custom value`"
                            class="option-demo__input"
                            @raw="rawValue = $event"
                        />
                    </td>
                    <td>You can use a custom choice for this option</td>
                </tr>
            </tbody>
        </table>

        <p class="option-demo__raw">
            rawValue: <code>{{ rawValue }}</code>
            <code v-if="codeExample" class="option-demo__code">{{ codeExample }}</code>
        </p>
    </section>
</template>

<style scoped>
.option-demo {
    margin-top        : 3.5rem;
    padding-top       : 1.5rem;
    border-top        : 2px solid var(--an-link);
    scroll-margin-top : calc(var(--vp-nav-height) + 6rem); /* Nav bar + sticky filter */
}

.option-demo h3 {
    display     : flex;
    flex-wrap   : wrap;
    align-items : baseline;
    gap         : 0.25rem 1rem;
    margin      : 0;
    font-family : var(--an-font-ui);
    font-size   : 1.5rem;
    font-weight : 400;
}

.option-demo h3 a {
    /* Long option names (ie. decimalPlacesShownOnFocus) must break rather than widen the page */
    min-width       : 0;
    overflow-wrap   : anywhere;
    color           : var(--an-title);
    text-decoration : none;
}

@media (max-width : 480px) {
    .option-demo h3 {
        font-size : 1.25rem;
    }
}

.option-demo h3 a:hover {
    text-decoration : underline;
}

.option-demo__configure {
    margin-left : auto;
    font-family : var(--an-font-text);
    font-size   : 0.85rem;
    color       : var(--an-link) !important;
}

.option-demo__configure:hover {
    text-decoration : underline !important;
}

.option-demo__new {
    padding       : 0 0.4rem;
    border        : 1px solid var(--an-link);
    border-radius : 3px;
    font-size     : 0.72rem;
    color         : var(--an-link);
}

.option-demo__count {
    font-family : var(--vp-font-family-mono);
    font-size   : 0.75rem;
    color       : var(--vp-c-text-3);
}

.option-demo__short {
    margin    : 0.4rem 0 0 !important;
    font-size : 1.05rem;
}

.option-demo__long {
    margin-top : 0.5rem;
    font-size  : 0.925rem;
    color      : var(--vp-c-text-2);
}

.option-demo__table td {
    font-size      : 0.85rem;
    vertical-align : middle;
}

.option-demo__table tr.default td {
    color : var(--an-title);
}

.option-demo__choice {
    white-space : nowrap;
}

.option-demo__input {
    width     : 190px;
    height    : 34px;
    font-size : 1.1rem;
}

.option-demo__default {
    display    : block;
    margin-top : 0.25rem;
    font-size  : 0.75rem;
    color      : var(--vp-c-text-3);
}

.option-demo__custom {
    width            : 100%;
    min-width        : 140px;
    height           : 32px;
    padding          : 0 0.5rem;
    border           : 1px solid var(--an-field-border);
    border-radius    : 4px;
    font-size        : 0.9rem;
    color            : var(--an-field-text);
    background-color : var(--an-field-bg);
}

.option-demo__custom:focus {
    border-color     : var(--an-field-hover-border);
    background-color : var(--an-field-hover-bg);
    outline          : none;
}

.option-demo__custom:invalid {
    border-color     : var(--an-error-border);
    background-color : var(--an-error-bg);
}

.option-demo__raw {
    display     : flex;
    flex-wrap   : wrap;
    gap         : 0.5rem 1.5rem;
    align-items : center;
    font-size   : 0.85rem;
    color       : var(--vp-c-text-2);
}

.option-demo__code {
    color : var(--an-title) !important;
}
</style>
