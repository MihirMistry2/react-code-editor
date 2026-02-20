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
        getValidation() {
            if (!view) return null;

            return (
                view.state.field(jsonValidationState, false)?.stats ?? {
                    isValid: true,
                    errorCount: 0,
                    warningCount: 0,
                }
            );
        },
        getDiagnostics() {
            if (!view) return null;

            return (
                view.state.field(jsonValidationState, false)?.diagnostics ?? []
            );
        },
    };
}
