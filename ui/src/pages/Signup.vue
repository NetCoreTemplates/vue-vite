<template>
  <AppPage title="Sign Up">
    <ApiForm class="max-w-prose"
             v-model:loading="loading"
             v-model:status="status"
             @submit="onSubmit"
             @success="onSuccess">

      <div class="shadow overflow-hidden sm:rounded-md">
        <ErrorSummary :status="status" except="displayName,userName,password,confirmPassword"/>
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="flex flex-col gap-y-4">
            <TextInput :status="status" id="displayName" name="Display Name" description="Your first and last name"
                       v-model="displayName"/>
            <TextInput :status="status" id="userName" name="Email" description="" v-model="username"/>
            <TextInput :status="status" id="password" type="password" name="Password" description="6 characters or more"
                       v-model="password"/>
            <TextInput :status="status" id="confirmPassword" type="password" name="Confirm Password"
                       v-model="confirmPassword"/>
            <CheckBox :status="status" id="autoLogin" name="Auto Login"/>
          </div>
        </div>
        <div class="pt-5 px-4 py-3 bg-gray-50 text-right sm:px-6">
          <div class="flex justify-end">
            <FormLoading v-if="loading" class="flex-1"/>
            <PrimaryButton class="ml-3">Sign Up</PrimaryButton>
          </div>
        </div>
      </div>
    </ApiForm>

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
import ApiForm from "@/components/form/ApiForm.vue"
import ErrorSummary from "@/components/form/ErrorSummary.vue"
import TextInput from "@/components/form/TextInput.vue"
import CheckBox from "@/components/form/Checkbox.vue"
import FormLoading from "@/components/form/FormLoading.vue"
import PrimaryButton from "@/components/form/PrimaryButton.vue"

import { ref, watchEffect, nextTick } from "vue"
import { useRouter } from "vue-router"
import { createError, leftPart, ResponseStatus, rightPart, serializeToObject, toPascalCase } from "@servicestack/client"
import { client } from "@/api"
import { Register } from "@/dtos"
import { auth, revalidate } from "@/auth"
import { getRedirect } from "@/router"

const loading = ref(false)
const status = ref<ResponseStatus | undefined>()
const displayName = ref("")
const username = ref("")
const password = ref("")
const confirmPassword = ref("")
const router = useRouter()

let stop = watchEffect(() => {
  if (auth.value) {
    router.push(getRedirect(router) ?? '/')
    nextTick(stop)
  }
})

const setUser = (email: string) => {
  let first = leftPart(email, '@');
  let last = rightPart(leftPart(email, '.'), '@')
  displayName.value = toPascalCase(first) + ' ' + toPascalCase(last)
  username.value = email
  confirmPassword.value = password.value = 'p@55wOrd'
}

const onSubmit = async (e: Event) => {
  const {
    displayName,
    userName,
    password,
    confirmPassword,
    autoLogin
  } = serializeToObject(e.currentTarget as HTMLFormElement);
  if (password !== confirmPassword) {
    throw createError("ValidationException", "Passwords do not match", "confirmPassword")
  }
  return client.post(new Register({ displayName, email: userName, password, confirmPassword, autoLogin }))
}
const onSuccess = async () => {
  await revalidate()
  await router.push("/signin")
}
</script>
