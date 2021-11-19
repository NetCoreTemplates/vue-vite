/// <reference types="node" />

// TODO: replace with your production URLs
const PROD_API = 'https://vue-vite.web-templates.io'
const PROD_CDN = 'https://vue-vite-gh.web-templates.io'
const USE_DEV_PROXY = false // Change to use CORS-free URL: http://localhost:3000/api

import vue from "@vitejs/plugin-vue"
import path from "path"
import { defineConfig } from "vite"

const isProd = process.env.NODE_ENV === 'production'
const API_URL = isProd ? PROD_API : (USE_DEV_PROXY ? '/' : 'http://localhost:5000')
const SRC_PATH = isProd ? PROD_CDN : path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {API_URL: `"${API_URL}"`},
    resolve: {
        alias: {
            '@/': `${SRC_PATH}/`
        }
    },
    server: {
        proxy: USE_DEV_PROXY ? {
            '/api': {
                target: API_URL,
                changeOrigin: true,
                secure: false,
            }
        } : {}
    }
})
