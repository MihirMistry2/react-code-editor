import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const smoothyLightTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#FFFFFF',
            color: '#000000',
        },
        '.cm-content': {
            caretColor: '#000000',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#000000',
        },
        '.cm-activeLine': {
            backgroundColor: '#00000008',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#FFFD0054',
        },
        '.cm-gutters': {
            backgroundColor: '#FFFFFF',
            color: '#00000070',
            border: 'none',
        },
    },
    { dark: false }
);

export const smoothyLightHighlight = HighlightStyle.define([
    { tag: tags.comment, color: '#CFCFCF' },
    { tag: [tags.number, tags.bool, tags.null], color: '#E66C29' },
    {
        tag: [
            tags.className,
            tags.definition(tags.propertyName),
            tags.function(tags.variableName),
            tags.labelName,
            tags.definition(tags.typeName),
        ],
        color: '#2EB43B',
    },
    { tag: tags.keyword, color: '#D8B229' },
    {
        tag: tags.operator,
        color: '#4EA44E',
        fontWeight: 'bold',
    },
    {
        tag: [tags.definitionKeyword, tags.modifier],
        color: '#925A47',
    },
    { tag: tags.string, color: '#704D3D' },
    { tag: tags.typeName, color: '#2F8996' },
    { tag: [tags.variableName, tags.propertyName], color: '#77ACB0' },
    {
        tag: tags.self,
        color: '#77ACB0',
        fontWeight: 'bold',
    },
    { tag: tags.regexp, color: '#E3965E' },
    { tag: [tags.tagName, tags.angleBracket], color: '#BAA827' },
    { tag: tags.attributeName, color: '#B06520' },
    { tag: tags.derefOperator, color: '#000000' },
]);
