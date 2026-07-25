import { EditorView } from 'codemirror';
import type { Extension } from '@codemirror/state';
import {
    HighlightStyle,
    syntaxHighlighting,
    type TagStyle,
} from '@codemirror/language';
import { tags } from '@lezer/highlight';

import type { EditorTheme, Theme } from '../../types';

import { lightThemes } from './light';
import { darkThemes } from './dark';

export const Themes = {
    ayu_light: 'ayu_light',
    barf_dark: 'barf_dark',
    clouds_light: 'clouds_light',
    cobalt_dark: 'cobalt_dark',
    cool_glow_dark: 'cool_glow_dark',
    dark: 'dark',
    dracula_dark: 'dracula_dark',
    espresso_light: 'espresso_light',
    light: 'light',
    noctis_lilac_light: 'noctis_lilac_light',
    rose_pine_dawn_light: 'rose_pine_dawn_light',
    smoothy_light: 'smoothy_light',
    tomorrow_light: 'tomorrow_light',
} as const;

const themeRegistry = {
    ...lightThemes,
    ...darkThemes,
} satisfies Record<string, Extension>;

const createCustomThemeExtension = ({
    dark = false,
    colors = {},
    syntax = {},
}: Theme): Extension => {
    if (Object.keys(colors).length === 0 && Object.keys(syntax).length === 0) {
        return themeRegistry[Themes.light];
    }

    const defaults = {
        background: dark ? '#222' : '#fff',
        foreground: dark ? '#ccc' : '#333',
        cursor: dark ? '#fff' : '#000',
        selection: dark ? '#383838' : '#d7d7d7',
        gutterBackground: dark ? '#1f1f1f' : '#f5f5f5',
        gutterForeground: dark ? '#666' : '#999',
    };

    const resolved = {
        background: colors.background ?? defaults.background,
        foreground: colors.foreground ?? defaults.foreground,
        cursor: colors.cursor ?? defaults.cursor,
        selection: colors.selection ?? defaults.selection,
        gutterBackground:
            colors.gutterBackground ??
            colors.background ??
            defaults.gutterBackground,
        gutterForeground:
            colors.gutterForeground ??
            colors.lineNumber ??
            defaults.gutterForeground,
        lineNumber: colors.lineNumber ?? defaults.gutterForeground,
        activeLineBackground: colors.activeLineBackground ?? 'transparent',
        activeLineGutter:
            colors.activeLineGutter ??
            colors.activeLineBackground ??
            'transparent',
        activeLineNumber:
            colors.activeLineNumber ??
            colors.gutterForeground ??
            defaults.gutterForeground,
    };

    const theme = EditorView.theme(
        {
            '&': {
                backgroundColor: resolved.background,
                color: resolved.foreground,
            },
            '.cm-content': {
                caretColor: resolved.cursor,
            },
            '&.cm-focused .cm-cursor': {
                borderLeftColor: resolved.cursor,
            },
            '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection':
                {
                    backgroundColor: resolved.selection,
                },
            '.cm-gutters': {
                backgroundColor: resolved.gutterBackground,
                color: resolved.gutterForeground,
                border: 'none',
            },
            '.cm-lineNumbers .cm-gutterElement': {
                color: resolved.lineNumber,
            },
            '.cm-activeLine': {
                backgroundColor: resolved.activeLineBackground,
            },
            '.cm-activeLineGutter': {
                backgroundColor: resolved.activeLineGutter,
                color: resolved.activeLineNumber,
            },
        },
        { dark },
    );

    const syntaxMap: Array<[string | undefined, TagStyle['tag']]> = [
        [syntax.keyword, tags.keyword],
        [syntax.string, tags.string],
        [syntax.number, tags.number],
        [syntax.comment, tags.comment],
        [syntax.variable, tags.variableName],
        [syntax.function, tags.function(tags.variableName)],
        [syntax.type, tags.typeName],
        [syntax.property, tags.propertyName],
        [syntax.class, tags.className],
        [syntax.tag, tags.tagName],
        [syntax.attribute, tags.attributeName],
        [syntax.operator, tags.operator],
        [syntax.punctuation, tags.punctuation],
    ];

    const highlight = syntaxMap.flatMap(([color, tag]) =>
        color ? [{ tag, color }] : [],
    );

    return [
        theme,
        syntaxHighlighting(HighlightStyle.define(highlight)),
    ] as Extension;
};

export const getThemeExtension = (
    theme: EditorTheme = Themes.light,
): Extension => {
    if (typeof theme === 'string') {
        return themeRegistry[theme] ?? themeRegistry[Themes.light];
    }

    return createCustomThemeExtension(theme);
};
