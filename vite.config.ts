import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ReactCodeEditor',
            fileName: (format) => `react-code-editor.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
});
