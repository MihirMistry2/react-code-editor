import { Themes } from '../core/themes';

type ThemeName = keyof typeof Themes;

interface ThemeColors {
    background?: string;
    foreground?: string;
    selection?: string;
    cursor?: string;
    gutterBackground?: string;
    gutterForeground?: string;
    activeLineBackground?: string;
    activeLineGutter?: string;
    lineNumber?: string;
    activeLineNumber?: string;
}

interface ThemeSyntax {
    keyword?: string;
    string?: string;
    number?: string;
    comment?: string;
    variable?: string;
    function?: string;
    type?: string;
    property?: string;
    class?: string;
    tag?: string;
    attribute?: string;
    operator?: string;
    punctuation?: string;
}

export interface Theme {
    dark: boolean;
    colors: ThemeColors;
    syntax: ThemeSyntax;
}

export type EditorTheme = ThemeName | Theme;
