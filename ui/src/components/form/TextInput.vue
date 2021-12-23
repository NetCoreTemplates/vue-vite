<template>
  <div>
    <label v-if="useLabel" :for="id" class="block text-sm font-medium text-gray-700">{{ useLabel }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input :type="useType"
             :name="id"
             :id="id"
             :class="cls"
             :placeholder="usePlaceholder"
             :value="modelValue"
             @input="$emit('update:modelValue', value($event.target))"
             :aria-invalid="errorField != null"
             :aria-describedby="`${id}-error`"
             v-bind="remaining">
      <div v-if="errorField" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p v-if="errorField" class="mt-2 text-sm text-red-500" :id="`${id}-error`">{{ errorField }}</p>
    <p v-else-if="help" class="mt-2 text-sm text-gray-500" :id="`${id}-description`">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
import { errorResponse, humanize, omit, ResponseStatus, toPascalCase } from "@servicestack/client"
import { computed, useAttrs } from "vue"
import { ApiState } from "@/api"

const value = (e:EventTarget|null) => (e as HTMLInputElement).value //workaround IDE type-check error

const props = defineProps<{
  status?: ResponseStatus|null
  id: string
  type?: string
  label?: string
  help?: string
  placeholder?: string
  modelValue?: string|number
}>()

const useType = computed(() => props.type || 'text')
const useLabel = computed(() => props.label ?? humanize(toPascalCase(props.id)))
const usePlaceholder = computed(() => props.placeholder ?? useLabel.value)

const remaining = computed(() => omit(useAttrs(), [...Object.keys(props)]))

let ctx: ApiState|undefined = inject('ApiState', undefined)
const errorField = computed(() => errorResponse.call({ responseStatus: props.status ?? ctx?.error.value }, props.id))

const cls = computed(() => ['block w-full sm:text-sm rounded-md', errorField.value
    ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
    : 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'])
</script>
