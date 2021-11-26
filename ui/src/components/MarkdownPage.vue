<template>
  <div class="min-h-screen">
    <main class="flex justify-center">
      <div class="mx-auto px-5">
        <AppBreadcrumb v-if="frontmatter.title" class="my-8" :crumbs="crumbs" :name="frontmatter.title"/>
        <article class="prose lg:prose-xl">
          <slot></slot>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import AppBreadcrumb, { Crumb } from '@/components/AppBreadcrumb.vue'

type FrontMatter = {
  title: string
}
defineProps<{ frontmatter: FrontMatter }>()

const crumbs = computed(() => useRouter().currentRoute.value.meta.crumbs as Crumb[])
</script>
