import { EditorView } from 'codemirror';
import type { Extension } from '@codemirror/state';

import { getThemeDefaults } from './defaults';
import { createSyntaxHighlight } from './syntax';

import { Theme } from '../../../types';

export const createCustomThemeExtension = ({
    dark = false,
    colors = {},
    syntax = {},
}: Theme): Extension | null => {
    if (Object.keys(colors).length === 0 && Object.keys(syntax).length === 0) {
        return null;
    }

    const defaults = getThemeDefaults(dark);
    const themeSyntax = createSyntaxHighlight(syntax);

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

    return [theme, themeSyntax];
};
