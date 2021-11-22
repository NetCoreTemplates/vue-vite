import "./styles/form.css"
import "./styles/index.css"
import { createApp } from "vue"

import App from "./App.vue"
import { router } from "./router"

const vueApp = createApp(App)

vueApp
    .use(router)
    .mount('#app')
