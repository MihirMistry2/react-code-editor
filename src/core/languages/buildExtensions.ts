import { Extension } from '@codemirror/state';

import { EditorLanguage, LanguageOptions } from '../../types';

import { jsonLanguage } from '.';
import {
    jsonDiagnosticsExtension,
    jsonValidationState,
} from '../diagnostics/json';

export const buildLanguageExtensions = (
    language: EditorLanguage,
    options: LanguageOptions | undefined,
): Extension[] => {
    switch (language) {
        case 'json':
            return [
                jsonLanguage(),
                jsonValidationState,
                jsonDiagnosticsExtension(options?.[language] ?? {}),
            ];
        default:
            return [];
    }
};
