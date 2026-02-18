import { StateEffect, StateField } from '@codemirror/state';
import type { Diagnostic } from '@codemirror/lint';

export interface ValidationState {
    isValid: boolean;
    errorCount: number;
    warningCount: number;
}

export const setValidationState = StateEffect.define<ValidationState>();

export function computeValidationState(
    diagnostics: readonly Diagnostic[],
): ValidationState {
    let errorCount = 0;
    let warningCount = 0;

    for (const d of diagnostics) {
        if (d.severity === 'error') errorCount++;
        else if (d.severity === 'warning') warningCount++;
    }

    return {
        isValid: errorCount === 0,
        errorCount,
        warningCount,
    };
}

export function dispatchValidationState(diagnostics: readonly Diagnostic[]) {
    return setValidationState.of(computeValidationState(diagnostics));
}

export const jsonValidationState = StateField.define<ValidationState>({
    create() {
        return {
            isValid: true,
            errorCount: 0,
            warningCount: 0,
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
