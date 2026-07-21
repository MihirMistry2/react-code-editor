import type { Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';

import type { LanguagePlugin, JsEditorConfig } from '../../../types';

import { jsDiagnosticsExtension, validationState } from '../../diagnostics';

export const jsPlugin: LanguagePlugin<'js'> = {
    id: 'js',
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
            javascript({ jsx: options?.jsx ?? false, typescript: false }),
            validationState,
            jsDiagnosticsExtension(options ?? {}),
        ];
    },
};
