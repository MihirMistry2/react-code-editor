/**
 * Theme inspired by Thememirror
 * https://github.com/vadimdemedes/thememirror
 * MIT License
 */

import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const rosePineDawnLightTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#faf4ed',
            color: '#575279',
        },
        '.cm-content': {
            caretColor: '#575279',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#575279',
        },
        '.cm-activeLine': {
            backgroundColor: '#6e6a860d',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#6e6a8614',
        },
        '.cm-gutters': {
            backgroundColor: '#faf4ed',
            color: '#57527970',
            border: 'none',
        },
    },
    { dark: false }
);

export const rosePineDawnLightHighlight = HighlightStyle.define([
    { tag: tags.comment, color: '#9893a5' },
    { tag: [tags.bool, tags.null], color: '#286983' },
    { tag: tags.number, color: '#d7827e' },
    { tag: tags.className, color: '#d7827e' },
    {
        tag: [tags.angleBracket, tags.tagName, tags.typeName],
        color: '#56949f',
    },
    { tag: tags.attributeName, color: '#907aa9' },
    { tag: tags.punctuation, color: '#797593' },
    { tag: [tags.keyword, tags.modifier], color: '#286983' },
    { tag: [tags.string, tags.regexp], color: '#ea9d34' },
    { tag: tags.variableName, color: '#d7827e' },
]);
