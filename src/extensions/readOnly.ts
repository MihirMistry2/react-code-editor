import { EditorView } from '@codemirror/view';

const readOnlyExtension = (readOnly: boolean) => {
    return EditorView.editable.of(!readOnly);
};

export default readOnlyExtension;
