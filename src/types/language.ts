import { Completion } from '@codemirror/autocomplete';

export interface FeatureEditorConfig {
    auto_close_brackets?: boolean;
    line_numbers?: boolean;
    line_wrapping?: boolean;
    indent_unit?: number;
    indent_with_tab?: boolean;
}

export interface BaseEditorConfig extends FeatureEditorConfig {
    diagnostics?: boolean;
    gutter?: boolean;
    autocomplete?: boolean;
    hover?: boolean;
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
