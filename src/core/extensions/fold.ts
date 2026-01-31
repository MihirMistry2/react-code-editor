import type { EditorView } from '@codemirror/view';
import type { StateEffect } from '@codemirror/state';
import {
    syntaxTree,
    foldable,
    foldEffect,
    unfoldAll,
} from '@codemirror/language';

export const foldAllCode = (view: EditorView | null | undefined) => {
    if (!view) return false;

    const effects: StateEffect<unknown>[] = [];

    syntaxTree(view.state).iterate({
        enter(node) {
            const range = foldable(view.state, node.from, node.to);

            if (range) {
                effects.push(foldEffect.of(range));
            }
        },
    });

    if (!effects.length) return false;

    view.dispatch({ effects });
    return true;
};

export const unfoldAllCode = (view: EditorView | null | undefined) => {
    if (!view) return false;

    return unfoldAll(view);
};
