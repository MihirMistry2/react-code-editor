import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const cloudsLightTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#ffffff',
            color: '#000000',
        },
        '.cm-content': {
            caretColor: '#000000',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#000000',
        },
        '.cm-activeLine': {
            backgroundColor: '#FFFBD1',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#BDD5FC',
        },
        '.cm-gutters': {
            backgroundColor: '#ffffff',
            color: '#00000070',
            border: 'none',
        },
    },
    { dark: false }
);

export const cloudsLightHighlight = HighlightStyle.define([
    { tag: tags.comment, color: '#BCC8BA' },
    {
        tag: [tags.string, tags.special(tags.brace), tags.regexp],
        color: '#5D90CD',
    },
    { tag: [tags.number, tags.bool, tags.null], color: '#46A609' },
    { tag: tags.keyword, color: '#AF956F' },

    { tag: [tags.definitionKeyword, tags.modifier], color: '#C52727' },
    {
        tag: [tags.angleBracket, tags.tagName, tags.attributeName],
        color: '#606060',
    },
    { tag: tags.self, color: '#000000' },
]);
