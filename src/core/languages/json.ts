import { json } from '@codemirror/lang-json';
import { Extension } from '@codemirror/state';

export const jsonLanguage = (): Extension => {
    return json();
};
