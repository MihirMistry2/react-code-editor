import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

import jsonLanguage from '../languages/json';
import { CreateEditorOptions } from '../types/index';

const createEditor = ({ value, parent, onChange }: CreateEditorOptions) => {
    const state = EditorState.create({
        doc: value,
        extensions: [
            basicSetup,
            jsonLanguage(),
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
