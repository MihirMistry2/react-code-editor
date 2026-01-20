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

export interface CreateEditorOptions {
    value: string;
    parent: HTMLElement;
    theme?: ThemeName;
    readOnly?: boolean;
    onChange?: (value: string) => void;
}

export interface EditorContainerProps {
    value: string;
    theme?: ThemeName;
    readOnly?: boolean;
    controller: any;
    onChange?: (value: string) => void;
}

export interface CodeEditorProps {
    value: string;
    theme?: ThemeName;
    readOnly?: boolean;
    onChange?: (value: string) => void;
    onReady?: (controller: EditorController) => void;
}

export interface EditorController {
    getView(): EditorView | null;
    setView(view: EditorView): void;
    copy(): Promise<boolean | undefined>;
    foldAll(): boolean;
    unfoldAll(): boolean;
}
