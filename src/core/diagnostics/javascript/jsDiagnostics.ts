import { Extension } from '@codemirror/state';
import { linter, lintGutter } from '@codemirror/lint';
import { scopeCompletionSource, snippets } from '@codemirror/lang-javascript';
import {
    autocompletion,
    completeFromList,
    Completion,
} from '@codemirror/autocomplete';
import { hoverTooltip } from '@codemirror/view';

import { jsLinter } from './jsLinter';
import { validationLinter } from '../';
import type { JsEditorConfig } from '../../../types';

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
