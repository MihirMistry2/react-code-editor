import type { Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';

import type { LanguagePlugin, JsEditorConfig } from '../../../types';

import { jsDiagnosticsExtension, validationState } from '../../diagnostics';

export const tsPlugin: LanguagePlugin<'ts'> = {
    id: 'ts',
    capabilities: {
        syntax: true,
        autocomplete: true,
        diagnostics: true,
        validation: true,
        hover: true,
        formatting: false,
    },
    build(options: JsEditorConfig): Extension[] {
        return [
            javascript({ jsx: options?.jsx ?? false, typescript: true }),
            validationState,
            jsDiagnosticsExtension(options ?? {}),
        ];
    },
};
