<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input
          :id="id"
          :name="id"
          type="checkbox"
          value="true"
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          v-bind="remaining">
    </div>
    <div class="ml-3 text-sm">
      <label :for="id" class="font-medium text-gray-700 select-none">{{ useLabel }}</label>
      <p v-if="errorField" class="mt-2 text-sm text-red-500" id="`${id}-error`">{{ errorField }}</p>
      <p v-else-if="help" class="mt-2 text-sm text-gray-500" id="`${id}-description`">{{ help }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { errorResponse, humanize, ResponseStatus, toPascalCase } from "@servicestack/client"
import { computed, useAttrs } from "vue"
import { remainingAttrs } from "@/utils"

const props =defineProps<{
  status?: ResponseStatus
  id: string
  label?: string
  help?: string
}>()

const useLabel = computed(() => props.label ?? humanize(toPascalCase(props.id)))

const remaining = computed(() => remainingAttrs(useAttrs(), props))

const errorField = computed(() => errorResponse.call({ responseStatus: props.status }, props.id))
</script>
