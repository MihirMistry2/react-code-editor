import { EditorView } from '@codemirror/view';
import { copyToClipboard, foldAllCode, unfoldAllCode } from '../extensions';

import type { EditorController } from '../types';

export function createEditorController(): EditorController {
    let view: EditorView | null = null;

    return {
        getView() {
            return view;
        },
        setView(v: EditorView) {
            view = v;
        },
        async copy() {
            return await copyToClipboard(view);
        },
        foldAll() {
            return foldAllCode(view);
        },
        unfoldAll() {
            return unfoldAllCode(view);
        },
    };
}
