<template>
  <div class="relative">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1">
      <input :type="type"
             :name="id"
             :id="id"
             :class="cls"
             :placeholder="placeholder ?? name"
             :value="modelValue"
             v-bind="remaining">
    </div>
    <InputDescription :id="id" :description="description" :errorField="errorField"/>
  </div>
</template>

<script setup lang="ts">
import InputDescription from "@/components/form/InputDescription.vue"
import { errorResponse, ResponseStatus } from "@servicestack/client"
import { computed, useAttrs } from "vue"
import { remainingAttrs } from "@/utils"

const props = withDefaults(defineProps<{
  status?: ResponseStatus
  id: string
  name: string
  type?: string
  description?: string
  placeholder?: string
  modelValue?: string
}>(), {
  type: "text"
})

const remaining = computed(() => remainingAttrs(useAttrs(), props))

const errorField = computed(() => errorResponse.call({ responseStatus: props.status }, props.id))

const cls = computed(() => ['block w-full sm:text-sm rounded-md', errorField.value
    ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
    : 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'])

</script>
