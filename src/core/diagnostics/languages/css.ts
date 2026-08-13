import type { Extension } from '@codemirror/state';
import { linter, lintGutter } from '@codemirror/lint';
import { autocompletion } from '@codemirror/autocomplete';
import { cssCompletionSource } from '@codemirror/lang-css';

import { validationLinter } from '../';
import { createSyntaxTreeLinter } from '../utils/syntaxTreeLinter';

import type { CssEditorConfig } from '../../../types';

export const cssLinter = createSyntaxTreeLinter(() => 'Syntax error in CSS');

export const cssDiagnosticsExtension = (
    options: CssEditorConfig = {},
): Extension[] => {
    const { diagnostics = true, gutter = true, autocomplete = true } = options;
    const extensions: Extension[] = [];

    if (diagnostics) {
        extensions.push(linter(validationLinter(cssLinter)));

        if (gutter) {
            extensions.push(lintGutter());
        }
    }

    if (autocomplete) {
        extensions.push(
            autocompletion({
                override: [cssCompletionSource],
            }),
        );
    }

    return extensions;
};
