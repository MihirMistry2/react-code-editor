import { EditorView } from '@codemirror/view';

export const readOnlyExtension = (readOnly: boolean) => {
    return EditorView.editable.of(!readOnly);
};
