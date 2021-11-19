<template>
  <ValidateAuth role="Admin">
    <AppPage v-if="user" title="Admin Page">
      <div class="flex flex-col items-center justify-center">
        <ShieldCheckIcon class="w-36 h-36 text-gray-700"/>
        <div>{{ user.displayName }}</div>
        <div>{{ user.userName }}</div>
        <div class="mt-2">
          <span v-for="role in roles"
                :key="role"
                class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
            {{ role }}
          </span>
        </div>
        <SecondaryButton class="mt-8" @click="signout()">Sign Out</SecondaryButton>
      </div>
    </AppPage>
  </ValidateAuth>
</template>

<script setup lang="ts">
import AppPage from "@/components/AppPage.vue"
import ValidateAuth from "@/components/ValidateAuth.vue"
import SecondaryButton from "@/components/form/SecondaryButton.vue"
import { ShieldCheckIcon } from "@heroicons/vue/outline"
import { auth, signout } from "@/auth"

const user = auth.value!
const roles = auth.value?.roles ?? []
</script>
