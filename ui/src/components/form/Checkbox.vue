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
      <label :for="id" class="font-medium text-gray-700 select-none">
        {{ name }}
      </label>
      <InputDescription :id="id" :description="description" :errorField="errorField"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputDescription from "@/components/form/InputDescription.vue"
import { errorResponse, ResponseStatus } from "@servicestack/client"
import { computed, useAttrs } from "vue";
import { remainingAttrs } from "@/utils";

const props = withDefaults(defineProps<{
  status?: ResponseStatus
  id: string
  name: string
  description?: string
}>(), {})

const remaining = computed(() => remainingAttrs(useAttrs(), props))

const errorField = computed(() => errorResponse.call({ responseStatus: props.status }, props.id))
</script>
