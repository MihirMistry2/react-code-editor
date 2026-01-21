import { useState, useMemo, useEffect } from 'react';

import { createEditorController, editorInvariant } from '../core/';
import { EditorContainer } from './';
import { CodeEditorProps } from '../types';

export const CodeEditor: React.FC<CodeEditorProps> = (
    props,
): React.ReactElement => {
    const { theme, readOnly, onChange, onReady } = props;

    const { mode, value: resolvedContent } = editorInvariant(props);

    const [internalContent, setInternalContent] = useState(resolvedContent);

    const controller = useMemo(() => createEditorController(), []);

    const handleEditorChange = (value: string) => {
        if (mode === 'uncontrolled') {
            setInternalContent(value);
        }
        onChange?.(value);
    };

    useEffect(() => {
        onReady?.(controller);
    }, [controller, onReady]);

    return (
        <EditorContainer
            value={mode === 'controlled' ? resolvedContent : internalContent}
            theme={theme}
            readOnly={readOnly}
            onChange={handleEditorChange}
            controller={controller}
        />
    );
};
