import { EditorState, Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';

export const indentExtensions = (size = 2, useTab = false): Extension => {
    const indentChar = useTab ? '\t' : ' '.repeat(size);

    return [
        ...(useTab ? [keymap.of([indentWithTab])] : []),
        indentUnit.of(indentChar),
        EditorState.tabSize.of(size),
    ];
};
