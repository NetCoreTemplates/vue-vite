<template>
  <div v-if="errorSummary" :class="`bg-red-50 border-l-4 border-red-400 p-4 ${$props.class}`">
    <div class="flex">
      <div class="flex-shrink-0">
        <MdiCloseCircle class="h-5 w-5 text-red-400" aria-hidden="true"/>
      </div>
      <div class="ml-3">
        <p class="text-sm text-red-700">{{ errorSummary }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { errorResponseExcept, ResponseStatus } from "@servicestack/client"
import { computed } from "vue"
import { ApiState } from "@/api"

const props = defineProps<{
  status?: ResponseStatus|undefined,
  except: string | string[]
  class?: string
}>()

let ctx: ApiState|undefined = inject('ApiState', undefined)
const errorSummary = computed(() => props.status || ctx?.error.value 
    ? errorResponseExcept.call({ responseStatus: props.status ?? ctx?.error.value }, props.except) 
    : null)
</script>
