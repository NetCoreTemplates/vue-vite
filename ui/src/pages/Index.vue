<template>
  <div class="min-h-screen">
    <main>
      <div class="container mx-auto px-5">

        <section class="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
          <h1 class="text-4xl md:text-6xl xl:text-8xl font-bold tracking-tighter leading-tight md:pr-8 whitespace-nowrap">
            Ultimate Vue
          </h1>

          <div class="flex flex-col">
            <h4 class="text-lg mt-5">
              Modern <a href="https://v3.vuejs.org"
                        class="underline hover:text-green-600 duration-200 transition-colors">Vue 3</a>
              C# template using
              <a href="https://vitejs.dev"
                 class="underline hover:text-green-600 duration-200 transition-colors">Vite</a>,
              <a href="https://www.typescriptlang.org"
                 class="underline hover:text-green-600 duration-200 transition-colors">TypeScript</a>,
              <a href="https://tailwindcss.com"
                 class="underline hover:text-green-600 duration-200 transition-colors">tailwindcss</a>
              &amp;
              <a href="https://servicestack.net"
                 class="underline hover:text-green-600 duration-200 transition-colors">ServiceStack</a>
            </h4>
            <div class="flex items-center flex-wrap sm:flex-nowrap">
              <input type="text" v-model="inputValue"
                     class="mt-2 sm:text-lg rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
              <HelloApi :name="inputValue"/>
            </div>
          </div>
        </section>

        <section>
          <div class="mb-8 md:mb-16">
            <div class="sm:mx-0 sm:px-4 sm:py-8 flex flex-wrap sm:flex-nowrap sm:border justify-evenly">

              <div>
                <a href="https://vuejs.org"
                   class="flex flex-col items-center sm:rounded px-3 py-2 sm:hover:shadow">
                  <LogosVue class="w-12 h-12 lg:w-52 lg:h-52 sm:p-2" alt="Vue.js logo"/>
                  <span class="block text-center sm:text-2xl">
                    Modern Reactive Elegance
                  </span>
                </a>
              </div>
              <div>
                <a href="https://vitejs.dev"
                   class="flex flex-col items-center sm:rounded px-3 py-2 sm:hover:shadow">
                  <LogosVitejs class="w-12 h-12 lg:w-52 lg:h-52" alt="Vite logo"/>
                  <span class="block text-center sm:text-2xl">
                    Supercharged Productivity
                  </span>
                </a>
              </div>
              <div>
                <a href="https://www.typescriptlang.org"
                   class="flex flex-col items-center sm:rounded px-3 py-2 sm:hover:shadow">
                  <LogosTypescriptIcon class="w-12 h-12 lg:w-52 lg:h-52 sm:p-4" alt="Typescript logo"/>
                  <span class="block text-center sm:text-2xl">
                    Industrial Typed Strength
                  </span>
                </a>
              </div>
              <div>
                <a href="https://tailwindcss.com"
                   class="flex flex-col items-center sm:rounded px-3 py-2 sm:hover:shadow">
                  <LogosTailwindcssIcon class="w-12 h-12 lg:w-52 lg:h-52 sm:p-1" alt="Tailwindcss logo"/>
                  <span class="block text-center sm:text-2xl">
                    Rapid Fluid Design
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <GettingStarted />

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import HelloApi from "@/components/HelloApi.vue"
import GettingStarted from "@/components/GettingStarted.vue"
import { ref } from "vue"

const inputValue = ref('Vue.js')
</script>