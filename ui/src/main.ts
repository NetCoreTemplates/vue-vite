import "@/styles/index.css"
import "@/styles/main.css"

import { createApp } from "vue"
import { createHead } from "@vueuse/head"
import { createRouter, createWebHistory } from "vue-router"
import { createPinia } from "pinia"

import { setupLayouts } from "virtual:generated-layouts"
import generatedRoutes from "~pages"
import App from "@/App.vue"
import { configRouter } from "@/routing"

const app = createApp(App)
const head = createHead()

const routes = setupLayouts(generatedRoutes)

export const router = configRouter(createRouter({
    history: createWebHistory(),
    routes,
}))

const pinia = createPinia()

app
    .use(head)
    .use(router)
    .use(pinia)
    .mount('#app')
