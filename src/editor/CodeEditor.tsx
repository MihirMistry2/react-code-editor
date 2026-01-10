import { useState } from 'react';

import EditorContainer from './EditorContainer';
import { CodeEditorProps } from '../types';

const CodeEditor: React.FC<CodeEditorProps> = ({
    value,
    theme,
    onChange,
}): React.ReactElement => {
    const [content, setContent] = useState(value);

    const handleEditorChange = (value: string) => {
        setContent(value);
        onChange?.(value);
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <EditorContainer
                value={content}
                theme={theme}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditor;
