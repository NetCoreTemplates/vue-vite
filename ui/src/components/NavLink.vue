<template>
  <router-link :to="$attrs.href">
    <a class="flex items-center justify-start mw-full p-4 hover:text-success" v-bind="$attrs">
      <slot></slot>
    </a>
  </router-link>
</template>
