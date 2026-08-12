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

export const htmlLinter = createSyntaxTreeLinter(getErrorMessage);
