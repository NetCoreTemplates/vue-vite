// TODO: replace with production URL of .NET App
const DEPLOY_API = 'https://$DEPLOY_API' // e.g. 'https://vue-ssg-api.jamstacks.net'
const USE_DEV_PROXY = false // Change to use CORS-free dev proxy at: http://localhost:5173/api
const DEV_API = 'https://localhost:5001'

import { defineConfig } from "vite"
import * as fs from "fs"
import * as path from "path"
import matter from "front-matter"
import vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"
import Layouts from "vite-plugin-vue-layouts"
import Components from "unplugin-vue-components/vite"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import AutoImport from "unplugin-auto-import/vite"
import Markdown from "vite-plugin-vue-markdown"
import Inspect from "vite-plugin-inspect"

const isProd = process.env.NODE_ENV === 'production'

// @ts-ignore
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

    const buildLocal = command == 'build' && mode == 'development'
    const API_URL = isProd ? DEPLOY_API : (USE_DEV_PROXY || buildLocal ? '' : DEV_API)

    return ({
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, './src')}/`
            }
        },
        build: {
            outDir: '../api/MyApp/wwwroot',
        },
        define: { API_URL: `"${API_URL}"` },
        plugins: [
            vue({
                include: [/\.vue$/, /\.md$/],
            }),

            // Auto generate routes from file conventions https://github.com/hannoeru/vite-plugin-pages
            Pages({
                extensions: ['vue', 'md'],
                extendRoute(route:any) {
                    const filePath = path.resolve(__dirname, route.component.slice(1))
                    if (filePath.endsWith('.md')) {
                        const md = fs.readFileSync(filePath, 'utf-8')
                        const { attributes:frontmatter } = matter(md)
                        const crumbs =  route.component.substring('/src/pages/'.length).split('/').slice(0,-1)
                            .map((name:string) => ({ name, href:`/${name}` }))
                        route.meta = Object.assign(route.meta || {}, { crumbs, frontmatter })
                    }
                    return route
                },
            }),

            // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
            Layouts(),

            // https://github.com/antfu/unplugin-auto-import
            AutoImport({
                imports: [
                    'vue',
                    'vue-router',
                    '@vueuse/head',
                    '@vueuse/core',
                ],
                dts: 'src/auto-imports.d.ts',
            }),

            // Auto Register Vue Components https://github.com/antfu/unplugin-vue-components
            Components({
                extensions: ['vue', 'md'],
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                resolvers: [
                    // auto import icons without any 'i-' prefix https://github.com/antfu/unplugin-icons
                    IconsResolver({
                        componentPrefix: ''
                    }),
                ],
                dts: 'src/components.d.ts', // auto-generated component type definitions
            }),

            // https://github.com/antfu/unplugin-icons
            Icons({
                autoInstall: true
            }),

            // Enable Markdown Support https://github.com/mdit-vue/vite-plugin-vue-markdown
            Markdown({
                headEnabled: true,
                markdownItSetup(md) {
                    // https://prismjs.com/
                    // md.use(Prism)
                },
                wrapperComponent: 'MarkdownPage'
            }),

            // https://github.com/antfu/vite-plugin-inspect
            Inspect({
                // change this to enable inspect for debugging
                enabled: false,
            }),
        ],
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
