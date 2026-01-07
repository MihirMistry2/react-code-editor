import type { Extension } from '@codemirror/state';
import { syntaxHighlighting } from '@codemirror/language';

import { lightTheme, lightHighlight } from './base';
import { ayuLightTheme, ayuLightHighlight } from './ayu';
import { cloudsLightTheme, cloudsLightHighlight } from './clouds';
import { espressoLightTheme, espressoLightHighlight } from './espresso';
import {
    noctisLilacLightTheme,
    noctisLilacLightHighlight,
} from './noctis-lilac';
import {
    rosePineDawnLightTheme,
    rosePineDawnLightHighlight,
} from './rose-pine-dawn';
import { smoothyLightTheme, smoothyLightHighlight } from './smoothy';
import { tomorrowLightTheme, tomorrowLightHighlight } from './tomorrow';

export const lightThemes: Record<string, Extension> = {
    light: [lightTheme, syntaxHighlighting(lightHighlight)],
    ayu_light: [ayuLightTheme, syntaxHighlighting(ayuLightHighlight)],
    clouds_light: [cloudsLightTheme, syntaxHighlighting(cloudsLightHighlight)],
    espresso_light: [
        espressoLightTheme,
        syntaxHighlighting(espressoLightHighlight),
    ],
    noctis_lilac_light: [
        noctisLilacLightTheme,
        syntaxHighlighting(noctisLilacLightHighlight),
    ],
    rose_pine_dawn_light: [
        rosePineDawnLightTheme,
        syntaxHighlighting(rosePineDawnLightHighlight),
    ],
    smoothy_light: [
        smoothyLightTheme,
        syntaxHighlighting(smoothyLightHighlight),
    ],
    tomorrow_light: [
        tomorrowLightTheme,
        syntaxHighlighting(tomorrowLightHighlight),
    ],
};
