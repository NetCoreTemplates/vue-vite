import { attrs, signout } from "./auth"
import { createRouter, createWebHistory, Router } from "vue-router"
import { Component, computed, h } from "vue"

import NotFound from "@/views/NotFound.vue"
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
        ({ el: h(component, props, () => slot), ...visibility })
}

// Header Navigation
let nav = [
    link('Markdown Posts', { href: '/posts' }),
    link('About',    { href: '/about' }),

    link('Profile',  { href: '/profile' }, { show: 'auth' }),
    link('Admin',    { href: '/admin' },   { show: 'role:Admin' }),
    btn2('Sign Out', { onclick: (e: any) => signout('/'), style: 'margin:0 .5rem' }, { show: 'auth' }),

    btn2('Sign In',  { href: '/signin', style: 'margin:0 .5rem' }, { hide: 'auth' }),
    btn1('Register', { href: '/signup', style: 'margin:0 .5rem' }, { hide: 'auth' }),
]


// return which nav items to show based on the Authenticated Users attributes
export const navItems = computed(() => nav.filter(item => {
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

export function getRedirect(router:Router) {
    let { redirect } = router.currentRoute?.value.query
    let ret = redirect && Array.isArray(redirect)
        ? redirect[0]
        : redirect
    return ret?.toString()
}
