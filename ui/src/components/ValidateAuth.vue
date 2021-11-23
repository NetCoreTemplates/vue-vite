<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { effect } from "vue"
import { signedIn, hasRole } from "@/auth"
import { Routes, router, getRedirect } from "@/router"

const props = defineProps<{
  role?: string,
  permission?: string,
  redirectTo?: string,
}>()

const shouldRedirect = () => !signedIn()
    ? Routes.signin(props.redirectTo ?? getRedirect(router) ?? router.currentRoute?.value.path)
    : props.role && !hasRole(props.role)
        ? Routes.forbidden()
        : props.permission && !hasRole(props.permission)
            ? Routes.forbidden()
            : null;

effect(async () => {
  const goTo = shouldRedirect()
  if (goTo) {
    await router.replace(goTo)
  }
})

</script>
