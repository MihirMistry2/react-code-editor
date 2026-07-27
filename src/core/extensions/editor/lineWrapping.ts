import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';

export const lineWrappingExtension = (enabled = false): Extension => {
    return enabled ? EditorView.lineWrapping : [];
};
