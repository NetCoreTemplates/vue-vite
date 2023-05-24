import { JsonApiClient } from "@servicestack/client"
import { useMetadata, useAuth } from "@servicestack/vue"
import { Authenticate } from "./dtos"

declare var API_URL:string //defined in vite.apply.ts

export const client = JsonApiClient.create(API_URL)

export function useApp() {

    async function load (force?:boolean) {
        const { loadMetadata } = useMetadata()
        await loadMetadata({
            olderThan: location.search.includes('clear=metadata') ? 0 : 60 * 60 * 1000 //1hr 
        })        
    }
    
    return {
        load,
        client,
    }
}

export async function checkAuth() {
    try {
        return await client.post(new Authenticate())
    } catch (e) {
        return undefined
    }
}

export async function logout() {
    await client.post(new Authenticate({ provider: 'logout' }))
    const { signOut } = useAuth()
    signOut()
}
