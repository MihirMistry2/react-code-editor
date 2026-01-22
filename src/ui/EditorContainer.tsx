import { useEffect, useRef } from 'react';

import { createEditor } from '../core/editor';
import { EditorContainerProps } from '../types';

export const EditorContainer = ({
    value,
    theme,
    readOnly,
    onChange,
    controller,
}: EditorContainerProps) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const view = createEditor({
            value,
            parent: editor,
            theme,
            readOnly,
            onChange,
        });

        controller.setView(view);

        return () => {
            controller.setView(null as any);
            view.destroy();
        };
    }, [theme, readOnly]);

    useEffect(() => {
        const view = controller.getView();
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

    return <div className="cm-editor-container" ref={editorRef} />;
};
