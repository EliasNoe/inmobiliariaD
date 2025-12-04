import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            '@/Components': path.resolve(__dirname, 'resources/js/components'),
        },
    },
    server: {
        host: '127.0.0.1', // Forzar IPv4
        port: 5173,
        strictPort: false,
        hmr: {
            host: '127.0.0.1', // HMR también en IPv4
        },
    },
});
