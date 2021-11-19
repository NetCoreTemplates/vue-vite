<template>
  <header class="border-b border-gray-200 pr-3">
    <div class="flex flex-wrap items-center">
      <div class="flex-shrink flex-grow-0">
        <router-link to="/">
          <div class="p-4 cursor-pointer"><img class="w-9 h-9" src="@/assets/img/logo.png" alt="MyApp logo"></div>
        </router-link>
      </div>
      <div class="flex flex-grow flex-shrink flex-nowrap justify-end items-center">
        <nav class="relative flex flex-grow">
          <ul class="flex flex-wrap items-center justify-end w-full m-0">
            <NavItems />
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { h, defineComponent } from "vue"
import { navItems } from "@/router"

// Custom Nav Component to render all dynamic Nav Items
const NavItems = defineComponent({
  setup() {
    return () => navItems.value.map(item => h('li', {
      'class': 'relative flex flex-wrap just-fu-start m-0 hover:text-green-600'
    }, item)) 
  }
})
</script>
