import { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';

import createEditor from '../core/createEditor';
import { EditorContainerProps } from '../types';

const EditorContainer = ({ value, theme, onChange }: EditorContainerProps) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        viewRef.current = createEditor({
            value,
            parent: editor,
            theme,
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

    return (
        <div
            ref={editorRef}
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default EditorContainer;
