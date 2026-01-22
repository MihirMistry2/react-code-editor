import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const lightTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#fafafa',
            color: '#1f2937',
        },
        '.cm-content': {
            caretColor: '#2563eb',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#2563eb',
        },
        '.cm-activeLine': {
            backgroundColor: '#e5e7eb55',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#bfdbfe',
        },
        '.cm-gutters': {
            backgroundColor: '#f3f4f6',
            color: '#6b7280',
            border: 'none',
        },
    },
    { dark: false }
);

export const lightHighlight = HighlightStyle.define([
    { tag: tags.keyword, color: '#7c3aed' },
    { tag: tags.string, color: '#059669' },
    { tag: tags.number, color: '#2563eb' },
    { tag: tags.comment, color: '#9ca3af', fontStyle: 'italic' },
    { tag: tags.function(tags.variableName), color: '#0f766e' },
    { tag: tags.typeName, color: '#9333ea' },
]);
