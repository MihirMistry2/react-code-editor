import { Extension } from '@codemirror/state';
import { linter, lintGutter } from '@codemirror/lint';
import { htmlCompletionSource } from '@codemirror/lang-html';
import { autocompletion } from '@codemirror/autocomplete';

import { htmlLinter } from './htmlLinter';
import { validationLinter } from '../';
import type { HtmlEditorConfig } from '../../../types';

export const htmlDiagnosticsExtension = (
    options: HtmlEditorConfig = {},
): Extension[] => {
    const { diagnostics = true, gutter = true, autocomplete = true } = options;
    const extensions: Extension[] = [];

    if (diagnostics) {
        extensions.push(linter(validationLinter(htmlLinter)));

        if (gutter) {
            extensions.push(lintGutter());
        }
    }

    if (autocomplete) {
        extensions.push(
            autocompletion({
                override: [htmlCompletionSource],
            }),
        );
    }

    return extensions;
};
