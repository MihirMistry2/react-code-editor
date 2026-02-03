import { EditorView } from '@codemirror/view';
import { Diagnostic } from '@codemirror/lint';
import { syntaxTree } from '@codemirror/language';

const getErrorMessage = (view: EditorView, from: number): string => {
    const doc = view.state.doc;
    const charBefore = from > 0 ? doc.sliceString(from - 1, from) : '';
    const charAfter = doc.sliceString(from, from + 1);

    if (charBefore === ',') {
        return 'Trailing comma is not allowed in JSON';
    }

    if (charAfter === '}' || charAfter === ']') {
        return 'Missing value before closing bracket';
    }

    if (charAfter === ':') {
        return 'Missing value after ":"';
    }

    if (charBefore === ':') {
        return 'Missing value after ":"';
    }

    if (!charAfter) {
        return 'Unexpected end of JSON input';
    }

    return 'Invalid JSON syntax';
};

export const jsonLinter = (view: EditorView): Diagnostic[] => {
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
                message: getErrorMessage(view, from),
            });
        },
    });

    return diagnostics;
};
