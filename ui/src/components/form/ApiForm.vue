<template>
  <form v-bind="$attrs" @submit="handleSubmit">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { ResponseStatus } from "@servicestack/client"

const { onSubmit } = defineProps<{
  onSubmit?: (e: SubmitEvent) => Promise<any> | any
}>()

const emit = defineEmits<{
  (e: "success", result: any): void
  (e: "error", error: ResponseStatus): void
  (e: "complete"): void
  (e: "update:status", status: ResponseStatus | null): void
  (e: "update:loading", loading: boolean): void
}>()

const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault()

  if (onSubmit) {
    emit("update:loading", true)
    emit("update:status", null)
    try {

      let response = await onSubmit(e)
      emit("success", response)

    } catch (e: any) {
      emit("error", e.responseStatus)
      emit("update:status", e.responseStatus)
    } finally {
      emit("update:loading", false)
      emit("complete")
    }
  }
}

</script>