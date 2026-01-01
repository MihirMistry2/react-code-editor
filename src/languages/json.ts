import { json } from '@codemirror/lang-json';
import { Extension } from '@codemirror/state';

const jsonLanguage = (): Extension => {
    return json();
};

export default jsonLanguage;
