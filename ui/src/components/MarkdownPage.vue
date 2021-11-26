<template>
  <div class="min-h-screen">
    <main class="flex justify-center">
      <div class="mx-auto px-5">
        <AppBreadcrumb v-if="frontmatter.title" class="my-8" :crumbs="$route.meta.crumbs" :name="frontmatter.title"/>
        <article class="prose lg:prose-xl">
          <slot></slot>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { router } from "@/router"

type FrontMatter = {
  title: string
}
defineProps<{ frontmatter: FrontMatter }>()
</script>