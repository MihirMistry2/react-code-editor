import type { Extension } from '@codemirror/state';

import type { EditorTheme } from '../../types';

import { lightThemes } from './light';
import { darkThemes } from './dark';
import { createCustomThemeExtension } from './custom';

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

export const getThemeExtension = (
    theme: EditorTheme = Themes.light,
): Extension => {
    if (typeof theme === 'string') {
        return themeRegistry[theme] ?? themeRegistry[Themes.light];
    }

    return createCustomThemeExtension(theme) ?? themeRegistry[Themes.light];
};
