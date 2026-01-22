import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const darkTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#0f172a',
            color: '#e5e7eb',
        },
        '.cm-content': {
            caretColor: '#38bdf8',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#38bdf8',
        },
        '.cm-activeLine': {
            backgroundColor: '#1e293b',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#334155',
        },
        '.cm-gutters': {
            backgroundColor: '#020617',
            color: '#64748b',
            border: 'none',
        },
    },
    { dark: true }
);

export const darkHighlight = HighlightStyle.define([
    { tag: tags.keyword, color: '#c084fc' },
    { tag: tags.string, color: '#4ade80' },
    { tag: tags.number, color: '#38bdf8' },
    { tag: tags.comment, color: '#64748b', fontStyle: 'italic' },
    { tag: tags.function(tags.variableName), color: '#2dd4bf' },
    { tag: tags.typeName, color: '#f472b6' },
]);
