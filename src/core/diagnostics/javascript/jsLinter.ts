import { EditorView } from '@codemirror/view';

import { createSyntaxTreeLinter } from '../utils/syntaxTreeLinter';

const getErrorMessage = (
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

export const jsLinter = createSyntaxTreeLinter(getErrorMessage);
