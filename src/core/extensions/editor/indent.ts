import { EditorState, Extension } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';

export const indentExtensions = (size = 2): Extension => {
    return [indentUnit.of('\t'), EditorState.tabSize.of(size)];
};
