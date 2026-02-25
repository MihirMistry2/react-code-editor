import { Themes } from '../core/themes';

export type ThemeName = keyof typeof Themes;

export interface JsonEditorConfig {
    diagnostics?: boolean;
    gutter?: boolean;
    schema?: Record<string, any>;
    schemaLint?: boolean;
    hover?: boolean;
    autocomplete?: boolean;
}

export interface LanguageOptions {
    json?: JsonEditorConfig;
    /*
    js?: JsEditorConfig;
    ts?: TsEditorConfig;
    html?: HtmlEditorConfig;
    css?: CssEditorConfig;
    python?: PythonEditorConfig;
    */
}

export type EditorLanguage = keyof LanguageOptions;
