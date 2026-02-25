import { EditorView } from 'codemirror';
import { ValidationStats, ValidationDiagnostic } from './';

export interface EditorController {
    getView(): EditorView | null;
    setView(view: EditorView | null): void;
    copy(): Promise<boolean | undefined>;
    foldAll(): boolean;
    unfoldAll(): boolean;
    format(formatter: (code: string) => string): boolean;
    openSearch(): void;
    closeSearch(): void;
    searchNext(): void;
    searchPrevious(): void;
    replace(): void;
    replaceAll(): void;
    getValidation(): ValidationStats | null;
    getDiagnostics(): ValidationDiagnostic | null;
}
