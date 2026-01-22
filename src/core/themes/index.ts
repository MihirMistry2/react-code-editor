import type { Extension } from '@codemirror/state';

import { ThemeName } from '../../types';

import { lightThemes } from './light';
import { darkThemes } from './dark';

const themeRegistry: Record<string, Extension> = {
    ...lightThemes,
    ...darkThemes,
};

export const getThemeExtension = (theme: ThemeName = 'light') => {
    return themeRegistry[theme];
};
