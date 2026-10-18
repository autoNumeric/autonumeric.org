<script setup>
// <ExampleGroup group="languageOptions" /> renders one category of data/examples.js
import { computed } from 'vue';
import { exampleGroups } from '../data/examples';
import ExampleCard from './ExampleCard.vue';

const props = defineProps({
    group: { type: String, required: true },
});

const examples = computed(() => exampleGroups.find(group => group.id === props.group)?.examples ?? []);
</script>

<template>
    <div class="example-group">
        <ExampleCard v-for="example in examples" :key="example.name" :example="example" />
    </div>
</template>

<style scoped>
.example-group {
    margin-top : 1.5rem;
    border-top : 1px solid var(--an-rule);
}
</style>
