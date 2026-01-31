import type { EditorView } from '@codemirror/view';
import {
    openSearchPanel,
    closeSearchPanel,
    search,
    findPrevious,
    findNext,
    replaceNext,
    replaceAll,
} from '@codemirror/search';
import { Extension } from '@codemirror/state';
import { SearchOptions } from '../../types';

export const openSearch = (view: EditorView | null | undefined) => {
    if (!view) return;

    openSearchPanel(view);
};

export const closeSearch = (view: EditorView | null | undefined) => {
    if (!view) return;

    closeSearchPanel(view);
};

export const searchNext = (view: EditorView | null | undefined) => {
    if (!view) return;

    findNext(view);
};

export const searchPrevious = (view: EditorView | null | undefined) => {
    if (!view) return;

    findPrevious(view);
};

export const replace = (view: EditorView | null | undefined) => {
    if (!view) return;

    replaceNext(view);
};

export const replaceAllOccurrences = (view: EditorView | null | undefined) => {
    if (!view) return;

    replaceAll(view);
};

export const searchExtensions = (options: SearchOptions = {}): Extension => {
    const {
        top = true,
        caseSensitive = false,
        regexp = false,
        wholeWord = false,
    } = options;

    return search({
        top,
        caseSensitive,
        regexp,
        wholeWord,
    });
};
