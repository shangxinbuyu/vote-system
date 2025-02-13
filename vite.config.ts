import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueSetupExtend()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    server: {
        host: '0.0.0.0',
        port: 80,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
