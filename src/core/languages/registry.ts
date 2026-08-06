import type { EditorLanguage, LanguagePlugin } from '../../types';

import { jsonPlugin, jsPlugin, tsPlugin, htmlPlugin } from './plugins';

const registry: Record<string, LanguagePlugin<any>> = {
    json: jsonPlugin,
    js: jsPlugin,
    ts: tsPlugin,
    html: htmlPlugin,
};

export function getLanguagePlugin<Language extends EditorLanguage>(
    language: Language,
): LanguagePlugin<Language> | undefined {
    return registry[language] as LanguagePlugin<Language> | undefined;
}
