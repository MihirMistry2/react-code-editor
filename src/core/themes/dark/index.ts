import type { Extension } from '@codemirror/state';
import { syntaxHighlighting } from '@codemirror/language';

import { darkTheme, darkHighlight } from './base';
import { barfDarkTheme, barfDarkHighlight } from './barf';
import { cobaltDarkTheme, cobaltDarkHighlight } from './cobalt';
import { coolGlowDarkTheme, coolGlowDarkHighlight } from './cool-glow';
import { draculaTheme, draculaHighlight } from './dracula';

export const darkThemes: Record<string, Extension> = {
    dark: [darkTheme, syntaxHighlighting(darkHighlight)],
    barf_dark: [barfDarkTheme, syntaxHighlighting(barfDarkHighlight)],
    cobalt_dark: [cobaltDarkTheme, syntaxHighlighting(cobaltDarkHighlight)],
    cool_glow_dark: [
        coolGlowDarkTheme,
        syntaxHighlighting(coolGlowDarkHighlight),
    ],
    dracula_dark: [draculaTheme, syntaxHighlighting(draculaHighlight)],
};
