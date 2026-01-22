/**
 * Theme inspired by Thememirror
 * https://github.com/vadimdemedes/thememirror
 * MIT License
 */

import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const cobaltDarkTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#00254b',
            color: '#FFFFFF',
        },
        '.cm-content': {
            caretColor: '#FFFFFF',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#FFFFFF',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#B36539BF',
        },
        '.cm-activeLine': {
            backgroundColor: '#00000059',
        },
        '.cm-gutters': {
            backgroundColor: '#00254b',
            color: '#FFFFFF70',
            border: 'none',
        },
    },
    { dark: true }
);

export const cobaltDarkHighlight = HighlightStyle.define([
    {
        tag: tags.comment,
        color: '#0088FF',
    },
    {
        tag: tags.string,
        color: '#3AD900',
    },
    {
        tag: tags.regexp,
        color: '#80FFC2',
    },
    {
        tag: [tags.number, tags.bool, tags.null],
        color: '#FF628C',
    },
    {
        tag: [tags.definitionKeyword, tags.modifier],
        color: '#FFEE80',
    },
    {
        tag: tags.variableName,
        color: '#CCCCCC',
    },
    {
        tag: tags.self,
        color: '#FF80E1',
    },
    {
        tag: [
            tags.className,
            tags.definition(tags.propertyName),
            tags.function(tags.variableName),
            tags.definition(tags.typeName),
            tags.labelName,
        ],
        color: '#FFDD00',
    },
    {
        tag: [tags.keyword, tags.operator],
        color: '#FF9D00',
    },
    {
        tag: [tags.propertyName, tags.typeName],
        color: '#80FFBB',
    },
    {
        tag: tags.special(tags.brace),
        color: '#EDEF7D',
    },
    {
        tag: tags.attributeName,
        color: '#9EFFFF',
    },
    {
        tag: tags.derefOperator,
        color: '#ffffff',
    },
]);
