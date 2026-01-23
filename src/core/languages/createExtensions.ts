import { Extension } from '@codemirror/state';

import { EditorLanguage, LanguageOptions } from '../../types';

import { jsonLanguage } from './';
import { jsonDiagnosticsExtension } from '../diagnostics';

export const createLanguageExtensions = (
    language: EditorLanguage,
    options: LanguageOptions | undefined,
): Extension[] => {
    switch (language) {
        case 'json':
            return [
                jsonLanguage(),
                jsonDiagnosticsExtension(options?.json ?? {}),
            ];
        default:
            return [];
    }
};
