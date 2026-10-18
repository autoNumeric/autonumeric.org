// The option catalog used by the Options page and the Configurator.
//
// data/options.js holds the hand-written descriptions. Once AutoNumeric is loaded, the catalog is completed with what the installed version provides but the data file does not describe yet :
//   - options missing from data/options.js (flagged `undocumented`),
//   - named choices (AutoNumeric.options.<option>.<choice>) missing from an option.
//
// New AutoNumeric versions therefore show up on the website without any manual work ; only their descriptions need to be written.

import { shallowRef, onMounted } from 'vue';
import { options as documentedOptions } from '../data/options';
import { loadAutoNumeric } from './autonumeric';

function sameValue(a, b) {
    if (a === b) return true;
    if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return false;
}

function namedChoices(AutoNumeric, name) {
    const constants = AutoNumeric.options?.[name];

    return constants && typeof constants === 'object' ? Object.entries(constants) : [];
}

function undocumentedOption(AutoNumeric, name, defaultValue) {
    const optionList = namedChoices(AutoNumeric, name).map(([choice, value]) => ({
        optionChoice: choice,
        value,
        description : '',
        ...(sameValue(value, defaultValue) ? { defaultValue: true } : {}),
    }));

    // Choices without an AutoNumeric.options constant are marked `literal`, so the configurator writes their value instead of a constant reference
    if (optionList.length === 0 && typeof defaultValue === 'boolean') {
        optionList.push(
            { optionChoice: 'true', value: true, description: '', literal: true, ...(defaultValue ? { defaultValue: true } : {}) },
            { optionChoice: 'false', value: false, description: '', literal: true, ...(!defaultValue ? { defaultValue: true } : {}) },
        );
    }

    if (!optionList.some(choice => choice.defaultValue)) {
        optionList.unshift({ optionChoice: 'default', value: defaultValue, description: 'Default value', defaultValue: true, literal: true });
    }

    return {
        name,
        descriptionShort  : 'This option is not described on this website yet.',
        description       : 'This option is not described on this website yet.',
        initialValue      : 1234.5,
        optionList,
        additionalInfo    : '',
        additionalOptions : {},
        isOptionChoiceOpen: typeof defaultValue !== 'boolean',
        undocumented      : true,
    };
}

export function completeCatalog(AutoNumeric, options = documentedOptions) {
    const defaults = AutoNumeric.getDefaultConfig();
    const known = new Set(options.map(option => option.name));

    const completed = options.map(option => {
        const listed = new Set(option.optionList.map(choice => choice.optionChoice));
        const extra = namedChoices(AutoNumeric, option.name)
            .filter(([choice]) => !listed.has(choice))
            .map(([choice, value]) => ({ optionChoice: choice, value, description: '' }));

        return extra.length ? { ...option, optionList: [...option.optionList, ...extra] } : option;
    });

    const missing = Object.keys(defaults)
        .filter(name => !known.has(name))
        .map(name => undocumentedOption(AutoNumeric, name, defaults[name]));

    return [...completed, ...missing].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Returns `catalog`, a ref holding the documented options first (for the static HTML), then the completed catalog once AutoNumeric is loaded in the browser, and `ready`, a promise resolved when the catalog is complete
 */
export function useOptionCatalog() {
    const catalog = shallowRef(documentedOptions);
    let resolveReady;
    const ready = new Promise(resolve => { resolveReady = resolve; });

    onMounted(async () => {
        try {
            catalog.value = completeCatalog(await loadAutoNumeric());
        } catch (error) {
            console.warn('Unable to complete the option catalog from AutoNumeric', error);
        }
        resolveReady(catalog.value);
    });

    return { catalog, ready };
}
