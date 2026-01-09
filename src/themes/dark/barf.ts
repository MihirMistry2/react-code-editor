/**
 * Theme inspired by Thememirror
 * https://github.com/vadimdemedes/thememirror
 * MIT License
 */

import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const barfDarkTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#15191EFA',
            color: '#EEF2F7',
        },
        '.cm-content': {
            caretColor: '#C4C4C4',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#C4C4C4',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#90B2D557',
        },
        '.cm-activeLine': {
            backgroundColor: '#57575712',
        },
        '.cm-gutters': {
            backgroundColor: '#15191EFA',
            color: '#aaaaaa95',
            border: 'none',
        },
    },
    { dark: true }
);

export const barfDarkHighlight = HighlightStyle.define([
    {
        tag: tags.comment,
        color: '#6E6E6E',
    },
    {
        tag: [tags.string, tags.regexp, tags.special(tags.brace)],
        color: '#5C81B3',
    },
    {
        tag: tags.number,
        color: '#C1E1B8',
    },
    {
        tag: tags.bool,
        color: '#53667D',
    },
    {
        tag: [
            tags.definitionKeyword,
            tags.modifier,
            tags.function(tags.propertyName),
        ],
        color: '#A3D295',
        fontWeight: 'bold',
    },
    {
        tag: [
            tags.keyword,
            tags.moduleKeyword,
            tags.operatorKeyword,
            tags.operator,
        ],
        color: '#697A8E',
        fontWeight: 'bold',
    },
    {
        tag: [tags.variableName, tags.attributeName],
        color: '#708E67',
    },
    {
        tag: [
            tags.function(tags.variableName),
            tags.definition(tags.propertyName),
            tags.derefOperator,
        ],
        color: '#ffffff',
    },
    {
        tag: tags.tagName,
        color: '#A3D295',
    },
]);
