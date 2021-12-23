import { attrs, loading } from "./auth"
import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router"
import { nextTick, watchEffect } from "vue"

// Typed Routes used in Components
export const Routes = {
    signin: (redirectTo?:string) => redirectTo ? `/signin?redirect=${redirectTo}` : `/signin`,
    forbidden: () => '/forbidden',
}

// Use Route Guards to guard against access to pages 
type RouteGuard = { path:string, attr:string }
const ROUTE_GUARDS:RouteGuard[] = [
    { path:'/profile',       attr:'auth' },
    { path:'/admin',         attr:'role:Admin' },
    { path:'/bookings-crud', attr:'role:Employee' },
]

export function configRouter(router:Router)  {
    const invalidAttrRedirect = (to:RouteLocationNormalized, guardAttr:string, userAttrs:string[]) => userAttrs.indexOf('auth') === -1
        ? Routes.signin(to.path)
        : Routes.forbidden()

    // Validate Route guards against Authenticated User's Attributes
    const validateRoute = (to:RouteLocationNormalized, next:NavigationGuardNext, attrs:string[]) => {
        for (let i=0; i<ROUTE_GUARDS.length; i++) {
            const { path, attr } = ROUTE_GUARDS[i]
            if (!to.path.startsWith(path)) continue
            if (attrs.indexOf(attr) === -1) {
                const isAdmin = attrs.indexOf('role:Admin') >= 0
                const allowAdmin = isAdmin && (attr.startsWith('role:') || attr.startsWith('perm:'))
                if (!allowAdmin) {
                    const goTo = invalidAttrRedirect(to, attr, attrs)
                    next(goTo)
                    return
                }
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

    return router
}

export function getRedirect(router:Router) {
    let { redirect } = router.currentRoute?.value.query
    let ret = redirect && Array.isArray(redirect)
        ? redirect[0]
        : redirect
    return ret?.toString()
}
