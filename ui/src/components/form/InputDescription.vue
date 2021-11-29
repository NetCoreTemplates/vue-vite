<template>
  <div v-if="description || errorField" key="description"
       :class="`mt-2 text-sm ${errorField ? 'text-red-500' : 'text-gray-500'}`"
       :id="`${id}-description`"
       :aria-describedby="`${id}-description`">
    <div v-if="errorField" key="error-icon"
         class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <MdiAlertCircleOutline class="h-5 w-5 text-red-500" aria-hidden="true"/>
    </div>
    <div>{{ description ?? errorField }}</div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue"

defineProps<{
  id: string
  description?: string
  errorField?: Ref<string>
}>()
</script>
