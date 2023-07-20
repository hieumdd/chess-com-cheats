import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                content: './src/content.ts',
                'service-worker': './src/service-worker.ts',
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]',
            },
        },
    },
});
