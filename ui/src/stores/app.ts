import { acceptHMRUpdate, defineStore } from "pinia"
import { combinePaths, createErrorStatus, MetadataTypes, ResponseStatus } from "@servicestack/client"
import { client } from "@/api"

export const useAppStore = defineStore('app', () => {
    // State
    const loading = ref<Boolean>(false)
    const error = ref<ResponseStatus|null>()
    const metadata = ref<MetadataTypes|undefined>()
    const types = computed(() => metadata.value?.types ?? [])

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
        error,
        loading,
        metadata,
        types,
        load,
        getType,
        enumOptions,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
