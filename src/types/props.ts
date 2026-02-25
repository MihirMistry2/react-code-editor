import {
    ThemeName,
    EditorLanguage,
    LanguageOptions,
    SearchOptions,
    EditorController,
} from './';

export interface CreateEditorOptions {
    parent: HTMLElement;
    value: string;
    theme?: ThemeName;
    readOnly?: boolean;
    language: EditorLanguage;
    languageOptions?: LanguageOptions;
    search?: boolean | SearchOptions;
    onChange?: (value: string) => void;
}

export interface EditorContainerProps {
    value: string;
    controller: EditorController;
    theme?: ThemeName;
    readOnly?: boolean;
    language: EditorLanguage;
    languageOptions?: LanguageOptions;
    search?: boolean | SearchOptions;
    onChange?: (value: string) => void;
}

interface BaseCodeEditorProps {
    theme?: ThemeName;
    readOnly?: boolean;
    language: EditorLanguage;
    languageOptions?: LanguageOptions;
    search?: boolean | SearchOptions;
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
