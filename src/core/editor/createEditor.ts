import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

import { readOnlyExtension, searchExtensions } from '../extensions';
import { buildLanguageExtensions } from '../languages';

import { CreateEditorOptions } from '../../types';
import { getThemeExtension } from '../themes';

export const createEditor = ({
    value,
    parent,
    theme,
    readOnly = false,
    language,
    languageOptions,
    search,
    onChange,
}: CreateEditorOptions) => {
    const state = EditorState.create({
        doc: value,
        extensions: [
            basicSetup,
            ...buildLanguageExtensions(language, languageOptions),
            getThemeExtension(theme),
            readOnlyExtension(readOnly),
            searchExtensions(search),
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
