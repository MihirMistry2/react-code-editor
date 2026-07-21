import { EditorView } from '@codemirror/view';
import { Diagnostic } from '@codemirror/lint';
import { syntaxTree } from '@codemirror/language';

export const jsLinter = (view: EditorView): Diagnostic[] => {
    const diagnostics: Diagnostic[] = [];
    const tree = syntaxTree(view.state);
    const docLength = view.state.doc.length;

    tree.iterate({
        enter(node) {
            if (!node.type.isError) return;

            const from = node.from;
            const to = Math.min(node.to, docLength);

            diagnostics.push({
                from,
                to: from === to ? from + 1 : to,
                severity: 'error',
                message: 'JavaScript syntax error',
            });
        },
    });

    return diagnostics;
};
