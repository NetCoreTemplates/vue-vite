<template>
  <div class="min-h-screen">
    <main class="flex justify-center">
      <div class="mx-auto px-5">
        <AppBreadcrumb class="my-8" name="Markdown Posts"/>
        <h3 class="text-lg mb-8">
          List of Markdown Posts in <span class="bg-blue-50 text-blue-500 py-1 px-2 rounded">/pages</span>
        </h3>
        <div v-for="route in routes" class="mb-8">
          <router-link class="text-2xl hover:text-green-600" :to="route.path">{{ route.frontmatter.title }}</router-link>
          <p v-if="route.frontmatter.summary" class="text-gray-500">
            {{ route.frontmatter.summary }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router"
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

type FrontMatter = {
  title: string
  summary?: string
  date?: string
}

const routes = router.getRoutes()
    .filter(r => r.path.startsWith("/posts/") && r.meta?.frontmatter)
    .map(r => ({ path: r.path, name: r.name, frontmatter: (r.meta as any)?.frontmatter as FrontMatter }))
    .sort((a, b) => (b.frontmatter.date ?? "")?.localeCompare(a.frontmatter.date ?? ""))

</script>
