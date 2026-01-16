import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

import jsonLanguage from '../languages/json';
import readOnlyExtension from '../extensions/readOnly';

import { CreateEditorOptions } from '../types';
import { getThemeExtension } from '../themes';

const createEditor = ({
    value,
    parent,
    theme,
    readOnly = false,
    onChange,
}: CreateEditorOptions) => {
    const state = EditorState.create({
        doc: value,
        extensions: [
            basicSetup,
            jsonLanguage(),
            getThemeExtension(theme),
            readOnlyExtension(readOnly),
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    onChange?.(update.state.doc.toString());
                }
            }),
        ],
    });

    return new EditorView({
        state,
        parent,
    });
};

export default createEditor;
