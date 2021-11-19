import { JsonServiceClient } from '@servicestack/client'
import { Authenticate } from "./dtos"

declare var API_URL:string //defined in vite.config.ts

export const client = new JsonServiceClient(API_URL)
    .useBasePath("/api");

export const checkAuth = async () => {
    try {
        return await client.post(new Authenticate());
    } catch (e) {
        return undefined
    }
}

export const logout = async () => 
    client.post(new Authenticate({ provider: 'logout' }))

