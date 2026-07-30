import { Extension } from '@codemirror/state';
import {
    dropCursor,
    rectangularSelection,
    crosshairCursor,
    keymap,
    drawSelection,
} from '@codemirror/view';
import { minimalSetup } from 'codemirror';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { searchKeymap } from '@codemirror/search';
import { lintKeymap } from '@codemirror/lint';
import { history, historyKeymap, defaultKeymap } from '@codemirror/commands';

export const basicSetup: Extension[] = [
    minimalSetup,
    history(),
    drawSelection(),
    dropCursor(),
    rectangularSelection(),
    crosshairCursor(),
    autocompletion(),
    keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...completionKeymap,
        ...searchKeymap,
        ...lintKeymap,
    ]),
];
