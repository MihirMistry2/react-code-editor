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
    const textBefore = document.sliceString(0, from);
    const textAfter = document.sliceString(from);

    const previousChar = textBefore.match(/\S(?=\s*$)/)?.[0] ?? '';
    const nextChar = textAfter.match(/\S/)?.[0] ?? '';

    if (previousChar === ',') {
        return 'Trailing comma is not allowed in JSON';
    }

    if (nextChar === '}' || nextChar === ']') {
        return 'Missing value before closing bracket';
    }

    if (nextChar === ':' || previousChar === ':') {
        return 'Missing value after ":"';
    }

    if (previousChar === '}' || previousChar === ']') {
        return 'Missing comma between JSON values';
    }

    if (!nextChar) {
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
