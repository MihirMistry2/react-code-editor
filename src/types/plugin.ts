import type { Extension } from '@codemirror/state';
import type { EditorLanguage, LanguageOptions } from '../types';

export interface LanguageCapabilities {
    syntax?: boolean;
    diagnostics?: boolean;
    validation?: boolean;
    autocomplete?: boolean;
    hover?: boolean;
    formatting?: boolean;
}

export interface LanguagePlugin<Language extends EditorLanguage> {
    id: Language;
    build(options: LanguageOptions[Language]): Extension[];
    capabilities?: LanguageCapabilities;
}
