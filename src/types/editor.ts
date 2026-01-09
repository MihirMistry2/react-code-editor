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
    onChange?: (value: string) => void;
}

export interface EditorContainerProps {
    value: string;
    theme?: ThemeName;
    onChange?: (value: string) => void;
}

export interface CodeEditorProps extends EditorContainerProps {}
