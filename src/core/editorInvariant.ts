import { CodeEditorProps, ResolvedEditorInvariant } from '../types';

const __DEV__ = process.env.NODE_ENV !== 'production';

export const editorInvariant = (
    props: CodeEditorProps,
): ResolvedEditorInvariant => {
    const { value, defaultValue } = props;
    const isControlled = value !== undefined;

    if (__DEV__) {
        if (value !== undefined && defaultValue !== undefined) {
            console.warn('CodeEditor: Do not use both value and defaultValue.');
        }

        if (value === undefined && defaultValue === undefined) {
            console.warn(
                'CodeEditor: Either value or defaultValue should be provided.',
            );
        }

        if (value !== undefined && typeof value !== 'string') {
            throw new Error('CodeEditor: value must be a string.');
        }

        if (defaultValue !== undefined && typeof defaultValue !== 'string') {
            throw new Error('CodeEditor: defaultValue must be a string.');
        }
    }

    return {
        mode: isControlled ? 'controlled' : 'uncontrolled',
        value: isControlled ? value! : (defaultValue ?? ''),
    };
};
