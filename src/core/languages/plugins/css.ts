import type { Extension } from '@codemirror/state';
import { css } from '@codemirror/lang-css';

import { cssDiagnosticsExtension, validationState } from '../../diagnostics';

import type { LanguagePlugin } from '../../../types';

export const cssPlugin: LanguagePlugin<'css'> = {
    id: 'css',
    capabilities: {
        syntax: true,
        autocomplete: true,
        diagnostics: true,
        validation: false,
        hover: false,
        formatting: false,
    },
    build(): Extension[] {
        return [css(), validationState, cssDiagnosticsExtension()];
    },
};
