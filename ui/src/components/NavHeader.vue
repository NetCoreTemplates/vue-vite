<template>
  <header class="border-b border-gray-200 pr-3">
    <div class="flex flex-wrap items-center">
      <div class="flex-shrink flex-grow-0">
        <router-link to="/">
          <div class="p-4 cursor-pointer"><img class="w-9 h-9" src="/assets/img/logo.svg" alt="MyApp logo"></div>
        </router-link>
      </div>
      <div class="flex flex-grow flex-shrink flex-nowrap justify-end items-center">
        <nav class="relative flex flex-grow">
          <ul class="flex flex-wrap items-center justify-end w-full m-0">
            <NavItem>
              <SecondaryButton class="m-2" href="/hosting">
                <div class="flex align-middle">
                  <MdiCurrencyUsd class="text-gray-700 w-5 h-5" />
                  0.40 /mo
                </div>
              </SecondaryButton>
            </NavItem>
            <NavItem>
              <NavLink href="/posts">Blog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/features">Features</NavLink>
            </NavItem>
            <NavItem show="auth">
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
            <NavItem show="role:Admin">
              <NavLink href="/admin">Admin</NavLink>
            </NavItem>
            <NavItem show="auth">
              <SecondaryButton class="m-2" @click="signout($router)">Sign Out</SecondaryButton>
            </NavItem>
            <NavItem hide="auth">
              <SecondaryButton class="m-2" href="/signin">Sign In</SecondaryButton>
            </NavItem>
            <NavItem hide="auth">
              <PrimaryButton class="m-2" href="/signup">Register</PrimaryButton>
            </NavItem>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import NavItem from "@/components/NavItem.vue"
import NavLink from "@/components/NavLink.vue"
import SecondaryButton from "@/components/form/SecondaryButton.vue"
import PrimaryButton from "@/components/form/PrimaryButton.vue"

import { signout } from "@/auth"
</script>
