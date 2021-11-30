<template>
  <div class="min-h-screen">
    <main class="flex justify-center">
      <div class="mx-auto px-5 mb-32">
        <AppBreadcrumb class="my-8" :name="title"/>
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from "@/components/AppBreadcrumb.vue"

defineProps<{ title: string }>()
</script>