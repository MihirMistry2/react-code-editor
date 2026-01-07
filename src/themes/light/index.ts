import type { Extension } from '@codemirror/state';
import { syntaxHighlighting } from '@codemirror/language';

import { lightTheme, lightHighlight } from './base';
import { ayuLightTheme, ayuLightHighlight } from './ayu';
import { cloudsLightTheme, cloudsLightHighlight } from './clouds';
import { espressoLightTheme, espressoLightHighlight } from './espresso';

export const lightThemes: Record<string, Extension> = {
    light: [lightTheme, syntaxHighlighting(lightHighlight)],
    ayu_light: [ayuLightTheme, syntaxHighlighting(ayuLightHighlight)],
    clouds_light: [cloudsLightTheme, syntaxHighlighting(cloudsLightHighlight)],
    espresso_light: [
        espressoLightTheme,
        syntaxHighlighting(espressoLightHighlight),
    ],
};
