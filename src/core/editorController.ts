import { EditorView } from '@codemirror/view';
import { copyToClipboard } from '../extensions';

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
            if (!view) {
                console.warn('Editor not ready');
                return;
            }
            return await copyToClipboard(view);
        },
    };
}
