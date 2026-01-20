import { EditorView } from '@codemirror/view';

export const formatCode = (
    view: EditorView | null | undefined,
    formatter?: (code: string) => string,
): boolean => {
    if (!view || !formatter) return false;

    const { state } = view;
    const selection = state.selection.main;

    const from = selection.empty ? 0 : selection.from;
    const to = selection.empty ? state.doc.length : selection.to;

    const text = state.doc.sliceString(from, to);
    if (!text) return false;

    try {
        const formatted = formatter(text);

        view.dispatch({
            changes: { from, to, insert: formatted },
            selection: {
                anchor: from + formatted.length,
            },
        });

        return true;
    } catch (error) {
        console.error('Formatting error:', error);
        return false;
    }
};
