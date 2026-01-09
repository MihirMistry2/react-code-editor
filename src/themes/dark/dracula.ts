/**
 * Theme inspired by Thememirror
 * https://github.com/vadimdemedes/thememirror
 * MIT License
 */

import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const draculaTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#2d2f3f',
            color: '#f8f8f2',
        },
        '.cm-content': {
            caretColor: '#f8f8f0',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#f8f8f0',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#44475a',
        },
        '.cm-activeLine': {
            backgroundColor: '#44475a',
        },
        '.cm-gutters': {
            backgroundColor: '#282a36',
            color: 'rgb(144, 145, 148)',
            border: 'none',
        },
    },
    { dark: true }
);

export const draculaHighlight = HighlightStyle.define([
    {
        tag: tags.comment,
        color: '#6272a4',
    },
    {
        tag: [tags.string, tags.special(tags.brace)],
        color: '#f1fa8c',
    },
    {
        tag: [tags.number, tags.self, tags.bool, tags.null],
        color: '#bd93f9',
    },
    {
        tag: [tags.keyword, tags.operator],
        color: '#ff79c6',
    },
    {
        tag: [tags.definitionKeyword, tags.typeName],
        color: '#8be9fd',
    },
    {
        tag: tags.definition(tags.typeName),
        color: '#f8f8f2',
    },
    {
        tag: [
            tags.className,
            tags.definition(tags.propertyName),
            tags.function(tags.variableName),
            tags.attributeName,
        ],
        color: '#50fa7b',
    },
]);
