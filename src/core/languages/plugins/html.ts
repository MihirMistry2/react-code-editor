import type { Extension } from '@codemirror/state';
import { html } from '@codemirror/lang-html';

import type { LanguagePlugin, htmlEditorConfig } from '../../../types';

export const htmlPlugin: LanguagePlugin<'html'> = {
    id: 'html',
    capabilities: {
        syntax: true,
        autocomplete: true,
        diagnostics: true,
        validation: true,
        hover: true,
        formatting: false,
    },
    build(options: htmlEditorConfig): Extension[] {
        console.log('htmlPlugin build options:', options);
        return [html()];
    },
};
