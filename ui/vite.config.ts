/// <reference types="node" />

// TODO: replace with your production URLs
const PROD_API = 'https://vue-vite.web-templates.io'
const PROD_CDN = 'https://vue-vite-gh.web-templates.io'
const USE_DEV_PROXY = false // Change to use CORS-free URL: http://localhost:3000/api

import vue from "@vitejs/plugin-vue"
import Markdown from "vite-plugin-md"
import Pages from "vite-plugin-pages"
import path from "path"
import { defineConfig } from "vite"

const isProd = process.env.NODE_ENV === 'production'
const API_URL = isProd ? PROD_API : (USE_DEV_PROXY ? '/' : 'http://localhost:5000')
const SRC_PATH = isProd ? PROD_CDN : path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),

        // Enable Markdown Support https://github.com/antfu/vite-plugin-md
        Markdown({
            markdownItOptions: {
                // html: true,
            },
            markdownItSetup(md) {
                //md.use(require('markdown-it-anchor'))
            },
            wrapperComponent: 'MarkdownPage'
        }),
        
        // Auto generate routes form file conventions https://github.com/hannoeru/vite-plugin-pages
        Pages({
            pagesDir: [
              { dir: "src/pages", baseRoute: "posts" },
              { dir: "src/views", baseRoute: "" },
            ],
            extensions: ['vue', 'md'],
        })
    ],
    define: { API_URL: `"${API_URL}"` },
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
