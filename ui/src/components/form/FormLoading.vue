<template>
  <div v-if="loading" class="flex" title="loading...">
    <svg v-if="icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30">
      <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"/>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"/>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"/>
      </rect>
      <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"/>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"/>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"/>
      </rect>
      <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"/>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"/>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"/>
      </rect>
    </svg>
    <span class="ml-2 mt-1 text-gray-400">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { ApiState } from "@/api"

const props = withDefaults(defineProps<{
  loading?: boolean
  icon?: boolean
  text?: string
}>(), {
  icon: true,
  text: "loading..."
})

let ctx: ApiState|undefined = inject('ApiState', undefined)
let loading = computed(() => props.loading ?? ctx?.loading.value)

</script>
