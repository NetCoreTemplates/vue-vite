import { attrs, loading, signout } from "./auth"
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router"
import { Component, computed, h, nextTick, watchEffect } from "vue"

import NotFound from "@/pages/NotFound.vue"
import NavLink from "@/components/NavLink.vue"
import PrimaryButton from "@/components/form/PrimaryButton.vue"
import SecondaryButton from "@/components/form/SecondaryButton.vue"

// Auto generated routes by https://github.com/hannoeru/vite-plugin-pages 
import routes from "~pages"

// Typed Routes used in Components
export const Routes = {
    signin: (redirectTo?:string) => redirectTo ? `/signin?redirect=${redirectTo}` : `/signin`,
    forbidden: () => '/forbidden',
}

// Components used in Header Navigation
const link = bindNavComponent(NavLink),
      btn1 = bindNavComponent(PrimaryButton),
      btn2 = bindNavComponent(SecondaryButton)

function bindNavComponent(component: Component) {
    return (slot: any, props: any, visibility?: { show?: string, hide?: string }) =>
        ({ el: h(component, props, () => slot), path:props.href, ...visibility })
}

// Header Navigation
let NAV = [
    link('Markdown Posts', { href: '/posts' }),
    link('Features',    { href: '/features' }),

    link('Profile',     { href: '/profile' }, { show: 'auth' }),
    link('Admin',       { href: '/admin' },   { show: 'role:Admin' }),
    btn2('Sign Out',    { onclick: (e: any) => signout('/'), style: 'margin:0 .5rem' }, { show: 'auth' }),

    btn2('Sign In',     { href: '/signin', style: 'margin:0 .5rem' }, { hide: 'auth' }),
    btn1('Register',    { href: '/signup', style: 'margin:0 .5rem' }, { hide: 'auth' }),
]

type RouteGuard = { path:string, attr:string }
const ROUTE_GUARDS:RouteGuard[] = [
    ...NAV.filter(x => x.path && x.show).map(({ path, show }) => ({ path, attr:show! })),
    // Additional guards not defined in Header nav
]

// return which nav items to show based on the Authenticated Users attributes
export const navItems = computed(() => NAV.filter(item => {
    if (item.show) return attrs.value.indexOf(item.show) >= 0
    if (item.hide) return attrs.value.indexOf(item.hide) == -1
    return true
}).map(navItem => navItem.el))


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...routes,
        { path: '/:pathMatch(.*)*', component: NotFound },
    ],
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
