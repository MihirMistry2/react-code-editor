import { Extension } from '@codemirror/state';
import { EditorView, hoverTooltip } from '@codemirror/view';
import { linter, lintGutter, Diagnostic } from '@codemirror/lint';
import {
    autocompletion,
    CompletionContext,
    CompletionResult,
} from '@codemirror/autocomplete';
import { syntaxTree } from '@codemirror/language';
import { JsonEditorConfig } from '../../types';

import {
    jsonSchemaLinter,
    jsonSchemaHover,
    jsonCompletion,
    stateExtensions,
} from 'codemirror-json-schema';

const getErrorMessage = (view: EditorView, from: number): string => {
    const doc = view.state.doc;
    const charBefore = from > 0 ? doc.sliceString(from - 1, from) : '';
    const charAfter = doc.sliceString(from, from + 1);

    if (charBefore === ',') {
        return 'Trailing comma is not allowed in JSON';
    }

    if (charAfter === '}' || charAfter === ']') {
        return 'Missing value before closing bracket';
    }

    if (charAfter === ':') {
        return 'Missing value after ":"';
    }

    if (charBefore === ':') {
        return 'Missing value after ":"';
    }

    if (!charAfter) {
        return 'Unexpected end of JSON input';
    }

    return 'Invalid JSON syntax';
};

const jsonLinter = (view: EditorView): Diagnostic[] => {
    const diagnostics: Diagnostic[] = [];
    const tree = syntaxTree(view.state);
    const docLength = view.state.doc.length;

    tree.iterate({
        enter(node) {
            if (!node.type.isError) return;

            const from = node.from;
            const to = Math.min(node.to, docLength);

            diagnostics.push({
                from,
                to: from === to ? from + 1 : to,
                severity: 'error',
                message: getErrorMessage(view, from),
            });
        },
    });

    return diagnostics;
};

const safeJsonCompletion = (schema: Record<string, any>) => {
    const source = jsonCompletion(schema);

    return (ctx: CompletionContext): CompletionResult | null => {
        const result = source(ctx);
        return Array.isArray(result) ? null : result;
    };
};

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
        extensions.push(linter(jsonLinter));
        if (gutter) {
            extensions.push(lintGutter());
        }
    }

    if (schema) {
        extensions.push(stateExtensions(schema));

        if (schemaLint) {
            extensions.push(linter(jsonSchemaLinter(schema)));
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
