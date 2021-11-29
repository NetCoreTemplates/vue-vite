import "@/styles/index.css"

import { createApp } from "vue"
import { createHead } from "@vueuse/head"
import { createRouter, createWebHistory } from "vue-router"

import { setupLayouts } from "virtual:generated-layouts"
import generatedRoutes from "~pages"
import App from "@/App.vue"
import { configRouter } from "@/router"

const app = createApp(App)
const head = createHead()

const routes = setupLayouts(generatedRoutes)

export const router = configRouter(createRouter({
    history: createWebHistory(),
    routes,
}))

app
    .use(head)
    .use(router)
    .mount('#app')
