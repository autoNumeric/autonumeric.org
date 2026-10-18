<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { loadAutoNumeric, shownValue, toJsObject, copyText, filterOptions } from '../lib/autonumeric';
import { useOptionCatalog } from '../lib/optionCatalog';
import { snippetFormats, buildSnippet } from '../lib/snippets';
import { CUSTOM, encodeState, decodeState } from '../lib/configuratorUrl';
import AnInput from './AnInput.vue';
import AnButton from './AnButton.vue';
import CodeBlock from './CodeBlock.vue';
import FilterField from './FilterField.vue';

const { catalog, ready } = useOptionCatalog();

const selected = reactive({}); // option name -> chosen `optionChoice`, or CUSTOM
const custom = reactive({});   // option name -> custom value typed by the user
const mode = ref('simple');    // 'simple' | 'detailed'
const format = ref('object');  // see lib/snippets.js
const filter = ref('');
const status = ref('');
const validationError = ref('');
const AutoNumeric = ref(null);
const urlLoaded = ref(false);

onMounted(async () => {
    AutoNumeric.value = await loadAutoNumeric().catch(() => null); // Without it, the options are simply not validated

    // Restore a shared configuration from the URL, once every option is known
    const state = decodeState(window.location.search, await ready, snippetFormats);
    Object.assign(selected, state.selected);
    Object.assign(custom, state.custom);
    mode.value = state.mode;
    format.value = state.format;
    urlLoaded.value = true;
});

// Keep the URL in sync with the form, so it can be bookmarked or shared at any time
watch([selected, custom, mode, format], () => {
    if (!urlLoaded.value) return;
    const query = encodeState({ selected, custom, mode: mode.value, format: format.value });
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${query}${window.location.hash}`);
}, { deep: true });

const visibleOptions = computed(() => filterOptions(catalog.value, filter.value));

/**
 * Build the options object from the form, plus its two textual versions ;
 * - simple : the values themselves
 * - detailed : references to `AutoNumeric.options.*` wherever possible
 *
 * Choices marked as the default value are left out, since they change nothing.
 * Options required by the chosen ones (see `requires` in data/options.js) are added, with a note so the user knows why they appear.
 */
const result = computed(() => {
    const options = catalog.value;
    const object = {};
    const detailed = {};
    const notes = [];

    options.forEach(option => {
        const choice = selected[option.name];
        if (!choice) return;

        if (choice === CUSTOM) {
            const value = custom[option.name] ?? '';
            object[option.name] = value;
            detailed[option.name] = value;
            return;
        }

        const optionChoice = option.optionList.find(item => item.optionChoice === choice);
        if (!optionChoice || optionChoice.defaultValue) return;

        object[option.name] = optionChoice.value;
        // Choices without an AutoNumeric.options constant are written as values
        detailed[option.name] = optionChoice.literal ? optionChoice.value : `AutoNumeric.options.${option.name}.${choice}`;
    });

    options.forEach(option => {
        if (!option.requires || !(option.name in object)) return;

        Object.entries(option.requires).forEach(([name, requiredChoice]) => {
            const choice = options.find(item => item.name === name)
                ?.optionList.find(item => item.optionChoice === requiredChoice);
            if (!choice) return;

            if (selected[name] && selected[name] !== requiredChoice) {
                notes.push({
                    warning: true,
                    text   : `${option.name} has no effect unless ${name} is set to '${requiredChoice}'.`,
                });
                return;
            }

            if (!(name in object)) {
                object[name] = choice.value;
                detailed[name] = `AutoNumeric.options.${name}.${requiredChoice}`;
                notes.push({
                    warning: false,
                    text   : `${name} was set to '${requiredChoice}', which ${option.name} needs to work.`,
                });
            }
        });
    });

    return {
        object,
        notes,
        count   : Object.keys(object).length,
        simple  : toJsObject(object),
        detailed: toJsObject(detailed, true),
    };
});

const code = computed(() => buildSnippet(
    format.value,
    mode.value === 'simple' ? result.value.simple : result.value.detailed,
    result.value.count,
));

// Validate with AutoNumeric itself, once it is loaded
watch([result, AutoNumeric], () => {
    validationError.value = '';
    if (!AutoNumeric.value || result.value.count === 0) return;

    try {
        AutoNumeric.value.validate({ ...result.value.object }, true);
    } catch (error) {
        validationError.value = error.message;
    }
});

const copyLabel = computed(() => {
    if (format.value !== 'object') return 'Copy the code';

    return result.value.count === 1 ? 'Copy the option' : `Copy the ${result.value.count} options`;
});

let statusTimer = null;

function showStatus(message) {
    status.value = message;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { status.value = ''; }, 4000);
}

async function copy() {
    try {
        await copyText(code.value);
        showStatus('Code copied. You can now paste it in your project !');
    } catch {
        showStatus('Copy failed : select the code and copy it manually.');
    }
}

async function copyLink() {
    try {
        await copyText(window.location.href);
        showStatus('Link copied. Anyone opening it gets this exact configuration !');
    } catch {
        showStatus('Copy failed : copy the address from your browser instead.');
    }
}

function clearForm() {
    Object.keys(selected).forEach(key => delete selected[key]);
    Object.keys(custom).forEach(key => delete custom[key]);
    status.value = '';
}

function selectCustom(name) {
    selected[name] = CUSTOM;
}

function isModified(option) {
    const choice = selected[option.name];
    if (!choice) return false;
    if (choice === CUSTOM) return true;

    return !option.optionList.find(item => item.optionChoice === choice)?.defaultValue;
}
</script>

<template>
    <div class="cfg">
        <!-- Result: generated code and live test input -->
        <aside class="cfg__result" aria-label="Generated options">
            <div class="cfg__panel">
                <div class="cfg__tabs" role="radiogroup" aria-label="Code style">
                    <button
                        type="button"
                        role="radio"
                        :aria-checked="mode === 'simple'"
                        :class="{ active: mode === 'simple' }"
                        @click="mode = 'simple'"
                    >Simplified code</button>
                    <button
                        type="button"
                        role="radio"
                        :aria-checked="mode === 'detailed'"
                        :class="{ active: mode === 'detailed' }"
                        @click="mode = 'detailed'"
                    >Detailed code</button>
                </div>

                <label class="cfg__format">
                    <span>Output</span>
                    <select v-model="format">
                        <option v-for="item in snippetFormats" :key="item.id" :value="item.id">{{ item.label }}</option>
                    </select>
                </label>

                <CodeBlock :code="code" class="cfg__code" />

                <p v-if="validationError" class="an-error" role="alert">{{ validationError }}</p>
                <p
                    v-for="note in result.notes"
                    :key="note.text"
                    class="cfg__note"
                    :class="{ 'cfg__note--warning': note.warning }"
                >{{ note.text }}</p>

                <label class="cfg__try-label" for="cfg-try">Try your options</label>
                <AnInput
                    id="cfg-try"
                    :options="result.object"
                    :model-value="1234567.891"
                    :lazy="false"
                    class="cfg__try"
                />

                <div class="cfg__actions">
                    <AnButton :disabled="result.count === 0" @click="copy">
                        {{ result.count === 0 ? 'Select at least one option' : copyLabel }}
                    </AnButton>
                    <template v-if="result.count > 0">
                        <AnButton variant="primary" small class="cfg__secondary" @click="copyLink">Copy link</AnButton>
                        <AnButton variant="primary" small class="cfg__secondary" @click="clearForm">Clear the form</AnButton>
                    </template>
                </div>
                <p class="cfg__status" aria-live="polite">{{ status }}</p>
            </div>
        </aside>

        <!-- Form: one fieldset per option -->
        <div class="cfg__form">
            <FilterField
                id="cfg-filter"
                v-model="filter"
                :total="catalog.length"
                :shown="visibleOptions.length"
                class="cfg__filter"
            />

            <p v-if="visibleOptions.length === 0" class="cfg__empty">
                No option matches “{{ filter }}”. Try another word, or clear the filter.
            </p>

            <fieldset
                v-for="option in visibleOptions"
                :id="option.name"
                :key="option.name"
                class="cfg__option"
                :class="{ modified: isModified(option) }"
            >
                <legend>
                    <span class="cfg__name">
                        {{ option.name }}
                        <span v-if="option.undocumented" class="cfg__badge cfg__badge--new">new</span>
                        <a
                            v-if="!option.undocumented"
                            :href="`/options#${option.name}`"
                            class="cfg__demo-link"
                            :aria-label="`See the demo of ${option.name}`"
                        >See the demo</a>
                    </span>
                    <span class="cfg__desc" v-html="option.descriptionShort" />
                </legend>

                <label
                    v-for="choice in option.optionList"
                    :key="choice.optionChoice"
                    class="cfg__choice"
                    :class="{ default: choice.defaultValue }"
                >
                    <input
                        v-model="selected[option.name]"
                        type="radio"
                        :name="`cfg-${option.name}`"
                        :value="choice.optionChoice"
                    >
                    <span class="cfg__choice-name">
                        {{ choice.optionChoice }}
                        <span v-if="choice.defaultValue" class="cfg__badge">default</span>
                    </span>
                    <code class="cfg__value">{{ shownValue(choice.value) }}</code>
                    <span class="cfg__choice-desc" v-html="choice.description" />
                </label>

                <label v-if="option.isOptionChoiceOpen" class="cfg__choice cfg__choice--custom">
                    <input
                        v-model="selected[option.name]"
                        type="radio"
                        :name="`cfg-${option.name}`"
                        :value="CUSTOM"
                    >
                    <input
                        v-model="custom[option.name]"
                        type="text"
                        class="cfg__custom"
                        placeholder="Custom value"
                        :aria-label="`Custom value for ${option.name}`"
                        @input="selectCustom(option.name)"
                        @focus="selectCustom(option.name)"
                    >
                    <span class="cfg__choice-desc">You can use your own value for this option</span>
                </label>
            </fieldset>
        </div>
    </div>
</template>

<style scoped>
.cfg {
    display               : grid;
    grid-template-columns : minmax(0, 1fr) 400px;
    gap                   : 2.5rem;
    align-items           : start;
    margin-top            : 2rem;
}

/* Result panel ----------------------------------------------------------- */

.cfg__result {
    grid-column : 2;
    grid-row    : 1;
    position    : sticky;
    top         : calc(var(--vp-nav-height) + 1.5rem);
}

.cfg__panel {
    display          : flex;
    flex-direction   : column;
    gap              : 0.75rem;
    padding          : 1.25rem;
    border           : 1px solid var(--an-rule);
    border-radius    : 6px;
    background-color : var(--an-mist);
}

.cfg__tabs {
    display          : flex;
    gap              : 0.25rem;
    padding          : 0.25rem;
    border-radius    : 5px;
    background-color : var(--an-field-bg);
}

.cfg__tabs button {
    flex          : 1;
    padding       : 0.45rem 0.5rem;
    border        : 0;
    border-radius : 4px;
    font-family   : var(--an-font-ui);
    font-size     : 0.875rem;
    color         : var(--vp-c-text-2);
    background    : transparent;
    cursor        : pointer;
}

.cfg__tabs button.active {
    color            : #FFF;
    background-color : var(--an-link);
}

.cfg__tabs button:focus-visible {
    outline        : 2px solid var(--an-focus);
    outline-offset : 1px;
}

.cfg__code {
    max-height : 40vh;
    min-height : 90px;
    margin     : 0 !important;
    overflow   : auto;
}

.cfg__format {
    display     : flex;
    align-items : center;
    gap         : 0.6rem;
    font-family : var(--an-font-ui);
    font-size   : 0.875rem;
    color       : var(--vp-c-text-2);
}

.cfg__format select {
    flex-grow        : 1;
    height           : 34px;
    padding          : 0 0.5rem;
    border           : 1px solid var(--an-field-border);
    border-radius    : 4px;
    color            : var(--an-field-text);
    background-color : var(--an-field-bg);
    font-size        : 0.9rem;
}

.cfg__format select:focus-visible {
    outline        : 2px solid var(--an-focus);
    outline-offset : 1px;
}

.cfg__try-label {
    margin-top  : 0.5rem;
    font-family : var(--an-font-ui);
    font-size   : 0.9rem;
    color       : var(--an-title);
}

.cfg__try {
    width     : 100%;
    height    : 3rem;
    font-size : 1.6rem;
}

.cfg__actions {
    display   : flex;
    flex-wrap : wrap;
    gap       : 0.5rem;
}

.cfg__actions .an-button:first-child {
    flex-grow : 1;
}

.cfg__actions .an-button:disabled {
    cursor  : not-allowed;
    opacity : 0.55;
}

.cfg__secondary {
    color            : var(--an-link) !important;
    background-color : var(--an-field-bg) !important;
    border-color     : var(--an-rule) !important;
}

.cfg__status {
    min-height : 1.4em;
    margin     : 0 !important;
    font-size  : 0.85rem;
    color      : var(--an-success);
}

.cfg__note {
    margin           : 0 !important;
    padding          : 0.45rem 0.7rem;
    border-left      : 3px solid var(--an-link);
    border-radius    : 3px;
    font-size        : 0.85rem;
    line-height      : 1.45;
    background-color : var(--an-field-bg);
}

.cfg__note--warning {
    border-left-color : #E0A100;
}

/* Form ------------------------------------------------------------------- */

.cfg__form {
    grid-column : 1;
    grid-row    : 1;
    min-width   : 0;
}

.cfg__filter {
    margin-bottom : 1rem;
}

.cfg__empty {
    color : var(--vp-c-text-2);
}

.cfg__option {
    margin            : 0;
    padding           : 1.25rem 0 1rem 0.9rem;
    border            : 0;
    border-left       : 3px solid transparent;
    border-bottom     : 1px solid var(--an-rule);
    scroll-margin-top : calc(var(--vp-nav-height) + 1rem);
}

.cfg__option.modified {
    border-left-color : var(--an-blue);
}

.cfg__option legend {
    float   : left; /* Lets the legend behave like a regular block inside the fieldset */
    width   : 100%;
    padding : 0;
}

.cfg__option legend + * {
    clear : both;
}

.cfg__name {
    display     : block;
    font-family : var(--an-font-ui);
    font-size   : 1.2rem;
    color       : var(--an-title);
}

.cfg__demo-link {
    margin-left    : 0.5rem;
    font-size      : 0.8rem;
    vertical-align : middle;
}

.cfg__badge--new {
    border-color : var(--an-link);
    color        : var(--an-link);
}

.cfg__desc {
    display   : block;
    margin    : 0.2rem 0 0.75rem;
    font-size : 0.9rem;
    color     : var(--vp-c-text-2);
}

.cfg__choice {
    display               : grid;
    grid-template-columns : 1.5rem minmax(110px, 0.8fr) minmax(90px, 0.7fr) minmax(0, 2fr);
    gap                   : 0.75rem;
    align-items           : baseline;
    padding               : 0.4rem 0.5rem;
    border-radius         : 4px;
    font-size             : 0.875rem;
    cursor                : pointer;
}

.cfg__choice:hover {
    background-color : var(--an-mist);
}

.cfg__choice input[type='radio'] {
    accent-color : var(--an-link);
    cursor       : pointer;
}

.cfg__choice-name {
    font-family   : var(--an-font-ui);
    overflow-wrap : anywhere;
}

.cfg__choice.default .cfg__choice-name,
.cfg__choice.default .cfg__choice-desc {
    color : var(--an-title);
}

.cfg__badge {
    display       : inline-block;
    margin-left   : 0.25rem;
    padding       : 0 0.35rem;
    border        : 1px solid var(--an-rule);
    border-radius : 3px;
    font-size     : 0.72rem;
    color         : var(--vp-c-text-2);
}

.cfg__value {
    justify-self  : start;
    font-size     : 0.78rem !important;
    overflow-wrap : anywhere;
}

.cfg__choice-desc {
    color : var(--vp-c-text-1);
}

.cfg__choice-desc :deep(code) {
    font-size : 0.78rem;
}

.cfg__custom {
    grid-column      : span 2;
    width            : 100%;
    max-width        : 240px;
    height           : 32px;
    padding          : 0 0.5rem;
    border           : 1px solid var(--an-field-border);
    border-radius    : 4px;
    font-size        : 0.9rem;
    color            : var(--an-field-text);
    background-color : var(--an-field-bg);
}

.cfg__custom:focus {
    border-color     : var(--an-field-hover-border);
    background-color : var(--an-field-hover-bg);
    outline          : none;
}

.cfg__choice--custom .cfg__choice-desc {
    color      : var(--vp-c-text-3);
    font-style : italic;
}

/* Responsive ------------------------------------------------------------- */

@media (max-width : 1100px) {
    .cfg {
        grid-template-columns : minmax(0, 1fr);
    }

    .cfg__result {
        grid-column : 1;
        position    : static;
    }

    .cfg__form {
        grid-row : 2;
    }
}

@media (max-width : 640px) {
    .cfg__choice {
        grid-template-columns : 1.5rem minmax(0, 1fr) auto;
    }

    .cfg__choice-desc {
        grid-column : 2 / -1;
    }
}
</style>
