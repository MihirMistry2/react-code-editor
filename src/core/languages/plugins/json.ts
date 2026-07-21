import type { Extension } from '@codemirror/state';
import { json } from '@codemirror/lang-json';

import type { LanguagePlugin, JsonEditorConfig } from '../../../types';

import { jsonDiagnosticsExtension, validationState } from '../../diagnostics';

export const jsonPlugin: LanguagePlugin<'json'> = {
    id: 'json',
    capabilities: {
        syntax: true,
        diagnostics: true,
        validation: true,
        autocomplete: true,
        hover: true,
        formatting: false,
    },
    build(options: JsonEditorConfig): Extension[] {
        return [
            json(),
            validationState,
            jsonDiagnosticsExtension(options ?? {}),
        ];
    },
};
