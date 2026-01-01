import { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';

import createEditor from '../core/createEditor';
import { EditorContainerProps } from '../types/index';

const EditorContainer = ({ value, onChange }: EditorContainerProps) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        viewRef.current = createEditor({
            value,
            parent: editor,
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

    return <div ref={editorRef} />;
};

export default EditorContainer;
