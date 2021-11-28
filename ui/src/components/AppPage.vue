<template>
  <div class="min-h-screen">
    <main>
      <div class="container mx-auto px-5">
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