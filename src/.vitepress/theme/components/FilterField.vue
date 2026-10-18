<script setup>
// <FilterField v-model="query" :total="options.length" :shown="visible.length" />
defineProps({
    total: { type: Number, required: true },
    shown: { type: Number, required: true },
    id   : { type: String, default: 'option-filter' },
});

const query = defineModel({ type: String, default: '' });
</script>

<template>
    <div class="filter-field">
        <label :for="id">Filter the {{ total }} options</label>
        <div class="filter-field__row">
            <input
                :id="id"
                v-model="query"
                type="search"
                placeholder="e.g. currency, decimal, wheel…"
                autocomplete="off"
                spellcheck="false"
            >
            <span v-if="query" class="filter-field__count" aria-live="polite">{{ shown }} / {{ total }}</span>
        </div>
    </div>
</template>

<style scoped>
.filter-field {
    display        : flex;
    flex-direction : column;
    gap            : 0.4rem;
}

label {
    font-family : var(--an-font-ui);
    font-size   : 0.9rem;
    color       : var(--vp-c-text-2);
}

.filter-field__row {
    display     : flex;
    align-items : center;
    gap         : 0.75rem;
}

input {
    width            : 100%;
    max-width        : 420px;
    height           : 40px;
    padding          : 0 0.75rem;
    border           : 1px solid var(--an-field-border);
    border-radius    : 4px;
    font-size        : 0.95rem;
    color            : var(--an-field-text);
    background-color : var(--an-field-bg);
}

input:focus {
    border-color   : var(--an-field-hover-border);
    outline        : 2px solid var(--an-focus);
    outline-offset : 0;
}

.filter-field__count {
    font-size   : 0.85rem;
    color       : var(--vp-c-text-2);
    white-space : nowrap;
}
</style>
