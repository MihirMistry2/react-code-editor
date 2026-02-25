import type { EditorLanguage, LanguagePlugin } from '../../types';

const registry = new Map<EditorLanguage, LanguagePlugin<EditorLanguage>>();

export function registerLanguage<Language extends EditorLanguage>(
    plugin: LanguagePlugin<Language>,
) {
    if (registry.has(plugin.id)) {
        throw new Error(`Language plugin '${plugin.id}' already registered`);
    }

    registry.set(plugin.id, plugin);
}

export function getLanguagePlugin<Language extends EditorLanguage>(
    language: Language,
): LanguagePlugin<Language> | undefined {
    return registry.get(language) as LanguagePlugin<Language> | undefined;
}
