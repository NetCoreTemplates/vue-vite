import { appendQueryString, IReturn, JsonServiceClient, nameOf } from '@servicestack/client'
import { Authenticate } from "./dtos"
import { IResponse } from "swrv/dist/types";
import useSWRV from "swrv";

declare var API_URL:string //defined in vite.config.ts

export const client = new JsonServiceClient(API_URL)
    .useBasePath("/api")

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
        return await client.post(new Authenticate());
    } catch (e) {
        return undefined
    }
}

export const logout = async () => 
    client.post(new Authenticate({ provider: 'logout' }))

