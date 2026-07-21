import { Extension } from '@codemirror/state';
import { linter, lintGutter } from '@codemirror/lint';

import { jsLinter } from './jsLinter';
import { validationLinter } from '../';
import type { JsEditorConfig } from '../../../types';

export const jsDiagnosticsExtension = (
    options: JsEditorConfig = {},
): Extension[] => {
    const { diagnostics = true, gutter = true } = options;
    const extensions: Extension[] = [];

    if (diagnostics) {
        extensions.push(linter(validationLinter(jsLinter)));

        if (gutter) {
            extensions.push(lintGutter());
        }
    }

    return extensions;
};
