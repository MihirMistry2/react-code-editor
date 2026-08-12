import { EditorView } from '@codemirror/view';

import { createSyntaxTreeLinter } from '../utils/syntaxTreeLinter';

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

export const jsonLinter = createSyntaxTreeLinter(getErrorMessage);
