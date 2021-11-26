<template>
  <div v-if="error" class="ml-2 text-red-500">{{ error.message }}</div>
  <div v-else class="ml-3 mt-2 text-2xl">{{ data ? data.result : 'loading...' }}</div>
</template>

<script setup lang="ts">
import { Hello } from "@/dtos"
import { swrClient } from "@/api"

const props = defineProps<{ name: string }>()

const { data, error } = swrClient.get(() => new Hello({ name: props.name }))
</script>
