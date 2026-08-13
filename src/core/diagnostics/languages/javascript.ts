import { Extension } from '@codemirror/state';
import {
    completeFromList,
    Completion,
    autocompletion,
} from '@codemirror/autocomplete';
import { linter, lintGutter } from '@codemirror/lint';
import { scopeCompletionSource, snippets } from '@codemirror/lang-javascript';
import { EditorView, hoverTooltip } from '@codemirror/view';

import { validationLinter } from '../';
import { createSyntaxTreeLinter } from '../utils/syntaxTreeLinter';

import type { JsEditorConfig } from '../../../types';

const getErrorMessage = (
    view: EditorView,
    from: number,
    to: number,
): string => {
    const doc = view.state.doc;
    const badToken = doc.sliceString(from, to);
    const charBefore = from > 0 ? doc.sliceString(from - 1, from) : '';
    const charAfter = doc.sliceString(to, to + 1);

    if (badToken) {
        if ([';', '}', ']', ')'].includes(badToken)) {
            return `Unexpected token '${badToken}'`;
        }
        if (['{', '[', '('].includes(badToken)) {
            return `Unclosed or unexpected opening '${badToken}'`;
        }
        if (
            ['=', '+', '-', '*', '/', '==', '===', '&&', '||'].includes(
                badToken,
            )
        ) {
            return `Unexpected operator '${badToken}'`;
        }
        return `Syntax error near '${badToken}'`;
    }

    if (charBefore === '=') {
        return 'Missing expression after assignment operator';
    }

    if (charBefore === '(' || charAfter === ')') {
        return 'Invalid expression inside parentheses';
    }

    if (!charAfter) {
        return `Unexpected end of input`;
    }

    return `Syntax error`;
};

export const jsLinter = createSyntaxTreeLinter(getErrorMessage);

export const schemaHoverTooltip = (schema: Completion[]): Extension => {
    const schemaMap = new Map(schema.map((item) => [item.label, item]));

    return hoverTooltip((view, pos) => {
        const word = view.state.wordAt(pos);
        if (!word) return null;

        const text = view.state.doc.sliceString(word.from, word.to);
        const item = schemaMap.get(text);

        if (!item?.info) return null;

        return {
            pos: word.from,
            end: word.to,
            above: true,
            create() {
                const dom = document.createElement('div');
                dom.className = 'cm-tooltip';

                dom.innerHTML = `
                    <strong>${item.label}</strong>
                    <div>${
                        typeof item.info === 'function' ? '' : item.info
                    }</div>
                `;

                return { dom };
            },
        };
    });
};

export const jsDiagnosticsExtension = (
    options: JsEditorConfig = {},
): Extension[] => {
    const {
        diagnostics = true,
        gutter = true,
        schema,
        hover = !!schema,
        autocomplete = true,
    } = options;
    const extensions: Extension[] = [];

    if (diagnostics) {
        extensions.push(linter(validationLinter(jsLinter)));

        if (gutter) {
            extensions.push(lintGutter());
        }
    }

    if (autocomplete) {
        const overrides = [
            completeFromList(snippets),
            scopeCompletionSource(globalThis),
        ];

        if (schema) {
            overrides.unshift(completeFromList(schema));

            if (hover) {
                extensions.push(schemaHoverTooltip(schema));
            }
        }

        extensions.push(
            autocompletion({
                override: overrides,
            }),
        );
    }

    return extensions;
};
