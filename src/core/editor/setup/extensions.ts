import {
    EditorView,
    lineNumbers,
    highlightActiveLineGutter,
    highlightActiveLine,
} from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import {
    indentOnInput,
    indentUnit,
    bracketMatching,
    foldGutter,
    foldKeymap,
} from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import {
    selectNextOccurrence,
    highlightSelectionMatches,
} from '@codemirror/search';

import { EditorConfig } from '../../../types';

export const buildEditorExtensions = (
    options: EditorConfig = {},
): Extension[] => {
    const {
        auto_close_brackets = true,
        allow_multiple_selections = true,
        bracket_matching = true,
        line_numbers = true,
        indent_on_input = true,
        line_wrapping = false,
        highlight_active_line = true,
        highlight_selection_matches = true,
        indent_unit = 2,
        indent_with_tab = true,
        fold_gutter = true,
    } = options;
    const indentChar = indent_with_tab ? '\t' : ' '.repeat(indent_unit);

    return [
        ...(line_numbers ? [lineNumbers(), highlightActiveLineGutter()] : []),
        ...(line_wrapping ? [EditorView.lineWrapping] : []),
        ...(fold_gutter ? [foldGutter()] : []),
        ...(indent_on_input ? [indentOnInput()] : []),
        ...(auto_close_brackets ? [closeBrackets()] : []),
        ...(bracket_matching ? [bracketMatching()] : []),
        ...(highlight_active_line ? [highlightActiveLine()] : []),
        ...(allow_multiple_selections
            ? [EditorState.allowMultipleSelections.of(true)]
            : []),
        ...(highlight_selection_matches ? [highlightSelectionMatches()] : []),
        indentUnit.of(indentChar),
        EditorState.tabSize.of(indent_unit),
        keymap.of([
            ...(fold_gutter ? foldKeymap : []),
            ...(indent_with_tab ? [indentWithTab] : []),
            ...(auto_close_brackets ? closeBracketsKeymap : []),
            ...(allow_multiple_selections
                ? [{ key: 'Mod-d', run: selectNextOccurrence }]
                : []),
        ]),
    ];
};
