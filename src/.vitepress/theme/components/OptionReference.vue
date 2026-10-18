<script setup>
// Options page : summary table, then one live demo per option. Both follow the filter.
import { ref, computed } from 'vue';
import { shownValue, filterOptions } from '../lib/autonumeric';
import { useOptionCatalog } from '../lib/optionCatalog';
import OptionDemo from './OptionDemo.vue';
import FilterField from './FilterField.vue';

const { catalog } = useOptionCatalog();
const filter = ref('');
const visibleOptions = computed(() => filterOptions(catalog.value, filter.value));

const defaultValueOf = option => shownValue(option.optionList.find(choice => choice.defaultValue)?.value);
</script>

<template>
    <div class="option-reference">
        <div class="option-reference__filter">
            <FilterField
                id="options-filter"
                v-model="filter"
                :total="catalog.length"
                :shown="visibleOptions.length"
            />
        </div>

        <p v-if="visibleOptions.length === 0" class="option-reference__empty">
            No option matches “{{ filter }}”. Try another word, or clear the filter.
        </p>

        <template v-else>
            <table class="option-summary">
                <thead>
                    <tr>
                        <th>Option</th>
                        <th>Description</th>
                        <th>Default value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="option in visibleOptions" :key="option.name">
                        <td><a :href="`#${option.name}`">{{ option.name }}</a></td>
                        <td class="an-description" v-html="option.descriptionShort" />
                        <td><code>{{ defaultValueOf(option) }}</code></td>
                    </tr>
                </tbody>
            </table>

            <OptionDemo v-for="option in visibleOptions" :key="option.name" :option="option" />
        </template>
    </div>
</template>

<style scoped>
/* The filter stays reachable while scrolling through the demos */
.option-reference__filter {
    position         : sticky;
    top              : var(--vp-nav-height);
    z-index          : 10;
    margin           : 0 -1.5rem;
    padding          : 0.75rem 1.5rem;
    border-bottom    : 1px solid var(--an-rule);
    background-color : var(--vp-c-bg);
}

.option-reference__empty {
    color : var(--vp-c-text-2);
}

.option-summary td:first-child {
    white-space : nowrap;
}

.option-summary td {
    font-size : 0.875rem;
}

.option-summary td.an-description {
    font-size : 0.8rem;
}

.option-summary tr:hover {
    background-color : var(--an-rule);
}
</style>
