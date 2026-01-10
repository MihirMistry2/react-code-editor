import { useMemo, useState } from 'react';
import { CodeEditor } from 'react-code-editor';

import { DUMMY_DATA } from '../constants';

const App = () => {
    const json = useMemo(
        () => JSON.stringify(DUMMY_DATA, null, 4),
        [DUMMY_DATA]
    );
    const [code, setCode] = useState(json);

    return (
        <div className="page">
            <section className="main">
                <CodeEditor
                    value={json}
                    theme="dracula_dark"
                    onChange={setCode}
                />
            </section>
        </div>
    );
};

export default App;
