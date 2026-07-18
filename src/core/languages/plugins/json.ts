import type { Extension } from '@codemirror/state';
import { json } from '@codemirror/lang-json';

import type { LanguagePlugin, JsonEditorConfig } from '../../../types';

import {
    jsonDiagnosticsExtension,
    jsonValidationState,
} from '../../diagnostics/json';

export const jsonPlugin: LanguagePlugin<'json'> = {
    id: 'json',
    capabilities: {
        syntax: true,
        diagnostics: true,
        validation: true,
        autocomplete: true,
        hover: true,
    },
    build(options: JsonEditorConfig): Extension[] {
        return [
            json(),
            jsonValidationState,
            jsonDiagnosticsExtension(options ?? {}),
        ];
    },
};
