import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ReactCodeEditor',
            formats: ['es', 'cjs'],
            fileName: (format) => `react-code-editor.${format}.js`,
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'codemirror',
                '@codemirror/state',
                '@codemirror/view',
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
