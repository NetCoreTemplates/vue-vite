import {
    appendQueryString,
    nameOf,
    IReturn,
    ApiResult,
    ApiRequest,
    IReturnVoid,
    EmptyResponse,
    ResponseStatus, 
    JsonServiceClient,
} from "@servicestack/client"
import { Authenticate } from "./dtos"
import { IResponse } from "swrv/dist/types"
import useSWRV from "swrv"
import { Ref } from "vue"

declare var API_URL:string //defined in vite.config.ts

export const client = new JsonServiceClient(API_URL)
    .useBasePath("/api")

export type ApiContext = {
    loading: Ref<boolean>,
    error: Ref<ResponseStatus|undefined>
    api<TResponse>(request: IReturn<TResponse> | ApiRequest, args?: any, method?: string): Promise<ApiResult<TResponse>>
    apiVoid(request: IReturnVoid | ApiRequest, args?: any, method?: string): Promise<ApiResult<EmptyResponse>>
}
// Managed client maintaining loading and error states that provides this 'ApiContext' to child components
export function useClient(): ApiContext {
    const loading = ref<boolean>(false)
    const error = ref<ResponseStatus|undefined>()

    async function api<TResponse>(request: IReturn<TResponse> | ApiRequest, args?: any, method?: string) {
        loading.value = true
        const apiResult = await client.api(request)
        loading.value = false
        error.value = apiResult.error
        return apiResult
    }

    async function apiVoid(request: IReturnVoid | ApiRequest, args?: any, method?: string) {
        loading.value = true
        const apiResult = await client.apiVoid(request)
        loading.value = false
        error.value = apiResult.error
        return apiResult
    }

    let ctx = { loading, error, api, apiVoid }
    provide('ApiContext', ctx)
    return ctx
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

