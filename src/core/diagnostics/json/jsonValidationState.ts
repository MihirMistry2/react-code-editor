import { StateEffect, StateField } from '@codemirror/state';
import type { Diagnostic } from '@codemirror/lint';

export interface ValidationState {
    is_valid: boolean;
    error_count: number;
    warning_count: number;
}

export const setValidationState = StateEffect.define<ValidationState>();

export function computeValidationState(
    diagnostics: readonly Diagnostic[],
): ValidationState {
    let error_count = 0;
    let warning_count = 0;

    for (const d of diagnostics) {
        if (d.severity === 'error') error_count++;
        else if (d.severity === 'warning') warning_count++;
    }

    return {
        is_valid: error_count === 0,
        error_count,
        warning_count,
    };
}

export function dispatchValidationState(diagnostics: readonly Diagnostic[]) {
    return setValidationState.of(computeValidationState(diagnostics));
}

export const jsonValidationState = StateField.define<ValidationState>({
    create() {
        return {
            is_valid: true,
            error_count: 0,
            warning_count: 0,
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
