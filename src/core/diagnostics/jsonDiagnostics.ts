import { Extension } from '@codemirror/state';
import { linter, Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';

const getErrorPosition = (error: SyntaxError, doc: string) => {
    const match = error.message.match(/position (\d+)/);
    if (!match) return null;

    const pos = Number(match[1]);
    if (Number.isNaN(pos)) return null;

    return {
        from: pos,
        to: Math.min(pos + 1, doc.length),
    };
};

const jsonLinter = (view: EditorView): Diagnostic[] => {
    const diagnostics: Diagnostic[] = [];
    const doc = view.state.doc.toString();

    if (!doc.trim()) return diagnostics;

    try {
        JSON.parse(doc);
    } catch (error) {
        if (error instanceof SyntaxError) {
            const range = getErrorPosition(error, doc);
            if (range) {
                diagnostics.push({
                    from: range.from,
                    to: range.to,
                    severity: 'error',
                    message: error.message,
                });
            }
        }
    }

    return diagnostics;
};

export const jsonDiagnosticsExtension = (): Extension => {
    return linter((view) => jsonLinter(view));
};
