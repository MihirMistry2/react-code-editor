import { Extension } from '@codemirror/state';
import { linter, lintGutter } from '@codemirror/lint';
import { scopeCompletionSource, snippets } from '@codemirror/lang-javascript';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';

import { jsLinter } from './jsLinter';
import { validationLinter } from '../';
import type { JsEditorConfig } from '../../../types';

export const jsDiagnosticsExtension = (
    options: JsEditorConfig = {},
): Extension[] => {
    const { diagnostics = true, gutter = true, autocomplete = true } = options;
    const extensions: Extension[] = [];

    if (diagnostics) {
        extensions.push(linter(validationLinter(jsLinter)));

        if (gutter) {
            extensions.push(lintGutter());
        }
    }

    if (autocomplete) {
        extensions.push(
            autocompletion({
                override: [
                    completeFromList(snippets),
                    scopeCompletionSource(globalThis),
                ],
            }),
        );
    }

    return extensions;
};
