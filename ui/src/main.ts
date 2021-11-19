import "@/styles/form.css"
import "@/styles/index.css"
import { createApp } from "vue"

import App from "@/App.vue"
import { router } from "@/router"

const vueApp = createApp(App)
const registerComponents = (components:Record<string, { [key: string]: any }>) => {

    Object.entries(components).forEach(([path, definition]) => {
        // Get name of component, based on filename
        const componentName = path.split('/').pop()!.replace(/\.\w+$/, '')

        // Register component on this Vue instance
        vueApp.component(componentName, definition.default)
    })
}

registerComponents(import.meta.globEager('./components/*.vue'))
registerComponents(import.meta.globEager('./components/form/*.vue'))

vueApp
    .use(router)
    .mount('#app')
