// Configurator state <-> URL query string, so a configuration can be bookmarked or shared.
//
//   /configurator?caretPositionOnFocus=end&wheelStep=~250&code=detailed&format=vue
//
// - `option=choice` selects a named choice
// - `option=~value` sets a custom value (for options accepting one)
// - `code` and `format` keep the code style and snippet format

export const CUSTOM = '__custom__';
const CUSTOM_PREFIX = '~';

export function encodeState({ selected, custom, mode, format }) {
    const params = new URLSearchParams();

    Object.entries(selected).forEach(([name, choice]) => {
        if (!choice) return;
        params.set(name, choice === CUSTOM ? `${CUSTOM_PREFIX}${custom[name] ?? ''}` : choice);
    });

    if (mode && mode !== 'simple') params.set('code', mode);
    if (format && format !== 'object') params.set('format', format);

    const query = params.toString();

    return query ? `?${query}` : '';
}

export function decodeState(search, catalog, formats) {
    const params = new URLSearchParams(search);
    const selected = {};
    const custom = {};

    catalog.forEach(option => {
        const value = params.get(option.name);
        if (value === null) return;

        if (value.startsWith(CUSTOM_PREFIX) && option.isOptionChoiceOpen) {
            selected[option.name] = CUSTOM;
            custom[option.name] = value.slice(CUSTOM_PREFIX.length);
        } else if (option.optionList.some(choice => choice.optionChoice === value)) {
            selected[option.name] = value;
        }
    });

    const mode = params.get('code') === 'detailed' ? 'detailed' : 'simple';
    const format = formats.some(item => item.id === params.get('format')) ? params.get('format') : 'object';

    return { selected, custom, mode, format };
}
