<template>
  <AppPage title="Sign Up" class="max-w-xl">

    <form @submit.prevent="onSubmit">
      <div class="shadow overflow-hidden sm:rounded-md">
        <ErrorSummary except="displayName,userName,password,confirmPassword,autoLogin"/>
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="flex flex-col gap-y-4">
            <TextInput id="displayName" help="Your first and last name" v-model="displayName"/>
            <TextInput id="userName" placeholder="Email" help="" v-model="username"/>
            <TextInput id="password" type="password" help="6 characters or more" v-model="password"/>
            <TextInput id="confirmPassword" type="password" v-model="confirmPassword"/>
            <CheckboxInput id="autoLogin" />
          </div>
        </div>
        <div class="pt-5 px-4 py-3 bg-gray-50 text-right sm:px-6">
          <div class="flex justify-end">
            <FormLoading class="flex-1"/>
            <PrimaryButton class="ml-3">Sign Up</PrimaryButton>
          </div>
        </div>
      </div>
    </form>

    <div class="flex mt-8 ml-8">
      <h3 class="mr-4 leading-8 text-gray-500">Quick Links</h3>
      <span class="relative z-0 inline-flex shadow-sm rounded-md">
        <button type="button" @click="setUser('new@user.com')"
                class="-ml-px relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            new@user.com
      </button>
    </span>
    </div>

  </AppPage>
</template>

<script setup lang="ts">
import AppPage from "@/components/AppPage.vue"

import { ref, watchEffect, nextTick } from "vue"
import { useRouter } from "vue-router"
import { leftPart, rightPart, serializeToObject, toPascalCase } from "@servicestack/client"
import { useClient, useAuth } from "@servicestack/vue"
import { Register } from "@/dtos"
import { revalidate } from "@/auth"
import { getRedirect } from "@/routing"

const client = useClient()
const { user } = useAuth()
const displayName = ref("")
const username = ref("")
const password = ref("")
const confirmPassword = ref("")
const router = useRouter()

const stop = watchEffect(() => {
  if (user.value) {
    router.push(getRedirect(router) ?? '/')
    nextTick(stop)
  }
})

function setUser(email: string) {
  let first = leftPart(email, '@')
  let last = rightPart(leftPart(email, '.'), '@')
  displayName.value = toPascalCase(first) + ' ' + toPascalCase(last)
  username.value = email
  confirmPassword.value = password.value = 'p@55wOrd'
}

async function onSubmit(e: Event) {
  const {
    displayName,
    userName,
    password,
    confirmPassword,
    autoLogin
  } = serializeToObject(e.currentTarget as HTMLFormElement)
  if (password !== confirmPassword) {
    client.setError({ fieldName:'confirmPassword', message:'Passwords do not match' })
    return
  }

  const api = await client.api(new Register({ displayName, email: userName, password, confirmPassword, autoLogin }))
  if (api.succeeded) {
    await revalidate()
    await router.push("/signin")
  }
}
</script>
