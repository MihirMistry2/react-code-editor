import { Themes } from '../core/themes';

export type ThemeName = keyof typeof Themes;

export interface BaseEditorConfig {
    diagnostics?: boolean;
    gutter?: boolean;
    autocomplete?: boolean;
}

export interface JsonEditorConfig extends BaseEditorConfig {
    schema?: Record<string, any>;
    schemaLint?: boolean;
    hover?: boolean;
}

export interface JsEditorConfig extends BaseEditorConfig {
    jsx?: boolean;
}

export interface LanguageOptions {
    json?: JsonEditorConfig;
    js?: JsEditorConfig;
    /*
    ts?: TsEditorConfig;
    html?: HtmlEditorConfig;
    css?: CssEditorConfig;
    python?: PythonEditorConfig;
    */
}

export type EditorLanguage = keyof LanguageOptions;
