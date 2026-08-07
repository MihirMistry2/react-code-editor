import { EditorView } from '@codemirror/view';
import { Diagnostic } from '@codemirror/lint';
import { syntaxTree } from '@codemirror/language';

const getHtmlErrorMessage = (
    view: EditorView,
    from: number,
    to: number,
): string => {
    const doc = view.state.doc;
    const badToken = doc.sliceString(from, to);
    const charBefore = from > 0 ? doc.sliceString(from - 1, from) : '';

    if (badToken) {
        if (badToken === '>') {
            return `Unexpected closing bracket '>'`;
        }
        if (badToken === '<') {
            return `Unexpected unclosed or misplaced tag starting with '<'`;
        }
        if (badToken === '"' || badToken === "'") {
            return `Unmatched quote mark ${badToken}`;
        }
        return `HTML Syntax error near '${badToken}'`;
    }

    if (charBefore === '<') {
        return `Expected tag name after '<'`;
    }

    if (charBefore === '=') {
        return `Missing attribute value after '='`;
    }

    return `Syntax error in HTML markup`;
};

export const htmlLinter = (view: EditorView): Diagnostic[] => {
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
                to: from === to ? Math.min(from + 1, docLength) : to,
                severity: 'error',
                message: getHtmlErrorMessage(view, from, to),
            });
        },
    });

    return diagnostics;
};
