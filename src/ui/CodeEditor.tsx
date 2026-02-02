import { useState, useMemo, useEffect } from 'react';

import { createEditorController } from '../core/editor';
import { resolveControlledInvariant } from '../core/invariants';
import { EditorContainer } from './';
import { CodeEditorProps } from '../types';

export const CodeEditor: React.FC<CodeEditorProps> = (
    props,
): React.ReactElement => {
    const {
        theme,
        readOnly,
        language,
        languageOptions,
        search,
        onChange,
        onReady,
    } = props;

    const { mode, value: resolvedContent } = resolveControlledInvariant(props);

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
            language={language}
            languageOptions={languageOptions}
            search={search}
            onChange={handleEditorChange}
            controller={controller}
        />
    );
};
