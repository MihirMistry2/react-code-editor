import { EditorView } from '@codemirror/view';
import type { Diagnostic } from '@codemirror/lint';

import { dispatchValidationState } from '../diagnostics';

export const validationLinter =
    (linterFn: (view: EditorView) => Diagnostic[]) =>
    (view: EditorView): Diagnostic[] => {
        const diagnostics = linterFn(view);

        view.dispatch({
            effects: dispatchValidationState(view.state, diagnostics),
        });

        return diagnostics;
    };
