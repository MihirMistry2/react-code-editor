import { Extension } from '@codemirror/state';
import { hoverTooltip } from '@codemirror/view';
import { linter, lintGutter } from '@codemirror/lint';
import { autocompletion } from '@codemirror/autocomplete';
import {
    jsonSchemaLinter,
    jsonSchemaHover,
    stateExtensions,
} from 'codemirror-json-schema';

import { jsonLinter } from './jsonLinter';
import { safeJsonCompletion, jsonValidationLinter } from './';
import { JsonEditorConfig } from '../../../types';

export const jsonDiagnosticsExtension = (
    options: JsonEditorConfig = {},
): Extension => {
    const {
        diagnostics = true,
        gutter = true,
        schema,
        schemaLint = !!schema,
        hover = !!schema,
        autocomplete = !!schema,
    } = options;
    const extensions: Extension[] = [];

    if (diagnostics) {
        extensions.push(linter(jsonValidationLinter(jsonLinter)));

        if (gutter) {
            extensions.push(lintGutter());
        }
    }

    if (schema) {
        extensions.push(stateExtensions(schema));

        if (schemaLint) {
            extensions.push(
                linter(jsonValidationLinter(jsonSchemaLinter(schema))),
            );
        }

        if (hover) {
            extensions.push(hoverTooltip(jsonSchemaHover(schema)));
        }

        if (autocomplete) {
            extensions.push(
                autocompletion({
                    override: [safeJsonCompletion(schema)],
                }),
            );
        }
    }

    return extensions;
};
