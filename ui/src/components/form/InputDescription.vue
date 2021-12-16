<template>
  <div v-if="description" key="description" class="mt-2 text-sm text-gray-500"
       :id="`${id}-description`"
       :aria-describedby="`${id}-description`">
    <div>{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  description: string
}>()
</script>
