<script setup>
/**
 * <AnInput v-model="raw" :options="{ currencySymbol: ' €' }" />
 *
 * - `options`: an options object, or a predefined option name ('French', 'euro', ...)
 * - `v-model`: the raw (unformatted) value
 * - `@raw`: emitted with the raw value on every change, including programmatic ones
 * - `@error`: emitted when AutoNumeric rejects the options
 *
 * The AutoNumeric instance is only created when the input scrolls into view, so pages with hundreds of demos stay fast.
 */
import {
    ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount
} from 'vue';
import { loadAutoNumeric, resolveOptions } from '../lib/autonumeric';

const props = defineProps({
    modelValue: { type: [Number, String], default: null },
    options   : { type: [Object, String], default: () => ({}) },
    lazy      : { type: Boolean, default: true },
});

const emit = defineEmits(['update:modelValue', 'raw', 'error', 'ready']);

const input = ref(null);
let AutoNumeric = null;
let instance = null;
let observer = null;
let unmounted = false;
let programmatic = false; // True while _we_ change the value, so it is not echoed back through v-model

function onRawValueModified(event) {
    const raw = event.detail?.newRawValue ?? instance?.getNumericString() ?? '';
    emit('raw', raw);
    if (!programmatic) {
        emit('update:modelValue', raw);
    }
}

function create(initialValue = props.modelValue) {
    try {
        programmatic = true;
        instance = new AutoNumeric(input.value, initialValue ?? null, resolveOptions(AutoNumeric, props.options));
        emit('raw', instance.getNumericString());
        emit('ready', instance);
    } catch (error) {
        instance = null;
        emit('error', error);
    } finally {
        programmatic = false;
    }
}

async function init() {
    try {
        AutoNumeric = await loadAutoNumeric();
    } catch (error) {
        // AutoNumeric could not be loaded (lost network, page left): the input stays a plain field
        emit('error', error);
        return;
    }

    if (!unmounted && !instance) {
        create();
    }
}

function removeStyleRuleClasses() {
    // Classes added by the `styleRules` option are not removed when the options change
    [...input.value.classList]
        .filter(name => name.startsWith('autoNumeric-'))
        .forEach(name => input.value.classList.remove(name));
}

// Compare options by content, so that an inline `:options="{...}"` does not re-apply the configuration on every parent re-render
const optionsKey = computed(() => (typeof props.options === 'string'
    ? props.options
    : JSON.stringify(props.options ?? {}, (key, value) => (typeof value === 'function' ? value.toString() : value))));

// Style rules are only applied when the value changes, not by an options update : when they are involved, the input is recreated instead (keeping its value)
const usesStyleRules = options => typeof options === 'object' && options !== null && 'styleRules' in options;

watch(optionsKey, (newKey, oldKey) => {
    if (!AutoNumeric) return;
    if (!instance) {
        create();

        return;
    }

    if (usesStyleRules(props.options) || /"styleRules"/.test(oldKey ?? '')) {
        const value = instance.getNumericString();
        instance.remove();
        instance = null;
        removeStyleRuleClasses();
        create(value);

        return;
    }

    try {
        programmatic = true;
        removeStyleRuleClasses();
        instance.options.reset();
        instance.update(resolveOptions(AutoNumeric, props.options));
        emit('raw', instance.getNumericString());
    } catch (error) {
        emit('error', error);
    } finally {
        programmatic = false;
    }
});

watch(() => props.modelValue, value => {
    if (!instance) return;
    const target = value === null || value === undefined ? '' : String(value);
    if (target === instance.getNumericString()) return;

    try {
        programmatic = true;
        if (target === '') {
            instance.clear();
        } else {
            instance.set(target);
        }
    } catch {
        // The value is not valid for these options (ie. out of range) : so we keep the current one
    } finally {
        programmatic = false;
    }
});

onMounted(() => {
    input.value.addEventListener('autoNumeric:rawValueModified', onRawValueModified);

    if (props.lazy && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                observer.disconnect();
                observer = null;
                init();
            }
        }, { rootMargin: '300px' }); // This allows to initialize the elements a bit before being shown to the user while scrolling
        observer.observe(input.value);
    } else {
        init();
    }
});

onBeforeUnmount(() => {
    unmounted = true;
    observer?.disconnect();
    input.value?.removeEventListener('autoNumeric:rawValueModified', onRawValueModified);
    instance?.remove();
    instance = null;
});
</script>

<template>
    <input
        ref="input"
        type="text"
        inputmode="decimal"
        class="an-input"
    >
</template>
