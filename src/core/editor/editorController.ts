import { EditorView } from '@codemirror/view';
import {
    copyToClipboard,
    foldAllCode,
    unfoldAllCode,
    formatCode,
    openSearch,
    closeSearch,
    replace,
    replaceAllOccurrences,
    searchNext,
    searchPrevious,
} from '../extensions';
import { jsonValidationState } from '../diagnostics/json';

import type { EditorController } from '../../types';

export function createEditorController(): EditorController {
    let view: EditorView | null = null;

    return {
        getView() {
            return view;
        },
        setView(v: EditorView) {
            view = v;
        },
        async copy() {
            return await copyToClipboard(view);
        },
        foldAll() {
            return foldAllCode(view);
        },
        unfoldAll() {
            return unfoldAllCode(view);
        },
        format(formatter) {
            return formatCode(view, formatter);
        },
        openSearch() {
            openSearch(view);
        },
        closeSearch() {
            closeSearch(view);
        },
        searchNext() {
            searchNext(view);
        },
        searchPrevious() {
            searchPrevious(view);
        },
        replace() {
            replace(view);
        },
        replaceAll() {
            replaceAllOccurrences(view);
        },
        getValidationState() {
            if (!view) return null;

            return (
                view.state.field(jsonValidationState, false) ?? {
                    is_valid: true,
                    error_count: 0,
                    warning_count: 0,
                }
            );
        },
    };
}
