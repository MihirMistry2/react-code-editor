import type { EditorView } from '@codemirror/view';
import { foldAll, unfoldAll } from '@codemirror/language';

export const foldAllCode = (view: EditorView | null | undefined) => {
    if (!view) return false;

    return foldAll(view);
};

export const unfoldAllCode = (view: EditorView | null | undefined) => {
    if (!view) return false;

    return unfoldAll(view);
};
