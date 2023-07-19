import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: './manifest.json',
                    dest: '.'
                }
            ]
        })],
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                content: './src/content.ts'
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]'
            },
        }
    }
});
