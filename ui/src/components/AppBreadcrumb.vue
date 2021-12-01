<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center sm:space-x-4 flex-wrap sm:flex-nowrap">
      <li>
        <div>
          <router-link to="/">
            <a class="text-gray-600 hover:text-gray-700">
              <MdiHome class="flex-shrink-0 h-10 w-10" aria-hidden="true"/>
              <span class="sr-only">Home</span>
            </a>
          </router-link>
        </div>
      </li>
      <li v-for="crumb in crumbs">
        <div class="flex items-center">
          <MdiChevronRight class="flex-shrink-0 h-8 w-8 text-gray-400" aria-hidden="true"/>
          <router-link :to="crumb.href">
            <a class="ml-1 sm:ml-4 sm:text-2xl text-gray-500 hover:text-gray-700">
              {{ crumb.name }}
            </a>
          </router-link>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <MdiChevronRight class="flex-shrink-0 h-8 w-8 text-gray-400" aria-hidden="true"/>
          <router-link v-if="href" :to="href">
            <a class="ml-1 sm:ml-4 sm:text-2xl text-gray-500 hover:text-gray-700" :aria-current="ariaCurrent">
              {{ name }}
            </a>
          </router-link>
          <span v-else class="ml-1 sm:ml-4 sm:text-3xl text-gray-700" :aria-current="ariaCurrent">
            {{ name }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue"

export type Crumb = {
  name:  string,
  href: string
}

const { current } = withDefaults(defineProps<{
  crumbs?: Crumb[],
  name: string, 
  href?: string,
  current?: boolean, 
}>(), {
  current: true,
  crumbs: () => []
})

const ariaCurrent = computed(() => current ? 'page' : undefined)
</script>
