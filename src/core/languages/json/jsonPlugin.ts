import type { Extension } from '@codemirror/state';
import { json } from '@codemirror/lang-json';

import type { LanguagePlugin, JsonEditorConfig } from '../../../types';

import {
    jsonDiagnosticsExtension,
    jsonValidationState,
} from '../../diagnostics/json';

export const jsonPlugin: LanguagePlugin<'json'> = {
    id: 'json',

    build(options: JsonEditorConfig): Extension[] {
        return [
            json(),
            jsonValidationState,
            jsonDiagnosticsExtension(options ?? {}),
        ];
    },
};
