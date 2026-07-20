import { StateField } from '@codemirror/state';

import type { ValidationState } from '../../../types/';

import { setValidationState } from '../diagnostics';

export const validationState = StateField.define<ValidationState>({
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
