import { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';

import createEditor from '../core/createEditor';
import { EditorContainerProps } from '../types';

export const EditorContainer = ({
    value,
    theme,
    readOnly,
    onChange,
}: EditorContainerProps) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        viewRef.current = createEditor({
            value,
            parent: editor,
            theme,
            readOnly,
            onChange,
        });

        return () => {
            viewRef.current?.destroy();
            viewRef.current = null;
        };
    }, []);

    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;

        const currentValue = view.state.doc.toString();
        if (value !== currentValue) {
            view.dispatch({
                changes: {
                    from: 0,
                    to: currentValue.length,
                    insert: value,
                },
            });
        }
    }, [value]);

    return <div ref={editorRef} className="cm-editor-container" />;
};
