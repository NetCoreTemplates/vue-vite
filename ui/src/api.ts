import type { IReturn, JsonServiceClient } from "@servicestack/client"
import { appendQueryString, nameOf, JsonApiClient } from "@servicestack/client"
import { useMetadata } from "@servicestack/vue"
import { Authenticate } from "./dtos"
import { IResponse } from "swrv/dist/types"
import useSWRV from "swrv"

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

export function requestKey<T>(request: IReturn<T>) {
    return appendQueryString(nameOf(request), request)
}

class SwrClient {
    client:JsonServiceClient
    constructor(client:JsonServiceClient) { this.client = client }
    get<T>(fn: () => IReturn<T> | string) : IResponse<T, any> {
        return useSWRV(() => {
            let request = fn()
            return appendQueryString(`SwrClient:${nameOf(request)}`, request)
        }, key => this.client.get(fn()))
    }
}
export const swrClient = new SwrClient(client)

export const checkAuth = async () => {
    try {
        return await client.post(new Authenticate())
    } catch (e) {
        return undefined
    }
}

export const logout = async () =>
    client.post(new Authenticate({ provider: 'logout' }))

