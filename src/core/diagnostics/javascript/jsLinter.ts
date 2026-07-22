import { EditorView } from '@codemirror/view';
import { Diagnostic } from '@codemirror/lint';
import { syntaxTree } from '@codemirror/language';

const getJsErrorMessage = (
    view: EditorView,
    from: number,
    to: number,
): string => {
    const doc = view.state.doc;
    const badToken = doc.sliceString(from, to);
    const charBefore = from > 0 ? doc.sliceString(from - 1, from) : '';
    const charAfter = doc.sliceString(to, to + 1);

    if (badToken) {
        if ([';', '}', ']', ')'].includes(badToken)) {
            return `Unexpected token '${badToken}'`;
        }
        if (['{', '[', '('].includes(badToken)) {
            return `Unclosed or unexpected opening '${badToken}'`;
        }
        if (
            ['=', '+', '-', '*', '/', '==', '===', '&&', '||'].includes(
                badToken,
            )
        ) {
            return `Unexpected operator '${badToken}'`;
        }
        return `Syntax error near '${badToken}'`;
    }

    if (charBefore === '=') {
        return 'Missing expression after assignment operator';
    }

    if (charBefore === '(' || charAfter === ')') {
        return 'Invalid expression inside parentheses';
    }

    if (!charAfter) {
        return `Unexpected end of input`;
    }

    return `Syntax error`;
};

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
                message: getJsErrorMessage(view, from, to),
            });
        },
    });

    return diagnostics;
};
