import { EditorState, StateEffect, StateField } from '@codemirror/state';
import type { Diagnostic } from '@codemirror/lint';

import { DiagnosticEntry, ValidationState } from '../../../types/';

export const setValidationState = StateEffect.define<ValidationState>();

export const computeValidationState = (
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

export const jsonValidationState = StateField.define<ValidationState>({
    create() {
        return {
            diagnostics: {
                errors: [],
                warnings: [],
            },
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
