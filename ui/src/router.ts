import { attrs, loading } from "./auth"
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router"
import { nextTick, watchEffect } from "vue"

// Auto generated routes by https://github.com/hannoeru/vite-plugin-pages 
import { setupLayouts } from "virtual:generated-layouts"
import generatedRoutes from "~pages"

// Typed Routes used in Components
export const Routes = {
    signin: (redirectTo?:string) => redirectTo ? `/signin?redirect=${redirectTo}` : `/signin`,
    forbidden: () => '/forbidden',
}

type RouteGuard = { path:string, attr:string }
const ROUTE_GUARDS:RouteGuard[] = [
    { path:'/profile', attr:'auth' },
    { path:'/admin',   attr:'role:Admin' },
    // Additional guards to protect against 
]

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

const invalidAttrRedirect = (to:RouteLocationNormalized, guardAttr:string, userAttrs:string[]) => userAttrs.indexOf('auth') === -1
    ? Routes.signin(to.path)
    : Routes.forbidden()

// Validate Route guards against Authenticated User's Attributes
const validateRoute = (to:RouteLocationNormalized, next:NavigationGuardNext, attrs:string[]) => {
    for (let i=0; i<ROUTE_GUARDS.length; i++) {
        const { path, attr } = ROUTE_GUARDS[i]
        if (!to.path.startsWith(path)) continue
        if (attrs.indexOf(attr) === -1) {
            const goTo = invalidAttrRedirect(to, attr, attrs)
            next(goTo)
            return
        }
    }
    next()
}

router.beforeEach((to,from,next) => {
    if (loading) {
        const stop = watchEffect(() => {
            validateRoute(to, next, attrs.value)
            nextTick(() => stop())
        })
    } else {
        validateRoute(to, next, attrs.value)
    }
})

export function getRedirect(router:Router) {
    let { redirect } = router.currentRoute?.value.query
    let ret = redirect && Array.isArray(redirect)
        ? redirect[0]
        : redirect
    return ret?.toString()
}
