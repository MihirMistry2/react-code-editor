import type { EditorLanguage, LanguagePlugin } from '../../types';

import { jsonPlugin } from './plugins';

const registry: Record<string, LanguagePlugin<any>> = {
    json: jsonPlugin,
};

export function getLanguagePlugin<Language extends EditorLanguage>(
    language: Language,
): LanguagePlugin<Language> | undefined {
    return registry[language] as LanguagePlugin<Language> | undefined;
}
