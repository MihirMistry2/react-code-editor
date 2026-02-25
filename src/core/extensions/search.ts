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
import type { SearchOptions } from '../../types';

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

const resolveSearch = (search?: boolean | SearchOptions) => {
    if (!search) return { enabled: false };

    if (search === true) {
        return { enabled: true };
    }

    return {
        enabled: search.enabled ?? true,
        ...search,
    };
};

export const searchExtensions = (
    searchConfig: boolean | SearchOptions = {},
): Extension => {
    const options = resolveSearch(searchConfig);

    if (!options.enabled) return [];

    const {
        top = true,
        caseSensitive = false,
        regexp = false,
        wholeWord = false,
    } = options ?? {};

    return search({
        top,
        caseSensitive,
        regexp,
        wholeWord,
    });
};
