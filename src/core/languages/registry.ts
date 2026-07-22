import type { EditorLanguage, LanguagePlugin } from '../../types';

import { jsonPlugin, jsPlugin, tsPlugin } from './plugins';

const registry: Record<string, LanguagePlugin<any>> = {
    json: jsonPlugin,
    js: jsPlugin,
    ts: tsPlugin,
};

export function getLanguagePlugin<Language extends EditorLanguage>(
    language: Language,
): LanguagePlugin<Language> | undefined {
    return registry[language] as LanguagePlugin<Language> | undefined;
}
