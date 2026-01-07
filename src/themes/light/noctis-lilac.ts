import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const noctisLilacLightTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#f2f1f8',
            color: '#0c006b',
        },
        '.cm-content': {
            caretColor: '#5c49e9',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#5c49e9',
        },
        '.cm-activeLine': {
            backgroundColor: '#e1def3',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#d5d1f2',
        },
        '.cm-gutters': {
            backgroundColor: '#f2f1f8',
            color: '#0c006b70',
            border: 'none',
        },
    },
    { dark: false }
);

export const noctisLilacLightHighlight = HighlightStyle.define([
    { tag: tags.comment, color: '#9995b7' },
    {
        tag: tags.keyword,
        color: '#ff5792',
        fontWeight: 'bold',
    },
    {
        tag: [tags.definitionKeyword, tags.modifier],
        color: '#ff5792',
    },
    {
        tag: [tags.className, tags.tagName, tags.definition(tags.typeName)],
        color: '#0094f0',
    },
    {
        tag: [tags.number, tags.bool, tags.null, tags.special(tags.brace)],
        color: '#5842ff',
    },
    {
        tag: [
            tags.definition(tags.propertyName),
            tags.function(tags.variableName),
        ],
        color: '#0095a8',
    },
    { tag: tags.typeName, color: '#b3694d' },
    {
        tag: [tags.propertyName, tags.variableName],
        color: '#fa8900',
    },
    { tag: tags.operator, color: '#ff5792' },
    { tag: tags.self, color: '#e64100' },
    {
        tag: [tags.string, tags.regexp],
        color: '#00b368',
    },
    {
        tag: [tags.paren, tags.bracket],
        color: '#0431fa',
    },
    { tag: tags.labelName, color: '#00bdd6' },
    { tag: tags.attributeName, color: '#e64100' },
    { tag: tags.angleBracket, color: '#9995b7' },
]);
