/**
 * Theme inspired by Thememirror
 * https://github.com/vadimdemedes/thememirror
 * MIT License
 */

import { EditorView } from '@codemirror/view';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const ayuLightTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#fcfcfc',
            color: '#5c6166',
        },
        '.cm-content': {
            caretColor: '#ffaa33',
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#ffaa33',
        },
        '.cm-activeLine': {
            backgroundColor: '#8a91991a',
        },
        '.cm-selectionBackground, ::selection': {
            backgroundColor: '#036dd626',
        },
        '.cm-gutters': {
            backgroundColor: '#fcfcfc',
            color: '#8a919966',
            border: 'none',
        },
    },
    { dark: false }
);

export const ayuLightHighlight = HighlightStyle.define([
    { tag: tags.comment, color: '#787b8099' },
    { tag: tags.string, color: '#86b300' },
    { tag: tags.regexp, color: '#4cbf99' },
    { tag: [tags.number, tags.bool, tags.null], color: '#ffaa33' },
    { tag: tags.variableName, color: '#5c6166' },
    { tag: [tags.definitionKeyword, tags.modifier], color: '#fa8d3e' },
    { tag: [tags.keyword, tags.special(tags.brace)], color: '#fa8d3e' },
    { tag: tags.operator, color: '#ed9366' },
    { tag: tags.separator, color: '#5c6166b3' },
    { tag: tags.punctuation, color: '#5c6166' },
    {
        tag: [
            tags.definition(tags.propertyName),
            tags.function(tags.variableName),
        ],
        color: '#f2ae49',
    },
    {
        tag: [tags.className, tags.definition(tags.typeName)],
        color: '#22a4e6',
    },
    {
        tag: [tags.tagName, tags.typeName, tags.self, tags.labelName],
        color: '#55b4d4',
    },
    { tag: tags.angleBracket, color: '#55b4d480' },
    { tag: tags.attributeName, color: '#f2ae49' },
]);
