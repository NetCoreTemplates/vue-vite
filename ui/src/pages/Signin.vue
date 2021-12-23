<template>
  <AppPage title="Sign In" class="max-w-xl">
    
    <form @submit.prevent="onSubmit">
      <div class="shadow overflow-hidden sm:rounded-md">
        <ErrorSummary except="userName,password,rememberMe"/>
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="flex flex-col gap-y-4">
            <TextInput id="userName" placeholder="Email" help="Email you signed up with" v-model="username" />
            <TextInput id="password" type="password" help="6 characters or more" v-model="password"/>
            <CheckBox id="rememberMe" />
          </div>
        </div>
        <div class="pt-5 px-4 py-3 bg-gray-50 text-right sm:px-6">
          <div class="flex justify-end">
            <FormLoading class="flex-1"/>
            <SecondaryButton href="/signup">Register New User</SecondaryButton>
            <PrimaryButton class="ml-3">Login</PrimaryButton>
          </div>
        </div>
      </div>
    </form>

    <div class="flex mt-8">
      <h3 class="hidden xs:block mr-4 leading-8 text-gray-500">Quick Links</h3>
      <span class="relative z-0 inline-flex shadow-sm rounded-md">
        <button type="button" @click="setUser('admin@email.com')"
                class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            admin@email.com
        </button>
        <button type="button" @click="setUser('manager@email.com')"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            manager@email.com
        </button>
        <button type="button" @click="setUser('employee@email.com')"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            employee@email.com
        </button>
        <button type="button" @click="setUser('new@user.com')"
                class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            new@user.com
        </button>
      </span>
    </div>
    
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from "@/components/AppPage.vue"
import ErrorSummary from "@/components/form/ErrorSummary.vue"
import TextInput from "@/components/form/TextInput.vue"
import CheckBox from "@/components/form/Checkbox.vue"
import FormLoading from "@/components/form/FormLoading.vue"
import PrimaryButton from "@/components/form/PrimaryButton.vue"
import SecondaryButton from "@/components/form/SecondaryButton.vue"

import { ref, watchEffect, nextTick } from "vue"
import { useRouter } from "vue-router"
import { serializeToObject } from "@servicestack/client"
import { useClient } from "@/api"
import { Authenticate } from "@/dtos"
import { auth, revalidate } from "@/auth"
import { getRedirect } from "@/routing"

const client = useClient()
const username = ref('')
const password = ref('')
const router = useRouter()

let stop = watchEffect(() => {
  if (auth.value) {
    router.push(getRedirect(router) ?? '/')
    nextTick(() => stop())
  }
})

const setUser = (email: string) => {
  username.value = email
  password.value = "p@55wOrd"
}

const onSubmit = async (e: Event) => {
  const { userName, password, rememberMe } = serializeToObject(e.currentTarget as HTMLFormElement)
  const api = await client.api(new Authenticate({ provider: 'credentials', userName, password, rememberMe }))
  if (api.succeeded)
    await revalidate()
}
</script>
