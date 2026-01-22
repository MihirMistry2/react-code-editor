import type { EditorView } from '@codemirror/view';

export const copyToClipboard = async (
    view: EditorView | null | undefined
): Promise<boolean> => {
    if (!view) return false;

    const { state } = view;
    const selection = state.selection.main;

    const text = selection.empty
        ? state.doc.toString()
        : state.doc.sliceString(selection.from, selection.to);

    if (!text) return false;

    try {
        if (
            typeof navigator !== 'undefined' &&
            navigator.clipboard?.writeText
        ) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        if (typeof document !== 'undefined') {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';

            document.body.appendChild(textarea);
            textarea.select();

            const success = document.execCommand('copy');
            document.body.removeChild(textarea);

            return success;
        }

        return false;
    } catch {
        return false;
    }
};
