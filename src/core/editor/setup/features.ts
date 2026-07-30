import {
    EditorView,
    lineNumbers,
    highlightActiveLineGutter,
} from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';

import { FeatureEditorConfig } from '../../../types';

export const buildFeatureExtensions = (
    options: FeatureEditorConfig = {},
): Extension[] => {
    const {
        auto_close_brackets = true,
        line_numbers = true,
        line_wrapping = false,
        indent_unit = 2,
        indent_with_tab = true,
    } = options;
    const indentChar = indent_with_tab ? '\t' : ' '.repeat(indent_unit);

    return [
        ...(line_numbers ? [lineNumbers(), highlightActiveLineGutter()] : []),
        ...(line_wrapping ? [EditorView.lineWrapping] : []),
        ...(indent_with_tab ? [keymap.of([indentWithTab])] : []),
        ...(auto_close_brackets
            ? [closeBrackets(), keymap.of(closeBracketsKeymap)]
            : []),
        indentUnit.of(indentChar),
        EditorState.tabSize.of(indent_unit),
    ];
};
