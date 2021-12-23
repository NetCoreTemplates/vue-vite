<template>
  <router-link v-if="href" :to="href" v-slot="{ navigate }">
    <button :type="type ?? 'button'" :class="cls" :href="href" @click="navigate">
      <slot></slot>
    </button>
  </router-link>
  <button v-else :type="type ?? 'button'" :class="cls" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{ type?: "submit" | "button" | "reset", href?: string }>()

const cls = "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
</script>