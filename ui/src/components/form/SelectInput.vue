<template>
<label v-if="useLabel" :for="id" class="block text-sm font-medium text-gray-700">{{ useLabel }}</label>
<select :id="id" :name="id" :class="['mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none border-gray-300 sm:text-sm rounded-md',
    !errorField ? 'text-gray-900 focus:ring-indigo-500 focus:border-indigo-500' : 'text-red-900 focus:ring-red-500 focus:border-red-500']"
    :value="modelValue"
    @input="$emit('update:modelValue', value($event.target))"
    :aria-invalid="errorField != null"
    :aria-describedby="`${id}-error`"
    v-bind="remaining">
  <option v-for="entry in kvpValues" :value="entry.key">{{ entry.value }}</option>
</select>
<p v-if="errorField" class="mt-2 text-sm text-red-500" :id="`${id}-error`">{{ errorField }}</p>
</template>

<script setup lang="ts">
import { computed, defineProps, useAttrs } from "vue"
import { errorResponse, humanize, omit, ResponseStatus, toPascalCase } from "@servicestack/client"
import { ApiState } from "@/api"

const value = (e:EventTarget|null) => (e as HTMLSelectElement).value //workaround IDE type-check error

const props = defineProps<{
  status?: ResponseStatus
  id: string
  modelValue?: string
  label?: string
  options?: any
  values?: string[]
}>()

const useLabel = computed(() => props.label ?? humanize(toPascalCase(props.id)))

const remaining = computed(() => omit(useAttrs(), [...Object.keys(props)]))

let ctx: ApiState|undefined = inject('ApiState', undefined)
const errorField = computed(() => errorResponse.call({ responseStatus: props.status ?? ctx?.error.value }, props.id))

const kvpValues = computed(() => props.values 
    ? props.values.map(x => ({ key:x, value:x }))
    : props.options 
        ? Object.keys(props.options).map(key => ({ key, value:props.options[key] }))
        : []) 
</script>
