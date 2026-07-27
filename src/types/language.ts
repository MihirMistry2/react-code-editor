import { Completion } from '@codemirror/autocomplete';
export interface BaseEditorConfig {
    diagnostics?: boolean;
    gutter?: boolean;
    autocomplete?: boolean;
    hover?: boolean;
    line_wrapping?: boolean;
}

export interface JsonEditorConfig extends BaseEditorConfig {
    schema?: Record<string, any>;
    schemaLint?: boolean;
}

export interface JsEditorConfig extends BaseEditorConfig {
    schema?: Completion[];
    jsx?: boolean;
}

export interface LanguageOptions {
    json?: JsonEditorConfig;
    js?: JsEditorConfig;
    ts?: JsEditorConfig;
    /*
    html?: HtmlEditorConfig;
    css?: CssEditorConfig;
    python?: PythonEditorConfig;
    */
}

export type EditorLanguage = keyof LanguageOptions;
