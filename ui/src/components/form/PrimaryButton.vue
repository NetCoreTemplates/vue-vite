<template>
  <router-link v-if="href" :to="href" v-slot="{ navigate }">
    <button :class="cls" :href="href" @click="navigate">
      <slot></slot>
    </button>
  </router-link>
  <button v-else :type="type" :class="cls" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ type?: "submit" | "button" | "reset", href?: string, color?: string }>(), {
  type: 'submit',
})

const cls = "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    .replace(/indigo/g, props.color ?? "indigo")
</script>