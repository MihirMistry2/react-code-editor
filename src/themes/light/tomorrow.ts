/**
 * Theme inspired by Thememirror
 * https://github.com/vadimdemedes/thememirror
 * MIT License
 */

import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const tomorrowLightTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#FFFFFF',
            color: '#4D4D4C',
        },
        '.cm-content': {
            caretColor: '#AEAFAD',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#AEAFAD',
        },
        '.cm-activeLine': {
            backgroundColor: '#EFEFEF',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#D6D6D6',
        },
        '.cm-gutters': {
            backgroundColor: '#FFFFFF',
            color: '#4D4D4C80',
            border: 'none',
        },
    },
    { dark: false }
);

export const tomorrowLightHighlight = HighlightStyle.define([
    { tag: tags.comment, color: '#8E908C' },
    {
        tag: [
            tags.variableName,
            tags.self,
            tags.propertyName,
            tags.attributeName,
            tags.regexp,
        ],
        color: '#C82829',
    },
    { tag: [tags.number, tags.bool, tags.null], color: '#F5871F' },
    {
        tag: [tags.className, tags.typeName, tags.definition(tags.typeName)],
        color: '#C99E00',
    },
    {
        tag: [tags.string, tags.special(tags.brace)],
        color: '#718C00',
    },
    { tag: tags.operator, color: '#3E999F' },
    {
        tag: [
            tags.definition(tags.propertyName),
            tags.function(tags.variableName),
        ],
        color: '#4271AE',
    },
    { tag: tags.keyword, color: '#8959A8' },
    { tag: tags.derefOperator, color: '#4D4D4C' },
]);
