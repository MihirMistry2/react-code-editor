import { EditorView } from '@codemirror/view';
import { Diagnostic } from '@codemirror/lint';

export const validation =
    (
        linterFn: (view: EditorView) => Diagnostic[],
        onValidationChange?: (isValid: boolean) => void,
    ) =>
    (view: EditorView): Diagnostic[] => {
        const diagnostics = linterFn(view);

        if (onValidationChange) {
            const isValid = diagnostics.every((d) => d.severity !== 'error');
            onValidationChange(isValid);
        }

        return diagnostics;
    };
