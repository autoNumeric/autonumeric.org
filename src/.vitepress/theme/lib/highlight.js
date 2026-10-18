// Tiny JavaScript highlighter for the code generated at runtime (configurator, demos).
// Static code blocks in Markdown are highlighted at build time by VitePress (Shiki);
// this only covers the small subset of JS we generate, so no extra dependency is needed.

const RULES = [
    ['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
    ['string', /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/y],
    ['number', /\d+(?:\.\d+)?/y],
    ['keyword', /(?:new|const|let|return|true|false|null|undefined|function)\b/y],
    ['property', /[A-Za-z_$][\w$]*(?=\s*:)/y],
    ['class', /AutoNumeric\b/y],
    ['plain', /[A-Za-z_$][\w$]*|\s+/y],
];

const escapeHtml = text => text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export function highlight(code) {
    let html = '';
    let index = 0;

    while (index < code.length) {
        let matched = false;

        for (const [type, regex] of RULES) {
            regex.lastIndex = index;
            const match = regex.exec(code);
            if (match && match[0].length) {
                const token = escapeHtml(match[0]);
                html += type === 'plain' ? token : `<span class="tk-${type}">${token}</span>`;
                index += match[0].length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            // Punctuation or any other character
            html += escapeHtml(code[index]);
            index++;
        }
    }

    return html;
}
