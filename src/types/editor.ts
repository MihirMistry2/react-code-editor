export interface CreateEditorOptions {
    value: string;
    parent: HTMLElement;
    onChange?: (value: string) => void;
}

export interface EditorContainerProps {
    value: string;
    onChange?: (value: string) => void;
}

export interface CodeEditorProps extends EditorContainerProps {}
