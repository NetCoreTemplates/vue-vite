/// <reference types="vite/client" />
/// <reference types="node" />

// TODO: replace with your production URLs
const DEPLOY_API = 'https://$DEPLOY_API' // e.g. 'https://vue-vite.web-templates.io'
const USE_DEV_PROXY = false // Change to use CORS-free dev proxy at: http://localhost:3000/api
const DEV_API = 'http://localhost:5000'

import * as fs from "fs";
import vue from "@vitejs/plugin-vue"
import Markdown from "vite-plugin-md"
import Pages from "vite-plugin-pages"
import Components from "unplugin-vue-components/vite"
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import matter from "gray-matter"
import path from "path"
import { defineConfig } from "vite"

const isProd = process.env.NODE_ENV === 'production'

// @ts-ignore
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

    const buildLocal = command == "build" && mode == "development"
    const API_URL = isProd ? DEPLOY_API : (USE_DEV_PROXY || buildLocal ? '' : DEV_API)

    return ({
        build: {
            outDir: '../api/MyApp/wwwroot',
        },
        plugins: [
            vue({
                include: [/\.vue$/, /\.md$/],
            }),
            Components({
                extensions: ['vue', 'md'],
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                resolvers: [
                    // auto import icons https://github.com/antfu/unplugin-icons
                    IconsResolver({
                        componentPrefix: ''
                    }),
                ],
                dts: 'src/components.d.ts',
            }),

            // https://github.com/antfu/unplugin-icons
            Icons({ }),

            // Auto generate routes from file conventions https://github.com/hannoeru/vite-plugin-pages
            Pages({
                dirs: [
                    { dir: "src/pages", baseRoute: "posts" },
                    { dir: "src/views", baseRoute: command ? "" : "" },
                ],
                extensions: ['vue', 'md'],
                extendRoute(route:any) {
                    const filePath = path.resolve(__dirname, route.component.slice(1))
                    if (filePath.endsWith('.md')) {
                        const md = fs.readFileSync(filePath, 'utf-8')
                        const { data:frontmatter } = matter(md)
                        route.meta = Object.assign(route.meta || {}, { frontmatter })
                    }
                    return route
                },            
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
            {   // 404.html required for hosting SPA's on GitHub Pages CDN
                name: 'copy-cdn-spa-fallback',
                writeBundle() {
                    fs.copyFileSync(
                        path.resolve('../api/MyApp/wwwroot/index.html'),
                        path.resolve('../api/MyApp/wwwroot/404.html')
                    );
                }
            },
        ],
        define: { API_URL: `"${API_URL}"` },
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, './src')}/`
            }
        },
        server: {
            proxy: USE_DEV_PROXY ? {
                '/api': {
                    target: DEV_API,
                    changeOrigin: true,
                    secure: false,
                }
            } : {}
        }
    })
})
