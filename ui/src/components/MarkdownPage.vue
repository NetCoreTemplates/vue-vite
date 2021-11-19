<template>
  <div class="min-h-screen">
    <main>
      <div class="container mx-auto px-5">
        <AppBreadcrumb class="my-8" :name="frontmatter.title"/>
        <article class="prose lg:prose-xl">
          <slot></slot>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'

type FrontMatter = {
  title: string
}

defineProps<{ frontmatter: FrontMatter }>()
</script>