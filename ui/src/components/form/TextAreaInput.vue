<template>
  <div>
    <label v-if="useLabel" :for="id" class="block text-sm font-medium text-gray-700">{{ useLabel }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <textarea
         :name="id"
         :id="id"
         :class="cls"
         :placeholder="usePlaceholder"
         @input="$emit('update:modelValue', value($event.target))"
         :aria-invalid="errorField != null"
         :aria-describedby="`${id}-error`"
         v-bind="remaining">{{ modelValue }}</textarea>
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
  label?: string
  help?: string
  placeholder?: string
  modelValue?: string
}>()

const useLabel = computed(() => props.label ?? humanize(toPascalCase(props.id)))
const usePlaceholder = computed(() => props.placeholder ?? useLabel.value)

const remaining = computed(() => omit(useAttrs(), [...Object.keys(props)]))

let ctx: ApiState|undefined = inject('ApiState', undefined)
const errorField = computed(() => errorResponse.call({ responseStatus: props.status ?? ctx?.error.value }, props.id))

const cls = computed(() => ['shadow-sm block w-full sm:text-sm rounded-md', errorField.value
    ? 'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300'
    : 'text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'])
</script>

