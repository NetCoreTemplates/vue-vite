<template>
  <input id="confirmDelete" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
         v-model="deleteConfirmed" />
  <label for="confirmDelete" class="mx-2 select-none">confirm</label>
  <span @click.prevent="onClick" :class="cls" v-bind="$attrs">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
let deleteConfirmed = ref<boolean>(false)

const emit = defineEmits<{
  (e:'delete'): void
}>()

const onClick = () => {
  if (deleteConfirmed.value) emit('delete')
}

const cls = computed(() => ["select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
  deleteConfirmed.value ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400"])
</script>
