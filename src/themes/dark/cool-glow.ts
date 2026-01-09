/**
 * Theme inspired by Thememirror
 * https://github.com/vadimdemedes/thememirror
 * MIT License
 */

import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const coolGlowDarkTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#060521',
            color: '#E0E0E0',
        },
        '.cm-content': {
            caretColor: '#FFFFFFA6',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#FFFFFFA6',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#122BBB',
        },
        '.cm-activeLine': {
            backgroundColor: '#FFFFFF0F',
        },
        '.cm-gutters': {
            backgroundColor: '#060521',
            color: '#E0E0E090',
            border: 'none',
        },
    },
    { dark: true }
);

export const coolGlowDarkHighlight = HighlightStyle.define([
    {
        tag: tags.comment,
        color: '#AEAEAE',
    },
    {
        tag: [tags.string, tags.special(tags.brace), tags.regexp],
        color: '#8DFF8E',
    },
    {
        tag: [
            tags.className,
            tags.definition(tags.propertyName),
            tags.function(tags.variableName),
            tags.function(tags.definition(tags.variableName)),
            tags.definition(tags.typeName),
        ],
        color: '#A3EBFF',
    },
    {
        tag: [tags.number, tags.bool, tags.null],
        color: '#62E9BD',
    },
    {
        tag: [tags.keyword, tags.operator],
        color: '#2BF1DC',
    },
    {
        tag: [tags.definitionKeyword, tags.modifier],
        color: '#F8FBB1',
    },
    {
        tag: [tags.variableName, tags.self],
        color: '#B683CA',
    },
    {
        tag: [
            tags.angleBracket,
            tags.tagName,
            tags.typeName,
            tags.propertyName,
        ],
        color: '#60A4F1',
    },
    {
        tag: tags.derefOperator,
        color: '#E0E0E0',
    },
    {
        tag: tags.attributeName,
        color: '#7BACCA',
    },
]);
