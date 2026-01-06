import type { Extension } from '@codemirror/state';
import { syntaxHighlighting } from '@codemirror/language';

import { darkTheme, darkHighlight } from './base';

export const darkThemes: Record<string, Extension> = {
    dark: [darkTheme, syntaxHighlighting(darkHighlight)],
};
