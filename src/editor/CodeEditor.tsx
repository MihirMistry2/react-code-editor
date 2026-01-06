import { useState } from 'react';

import EditorContainer from './EditorContainer';
import { CodeEditorProps } from '../types/index';

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
                height: '100%',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
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
