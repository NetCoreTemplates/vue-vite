<script setup lang="ts">
import { useAppStore } from "@/stores/app"

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'MyApp',
  meta: [
    { name: 'description', content: 'Vite SSG Starter Template' },
  ],
})

let store = useAppStore()
store.load()
</script>

<template>
  <router-view />
</template>
