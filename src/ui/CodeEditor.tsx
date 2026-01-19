import { useState, useMemo } from 'react';

import { createEditorController } from '../core/';
import { EditorContainer } from './';
import { CodeEditorProps } from '../types';

export const CodeEditor: React.FC<CodeEditorProps> = ({
    value,
    theme,
    readOnly,
    onChange,
    onReady,
}): React.ReactElement => {
    const [content, setContent] = useState(value);
    const controller = useMemo(() => createEditorController(), []);

    const handleEditorChange = (value: string) => {
        setContent(value);
        onChange?.(value);
    };

    if (onReady) {
        onReady(controller);
    }

    return (
        <EditorContainer
            value={content}
            theme={theme}
            readOnly={readOnly}
            onChange={handleEditorChange}
            controller={controller}
        />
    );
};
