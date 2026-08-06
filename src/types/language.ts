import { Completion } from '@codemirror/autocomplete';

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
    schema?: Completion[];
    jsx?: boolean;
    hover?: boolean;
}

export interface HtmlEditorConfig extends BaseEditorConfig {}

export interface LanguageOptions {
    json?: JsonEditorConfig;
    js?: JsEditorConfig;
    ts?: JsEditorConfig;
    html?: HtmlEditorConfig;
    /*
    css?: CssEditorConfig;
    python?: PythonEditorConfig;
    */
}

export type EditorLanguage = keyof LanguageOptions;
