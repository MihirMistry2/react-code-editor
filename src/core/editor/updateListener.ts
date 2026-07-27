import { EditorView } from '@codemirror/view';

import { EditorChangeHandler } from '../../types';

export const updateListener = (onChange?: EditorChangeHandler) => {
    return EditorView.updateListener.of((update) => {
        if (update.docChanged) {
            onChange?.(update.state.doc.toString());
        }
    });
};
