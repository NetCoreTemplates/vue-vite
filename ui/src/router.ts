import { auth, attrs, signout } from "./auth"
import { createRouter, createWebHistory, LocationQuery, Router, RouteRecordRaw } from "vue-router"
import { Component, computed, h } from "vue"

import NavLink from "@/components/NavLink.vue"
import PrimaryButton from "@/components/form/PrimaryButton.vue"
import SecondaryButton from "@/components/form/SecondaryButton.vue"
import { withoutSuffix } from "@/utils"

function bindNavComponent(component: Component) {
    return (slot: any, props: any, visibility?: { show?: string, hide?: string }) =>
        ({ el: h(component, props, () => slot), ...visibility })
}

const link = bindNavComponent(NavLink),
    btn1 = bindNavComponent(PrimaryButton),
    btn2 = bindNavComponent(SecondaryButton);

export const Routes = {
    signin: (redirectTo?:string) => redirectTo ? `/signin?redirect=${redirectTo}` : `/signin`,
    forbidden: () => '/forbidden',
}

let nav = [
    link('About',    { href: '/about' }),

    link('Profile',  { href: '/profile' }, { show: 'auth' }),
    link('Admin',    { href: '/admin' },   { show: 'role:Admin' }),
    btn2('Sign Out', { onclick: (e: any) => signout('/'), class: 'mx-2' }, { show: 'auth' }),

    btn2('Sign In',  { href: '/signin', class: 'mx-2' }, { hide: 'auth' }),
    btn1('Register', { href: '/signup', class: 'mx-2' }, { hide: 'auth' }),
]

// return which nav items to show based on the Authenticated Users attributes
export const navItems = computed(() => nav.filter(item => {
    if (item.show) return attrs.value.indexOf(item.show) >= 0
    if (item.hide) return attrs.value.indexOf(item.hide) == -1
    return true
}).map(navItem => navItem.el))

// All Page Routes for this App
const routes: RouteRecordRaw[] = []

// Override default route convention for View Components:
const ViewCustomRoutes: { [key: string]: string } = {
    'Index': '/',
}

// Use default path convention based on Component name 
const toKebabCase = (s: string) => s
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
    .map(x => x.toLowerCase()).join('-');

const resolveRoutePath = (componentName: string) =>
    ViewCustomRoutes[componentName] ?? '/' + toKebabCase(withoutSuffix(componentName, 'Page'))


// Auto define and register routes for all App Views
const registerAppViews = (components: Record<string, { [key: string]: any }>) => {
    Object.entries(components).forEach(([path, definition]) => {
        // Get name of component, based on filename
        const componentName = path.split('/').pop()!.replace(/\.\w+$/, '')
        // Auto register Route for this View Component
        routes.push({
            path: resolveRoutePath(componentName),
            name: componentName,
            component: definition.default,
        })
    })
}
registerAppViews(import.meta.globEager('./views/*.vue'))


export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export function getRedirect(router:Router) {
    let { redirect } = router.currentRoute?.value.query
    let ret = redirect && Array.isArray(redirect)
        ? redirect[0]
        : redirect
    return ret?.toString()
}
