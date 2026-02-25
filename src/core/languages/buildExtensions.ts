import type { Extension } from '@codemirror/state';
import type { EditorLanguage, LanguageOptions } from '../../types';

import { getLanguagePlugin } from './';

export function buildLanguageExtensions(
    language: EditorLanguage,
    options?: LanguageOptions[EditorLanguage] | undefined,
): Extension[] {
    const plugin = getLanguagePlugin(language);

    if (!plugin) {
        throw new Error(`Unsupported language '${language}'`);
    }

    return plugin.build(options ?? {});
}
