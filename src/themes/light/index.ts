import type { Extension } from '@codemirror/state';
import { syntaxHighlighting } from '@codemirror/language';

import { lightTheme, lightHighlight } from './base';

export const lightThemes: Record<string, Extension> = {
    light: [lightTheme, syntaxHighlighting(lightHighlight)],
};
