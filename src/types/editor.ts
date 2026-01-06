export type ThemeName = 'light' | 'dark';

export interface CreateEditorOptions {
    value: string;
    parent: HTMLElement;
    theme?: ThemeName;
    onChange?: (value: string) => void;
}

export interface EditorContainerProps {
    value: string;
    theme?: ThemeName;
    onChange?: (value: string) => void;
}

export interface CodeEditorProps extends EditorContainerProps {}
