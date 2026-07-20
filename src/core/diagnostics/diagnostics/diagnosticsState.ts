import { EditorState, StateEffect } from '@codemirror/state';
import type { Diagnostic } from '@codemirror/lint';

import type { DiagnosticEntry, ValidationState } from '../../../types/';

export const setValidationState = StateEffect.define<ValidationState>();

const computeValidationState = (
    state: EditorState,
    diagnostics: readonly Diagnostic[],
): ValidationState => {
    let errorCount = 0;
    let warningCount = 0;
    const errors: DiagnosticEntry[] = [];
    const warnings: DiagnosticEntry[] = [];

    for (const d of diagnostics) {
        const line = state.doc.lineAt(d.from);
        const diagnosticEntry = {
            line: line.number,
            column: d.from - line.from + 1,
            message: d.message,
        };

        switch (d.severity) {
            case 'error':
                errorCount++;
                errors.push(diagnosticEntry);
                break;
            case 'warning':
                warningCount++;
                warnings.push(diagnosticEntry);
                break;
        }
    }

    return {
        diagnostics: {
            errors,
            warnings,
        },
        stats: {
            isValid: errorCount === 0,
            errorCount,
            warningCount,
        },
    };
};

export function dispatchValidationState(
    state: EditorState,
    diagnostics: readonly Diagnostic[],
) {
    return setValidationState.of(computeValidationState(state, diagnostics));
}
