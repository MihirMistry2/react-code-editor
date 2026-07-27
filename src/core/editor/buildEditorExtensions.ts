import type { Extension } from '@codemirror/state';

import { lineWrappingExtension } from '../extensions';
import type { EditorLanguage, LanguageOptions } from '../../types';

export const buildEditorExtensions = (
    options?: LanguageOptions[EditorLanguage] | undefined,
): Extension[] => {
    return [lineWrappingExtension(options?.line_wrapping)];
};
