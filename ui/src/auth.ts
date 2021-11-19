import { ref, computed } from "vue"
import { checkAuth, client, logout } from "./api"
import { AuthenticateResponse } from "./dtos"
import { router } from "./router"

export function createAttrs(auth?: AuthenticateResponse) {
    return auth ? [
        'auth',
        ...(auth?.roles || []).map(role => `role:${role}`),
        ...(auth?.permissions || []).map(perm => `perm:${perm}`),
    ] : []
}

export const auth = ref<AuthenticateResponse|undefined>()
checkAuth().then(r => auth.value = r)

export async function revalidate() {
    loading.value = true
    signin(await checkAuth())
    loading.value = false
}

export const loading = ref(false)

export const signedIn = () => auth.value !== undefined

export const attrs = computed(() => createAttrs(auth.value))

export const signin = (response?: AuthenticateResponse) => {
    return auth.value = response;
}

export const signout = async (redirectTo?: string) => {
    auth.value = undefined
    await logout()
    if (redirectTo) {
        await router.push(redirectTo)
    }
}

export const hasRole = (role: string) => (auth?.value?.roles || []).indexOf(role) >= 0
export const hasPermission = (permission: string) => (auth?.value?.permissions || []).indexOf(permission) >= 0
