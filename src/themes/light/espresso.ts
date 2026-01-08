/**
 * Theme inspired by Thememirror
 * https://github.com/vadimdemedes/thememirror
 * MIT License
 */

import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const espressoLightTheme = EditorView.theme(
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
            backgroundColor: '#C1E2F8',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#80C7FF',
        },
        '.cm-gutters': {
            backgroundColor: '#FFFFFF',
            color: '#00000070',
            border: 'none',
        },
    },
    { dark: false }
);

export const espressoLightHighlight = HighlightStyle.define([
    { tag: tags.comment, color: '#AAAAAA' },
    {
        tag: [
            tags.keyword,
            tags.operator,
            tags.typeName,
            tags.tagName,
            tags.propertyName,
        ],
        color: '#2F6F9F',
        fontWeight: 'bold',
    },
    {
        tag: [tags.attributeName, tags.definition(tags.propertyName)],
        color: '#4F9FD0',
    },
    {
        tag: [tags.className, tags.string, tags.special(tags.brace)],
        color: '#CF4F5F',
    },
    {
        tag: tags.number,
        color: '#CF4F5F',
        fontWeight: 'bold',
    },
    {
        tag: tags.variableName,
        fontWeight: 'bold',
    },
]);
