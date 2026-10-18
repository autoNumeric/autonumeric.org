<script setup>
/**
 * <AnButton href="/configurator" variant="light">Label</AnButton>
 * Variants: primary (default), light, ghost (both for blue backgrounds), navy (footer), donate, flat (discreet, grey)
 * `icon` / `icon-right`: name of an AnIcon shown before / after the label
 */
import AnIcon from './AnIcon.vue';

defineProps({
    href   : { type: String, default: null },
    variant: { type: String, default: 'primary' },
    small  : { type: Boolean, default: false },
    icon   : { type: String, default: null },
    iconRight: { type: String, default: null },
});
</script>

<template>
    <component
        :is="href ? 'a' : 'button'"
        :href="href"
        :type="href ? null : 'button'"
        class="an-button"
        :class="[`an-button--${variant}`, { 'an-button--small': small }]"
    >
        <AnIcon v-if="icon" :name="icon" />
        <slot />
        <AnIcon v-if="iconRight" :name="iconRight" />
    </component>
</template>

<style scoped>
.an-button {
    display         : inline-flex;
    align-items     : center;
    justify-content : center;
    gap             : 0.5rem;
    min-height      : 42px;
    padding         : 0 1.25rem;
    border          : 1px solid transparent;
    border-radius   : 4px;
    font-family     : var(--an-font-ui);
    font-size       : 0.95rem;
    font-weight     : 500;
    line-height     : 1.2;
    text-decoration : none !important;
    cursor          : pointer;
    /* VitePress disables synthesized small caps (font-synthesis: style), which the variants below use */
    font-synthesis  : weight style small-caps;
    transition      : color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.an-button:focus-visible {
    outline        : 2px solid var(--an-focus);
    outline-offset : 2px;
}

.an-button--small {
    min-height : 34px;
    padding    : 0 0.85rem;
    font-size  : 0.85rem;
}

.an-button--primary {
    color            : #FFF;
    background-color : var(--an-link);
}

.an-button--primary:hover {
    color            : #FFF;
    background-color : var(--an-blue-deep);
}

.an-button--light,
.an-button--ghost {
    min-height     : 40px;
    padding        : 0 1.1rem;
    border-radius  : 3px;
    font-size      : 1.1rem;
    font-variant   : all-small-caps;
    letter-spacing : 0.03em;
}

.an-button--light {
    color            : #515151;
    background-color : #FFF;
}

.an-button--light:hover {
    color      : var(--an-blue);
    box-shadow : 0 3px 11px 7px rgba(50, 50, 50, 0.4);
}

.an-button--ghost {
    color            : #FFF;
    background-color : transparent;
    border-color     : #BFCECE;
}

.an-button--ghost:hover {
    background-color : rgba(255, 255, 255, 0.08);
}

/* Discreet grey button, like the original "Previous options" / "Next options" */
.an-button--flat {
    min-height       : 32px;
    padding          : 0 0.6rem;
    gap              : 0.25rem;
    border-radius    : 3px;
    color            : #9E9E9E;
    background-color : transparent;
    font-size        : 0.95rem;
    font-variant     : all-small-caps;
    letter-spacing   : 0.03em;
}

.an-button--flat:hover {
    color            : #757575;
    background-color : rgba(158, 158, 158, 0.15);
}

.an-button--navy,
.an-button--donate {
    min-height       : 40px;
    border-radius    : 3px;
    color            : #B0DEFF;
    background-color : var(--an-navy);
    border-color     : #1A374D;
    font-variant     : all-small-caps;
    font-size        : 1.05rem;
    letter-spacing   : 0.02em;
    transition       : all 0.3s ease;
}

.an-button--navy:hover {
    border-color     : #568AB4;
    background-color : #386589;
}

.an-button--donate:hover {
    color            : #FFF;
    border-color     : #4EC03D;
    background-color : forestgreen;
}
</style>
