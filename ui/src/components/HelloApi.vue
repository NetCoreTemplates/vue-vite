<template>
  <div v-if="api.error" class="ml-2 text-red-500">{{ api.error!.message }}</div>
  <div v-else class="ml-3 mt-2 text-2xl">{{ api.response ? api.response.result : 'loading...' }}</div>
</template>

<script setup lang="ts">
import { Hello } from "@/dtos"
import { useClient } from "@servicestack/vue"

const client = useClient()

const props = defineProps<{ name: string }>()

const api = client.swrEffect(() => new Hello({ name: props.name }))
</script>
