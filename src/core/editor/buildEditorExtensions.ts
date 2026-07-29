import type { Extension } from '@codemirror/state';

import { indentExtensions, lineWrappingExtension } from '../extensions';
import type { EditorLanguage, LanguageOptions } from '../../types';

export const buildEditorExtensions = (
    options?: LanguageOptions[EditorLanguage] | undefined,
): Extension[] => {
    return [
        indentExtensions(options?.tab_size),
        lineWrappingExtension(options?.line_wrapping),
    ];
};
