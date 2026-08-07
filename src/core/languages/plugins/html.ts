import type { Extension } from '@codemirror/state';
import { html } from '@codemirror/lang-html';

import { htmlDiagnosticsExtension, validationState } from '../../diagnostics';

import type { LanguagePlugin, HtmlEditorConfig } from '../../../types';

export const htmlPlugin: LanguagePlugin<'html'> = {
    id: 'html',
    capabilities: {
        syntax: true,
        autocomplete: true,
        diagnostics: true,
        validation: false,
        hover: false,
        formatting: false,
    },
    build(options: HtmlEditorConfig): Extension[] {
        return [html(), validationState, htmlDiagnosticsExtension(options)];
    },
};
