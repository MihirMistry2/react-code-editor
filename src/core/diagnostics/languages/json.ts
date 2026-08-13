import { Extension } from '@codemirror/state';
import {
    autocompletion,
    CompletionContext,
    CompletionResult,
} from '@codemirror/autocomplete';
import { linter, lintGutter } from '@codemirror/lint';
import { EditorView, hoverTooltip } from '@codemirror/view';
import {
    jsonCompletion,
    jsonSchemaHover,
    jsonSchemaLinter,
    stateExtensions,
} from 'codemirror-json-schema';

import { createSyntaxTreeLinter } from '../utils/syntaxTreeLinter';
import { validationLinter } from '../validation/validationLinter';

import type { JsonEditorConfig } from '../../../types';

export const safeJsonCompletion = (schema: Record<string, any>) => {
    const source = jsonCompletion(schema);

    return (context: CompletionContext): CompletionResult | null => {
        const result = source(context);

        return Array.isArray(result) ? null : result;
    };
};

const getErrorMessage = (view: EditorView, from: number): string => {
    const document = view.state.doc;
    const charBefore = from > 0 ? document.sliceString(from - 1, from) : '';
    const charAfter = document.sliceString(from, from + 1);

    if (charBefore === ',') {
        return 'Trailing comma is not allowed in JSON';
    }

    if (charAfter === '}' || charAfter === ']') {
        return 'Missing value before closing bracket';
    }

    if (charAfter === ':' || charBefore === ':') {
        return 'Missing value after ":"';
    }

    if (!charAfter) {
        return 'Unexpected end of JSON input';
    }

    return 'Invalid JSON syntax';
};

export const jsonLinter = createSyntaxTreeLinter(getErrorMessage);

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
        extensions.push(linter(validationLinter(jsonLinter)));

        if (gutter) {
            extensions.push(lintGutter());
        }
    }

    if (schema) {
        extensions.push(stateExtensions(schema));

        if (schemaLint) {
            extensions.push(linter(validationLinter(jsonSchemaLinter(schema))));
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
