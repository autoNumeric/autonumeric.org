// AutoNumeric manipulates the DOM, so it must only ever be loaded in the browser.
// Every component goes through this loader (never a static `import 'autonumeric'`), which keeps the static site generation (SSR) working.

let loading = null;

export function loadAutoNumeric() {
    if (!loading) {
        loading = import('autonumeric')
            .then(module => module.default ?? module)
            .catch(error => {
                // A failed load (lost network, page left) must not be remembered : a later call retries
                loading = null;
                throw error;
            });
    }

    return loading;
}

/**
 * Turns what the components receive into a real options object :
 * - a predefined option name ('French', 'euro', ...) is resolved,
 * - a predefined style rule name (styleRules: 'positiveNegative') is resolved,
 * - an object is shallow-copied, since AutoNumeric may modify it.
 */
export function resolveOptions(AutoNumeric, options) {
    if (typeof options === 'string') {
        const predefined = AutoNumeric.getPredefinedOptions()[options];
        if (!predefined) {
            throw new Error(`Unknown predefined option "${options}"`);
        }

        return { ...predefined };
    }

    const resolved = { ...(options ?? {}) };
    // `styleRules: 'positiveNegative'` refers to one of AutoNumeric's predefined style rules
    if (typeof resolved.styleRules === 'string') {
        resolved.styleRules = AutoNumeric.options.styleRules[resolved.styleRules];
    }

    return resolved;
}

/**
 * Displays a value the way it would be written in JavaScript
 */
export function shownValue(value) {
    if (typeof value === 'string') return `'${value}'`;
    if (value === null) return 'null';
    if (typeof value === 'object') return JSON.stringify(value);

    return String(value);
}

/**
 * Turns an options object into readable JavaScript (unquoted keys, single-quoted strings).
 * When `references` is true, strings starting with `AutoNumeric.options.` are printed as code.
 */
export function toJsObject(object, references = false) {
    const json = JSON.stringify(object, null, 4)
        .replace(/"([A-Za-z_$][\w$]*)":/g, '$1:')
        .replace(/"((?:[^"\\]|\\.)*)"/g, (_, content) => `'${content.replace(/\\"/g, '"').replace(/'/g, "\\'")}'`);

    return references ? json.replace(/'(AutoNumeric\.options\.[\w.$]+)'/g, '$1') : json;
}

export function slugify(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

export async function copyText(text) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    // Fallback for older browsers / non-secure contexts
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'absolute';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
}

/**
 * Keep the options whose name or short description contains the query (case insensitive).
 * Shared by the Options page and the Configurator, so both filters behave the same.
 */
export function filterOptions(options, query) {
    const search = query.trim().toLowerCase();
    if (!search) return options;

    return options.filter(option => option.name.toLowerCase().includes(search)
        || option.descriptionShort.replace(/<[^>]+>/g, '').toLowerCase().includes(search));
}
