import { EditorView } from 'codemirror';

export type ThemeName =
    | 'light'
    | 'dark'
    | 'ayu_light'
    | 'clouds_light'
    | 'espresso_light'
    | 'noctis_lilac_light'
    | 'rose_pine_dawn_light'
    | 'smoothy_light'
    | 'tomorrow_light'
    | 'barf_dark'
    | 'cobalt_dark'
    | 'cool_glow_dark'
    | 'dracula_dark';

export type EditorLanguage = keyof LanguageOptions;

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

export interface EditorController {
    getView(): EditorView | null;
    setView(view: EditorView | null): void;
    copy(): Promise<boolean | undefined>;
    foldAll(): boolean;
    unfoldAll(): boolean;
    format(formatter: (code: string) => string): boolean;
}

export interface CreateEditorOptions {
    parent: HTMLElement;
    value: string;
    theme?: ThemeName;
    readOnly?: boolean;
    language: EditorLanguage;
    languageOptions?: LanguageOptions;
    onChange?: (value: string) => void;
}

export interface EditorContainerProps {
    value: string;
    controller: EditorController;
    theme?: ThemeName;
    readOnly?: boolean;
    language: EditorLanguage;
    languageOptions?: LanguageOptions;
    onChange?: (value: string) => void;
}

interface BaseCodeEditorProps {
    theme?: ThemeName;
    readOnly?: boolean;
    language: EditorLanguage;
    languageOptions?: LanguageOptions;
    onReady?: (controller: EditorController) => void;
}

interface ControlledCodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    defaultValue?: never;
}

interface UncontrolledCodeEditorProps {
    defaultValue: string;
    value?: never;
    onChange?: never;
}

export type CodeEditorProps =
    | (BaseCodeEditorProps & ControlledCodeEditorProps)
    | (BaseCodeEditorProps & UncontrolledCodeEditorProps);

export interface ResolvedControlledInvariant {
    mode: 'controlled' | 'uncontrolled';
    value: string;
}

export interface JsonEditorConfig {
    diagnostics?: boolean;
    gutter?: boolean;
    schema?: Record<string, any>;
    schemaLint?: boolean;
    hover?: boolean;
    autocomplete?: boolean;
}
