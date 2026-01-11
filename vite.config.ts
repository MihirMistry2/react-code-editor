import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ReactCodeEditor',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'codemirror',
                '@codemirror/state',
                '@codemirror/view',
                '@codemirror/lang-json',
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    codemirror: 'codemirror',
                    '@codemirror/state': 'state',
                    '@codemirror/view': 'view',
                },
            },
        },
    },
});
