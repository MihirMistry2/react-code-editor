import { EditorView } from '@codemirror/view';
import type { Diagnostic } from '@codemirror/lint';

import { dispatchValidationState } from './';

export const jsonValidationLinter =
    (linterFn: (view: EditorView) => Diagnostic[]) =>
    (view: EditorView): Diagnostic[] => {
        const diagnostics = linterFn(view);

        view.dispatch({
            effects: dispatchValidationState(diagnostics),
        });

        return diagnostics;
    };
