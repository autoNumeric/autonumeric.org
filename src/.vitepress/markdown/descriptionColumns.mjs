/**
 * markdown-it plugin : in tables with a "Description" column, marks that column's cells with the
 * `an-description` class and the table with `an-with-description` (styled in theme/style.css).
 * Done when the site is built, so the HTML is final from the start (no script, no delay).
 */
export default function descriptionColumns(md) {
    md.core.ruler.push('an_description_columns', state => {
        const { tokens } = state;

        tokens.forEach((token, start) => {
            if (token.type !== 'table_open') return;

            let column = -1;
            let cell = -1;
            let inHead = false;
            for (let i = start + 1; i < tokens.length && tokens[i].type !== 'table_close'; i++) {
                const current = tokens[i];
                if (current.type === 'thead_open') inHead = true;
                else if (current.type === 'thead_close') inHead = false;
                else if (current.type === 'tr_open') cell = -1;
                else if (current.type === 'th_open' || current.type === 'td_open') {
                    cell++;
                    // The header text is in the inline token following th_open
                    if (inHead && column === -1 && /description/i.test(tokens[i + 1]?.content ?? '')) column = cell;
                    if (!inHead && cell === column) current.attrJoin('class', 'an-description');
                }
            }

            if (column !== -1) token.attrJoin('class', 'an-with-description');
        });
    });
}
