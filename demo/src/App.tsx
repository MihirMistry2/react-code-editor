import { useState } from 'react';
import { CodeEditor } from 'react-code-editor';

const App = () => {
    const [code, setCode] = useState('{\n  "hello": "world"\n}');

    return (
        <div style={{ height: '100vh', padding: '16px' }}>
            <CodeEditor value={code} onChange={setCode} />
        </div>
    );
};

export default App;
