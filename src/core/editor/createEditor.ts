import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

import { readOnlyExtension, searchExtensions } from '../extensions';
import { buildLanguageExtensions } from '../languages';
import { buildFeatureExtensions, updateListener } from './setup';

import type { CreateEditorOptions } from '../../types';
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
            ...buildFeatureExtensions(languageOptions?.[language]),
            ...buildLanguageExtensions(language, languageOptions?.[language]),
            getThemeExtension(theme),
            readOnlyExtension(readOnly),
            searchExtensions(search),
            updateListener(onChange),
        ],
    });

    return new EditorView({
        state,
        parent,
    });
};
