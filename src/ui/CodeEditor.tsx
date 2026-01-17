import { useState } from 'react';

import { EditorContainer } from './';
import { CodeEditorProps } from '../types';

export const CodeEditor: React.FC<CodeEditorProps> = ({
    value,
    theme,
    readOnly,
    onChange,
}): React.ReactElement => {
    const [content, setContent] = useState(value);

    const handleEditorChange = (value: string) => {
        setContent(value);
        onChange?.(value);
    };

    return (
        <EditorContainer
            value={content}
            theme={theme}
            readOnly={readOnly}
            onChange={handleEditorChange}
        />
    );
};
