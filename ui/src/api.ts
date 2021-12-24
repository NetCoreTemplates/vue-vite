import {
    appendQueryString,
    createErrorStatus,
    combinePaths,
    nameOf,
    IReturn,
    ApiResult,
    ApiRequest,
    IReturnVoid,
    MetadataTypes,
    EmptyResponse,
    ResponseError,
    ResponseStatus,
    JsonServiceClient,
} from "@servicestack/client"
import { Authenticate } from "./dtos"
import { IResponse } from "swrv/dist/types"
import useSWRV from "swrv"
import { Ref } from "vue"

declare var API_URL:string //defined in vite.apply.ts

export const client = new JsonServiceClient(API_URL).apply(c => {
    c.basePath = "/api"
    c.headers = new Headers() //avoid pre-flight CORS requests
})

export type ApiState = {
    loading: Ref<boolean>,
    error: Ref<ResponseStatus|undefined>
}
export type ErrorArgs = {
    message:string
    errorCode?:string
    fieldName?:string
    errors?:ResponseError[]
}
export type FieldErrorArgs = {
    fieldName:string
    message:string
    errorCode?:string
}
export type ClientContext = ApiState & {
    setError(args:ErrorArgs): void
    addFieldError(args:FieldErrorArgs): void
    api<TResponse>(request: IReturn<TResponse> | ApiRequest, args?: any, method?: string): Promise<ApiResult<TResponse>>
    apiVoid(request: IReturnVoid | ApiRequest, args?: any, method?: string): Promise<ApiResult<EmptyResponse>>
}

// Managed client maintaining loading and error states that provides this 'ApiContext' to child components
export function useClient() : ClientContext {
    const loading = ref<boolean>(false)
    const error = ref<ResponseStatus|undefined>()

    const setError = ({ message, errorCode, fieldName, errors } : ErrorArgs) => {
        errorCode ??= 'Exception'
        errors ??= []
        return error.value = fieldName
            ? new ResponseStatus({ errorCode, message,
                errors: [new ResponseError({ fieldName, errorCode, message })] })
            : new ResponseStatus({ errorCode, message, errors });
    }

    const addFieldError = ({ fieldName, message, errorCode } : FieldErrorArgs) => {
        errorCode ??= 'Exception'
        if (!error.value) {
            setError({ fieldName, message, errorCode })
        } else {
            let copy = new ResponseStatus(error.value)
            copy.errors = [...(copy.errors ?? []).filter(x => x.fieldName.toLowerCase() != fieldName.toLowerCase()),
                new ResponseError({ fieldName, message, errorCode })]
            error.value = copy
        }
    }

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

    let ctx = { setError, addFieldError, loading, error, api, apiVoid }
    provide('ApiState', ctx)
    return ctx
}

const metadata = ref<MetadataTypes|undefined>()
const error = ref<ResponseStatus|undefined>()
const loading = ref<Boolean>(false)
const loaded = computed(() => metadata.value != null)

export function useApp() {

    const load = async (force?:boolean) => {
        if (metadata.value && !force) return
        loading.value = true
        let r = await fetch(combinePaths(client.baseUrl, '/types/metadata.json'))
        loading.value = false
        if (r.ok) {
            let json = await r.text()
            metadata.value = JSON.parse(json) as MetadataTypes
        } else {
            error.value = createErrorStatus(r.statusText)
        }
    }

    const getType = (name:string) => metadata.value?.types?.find(x => x.name?.toLowerCase() == name.toLowerCase())

    const enumOptions = (name:string) => {
        let to:{[key:string]: any} = {}
        let type = getType(name)
        if (type && type.isEnum && type.enumNames != null) {
            for (let i=0; i<type.enumNames.length; i++) {
                const name = type.enumNames[i]
                const key = (type.enumValues != null ? type.enumValues[i] : null) ?? name
                to[key] = name
            }
        }
        return to
    }

    return {
        metadata,
        error,
        loaded,
        load,
        getType,
        enumOptions,
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

