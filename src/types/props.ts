import {
    EditorTheme,
    EditorLanguage,
    EditorOptions,
    LanguageOptions,
    SearchOptions,
    EditorController,
} from './';

export type EditorChangeHandler = (value: string) => void;

export interface CreateEditorOptions {
    parent: HTMLElement;
    value: string;
    theme?: EditorTheme;
    readOnly?: boolean;
    language: EditorLanguage;
    editorOptions?: EditorOptions;
    languageOptions?: LanguageOptions;
    search?: boolean | SearchOptions;
    onChange?: EditorChangeHandler;
}

export interface EditorContainerProps {
    value: string;
    controller: EditorController;
    theme?: EditorTheme;
    readOnly?: boolean;
    language: EditorLanguage;
    editorOptions?: EditorOptions;
    languageOptions?: LanguageOptions;
    search?: boolean | SearchOptions;
    onChange?: EditorChangeHandler;
}

interface BaseCodeEditorProps {
    theme?: EditorTheme;
    readOnly?: boolean;
    language: EditorLanguage;
    editorOptions?: EditorOptions;
    languageOptions?: LanguageOptions;
    search?: boolean | SearchOptions;
    onReady?: (controller: EditorController) => void;
}

interface ControlledCodeEditorProps {
    value: string;
    onChange: EditorChangeHandler;
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
