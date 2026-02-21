import { EditorState, StateEffect, StateField } from '@codemirror/state';
import type { Diagnostic } from '@codemirror/lint';

import { ValidationDiagnostic, ValidationState } from '../../../types/';

export const setValidationState = StateEffect.define<ValidationState>();

export const computeValidationState = (
    state: EditorState,
    diagnostics: readonly Diagnostic[],
): ValidationState => {
    let errorCount = 0;
    let warningCount = 0;
    const transformedDiagnostics: ValidationDiagnostic[] = [];

    for (const d of diagnostics) {
        if (d.severity === 'error') errorCount++;
        else if (d.severity === 'warning') warningCount++;

        if (['error', 'warning'].includes(d.severity)) {
            const line = state.doc.lineAt(d.from);

            transformedDiagnostics.push({
                line: line.number,
                column: d.from - line.from + 1,
                severity: d.severity as 'error' | 'warning',
                message: d.message,
            });
        }
    }

    return {
        diagnostics: transformedDiagnostics,
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

export const jsonValidationState = StateField.define<ValidationState>({
    create() {
        return {
            diagnostics: [],
            stats: {
                isValid: true,
                errorCount: 0,
                warningCount: 0,
            },
        };
    },
    update(value, tr) {
        for (const e of tr.effects) {
            if (e.is(setValidationState)) {
                return e.value;
            }
        }
        return value;
    },
});
