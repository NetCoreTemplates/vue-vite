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
            <div class="flex items-center">
              <input type="text" v-model="inputValue"
                     class="mt-2 sm:text-lg rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
              <HelloApi :name="inputValue"/>
            </div>
          </div>
        </section>

        <section>
          <div class="mb-8 md:mb-16">
            <div class="sm:mx-0 sm:px-4 sm:py-8 flex sm:border justify-evenly">

              <div>
                <a href="https://vuejs.org"
                   class="flex flex-col items-center sm:rounded sm:px-3 sm:py-2 sm:hover:shadow">
                  <img class="w-52 h-52 sm:p-2" src="@/assets/img/vue.svg" alt="Vue.js logo">
                  <span class="block text-center sm:text-2xl">
                Modern Reactive Elegance
            </span>
                </a>
              </div>
              <div>
                <a href="https://vitejs.dev"
                   class="flex flex-col items-center sm:rounded sm:px-3 sm:py-2 sm:hover:shadow">
                  <img class="w-52 h-52" src="@/assets/img/vite.svg" alt="Vite logo">
                  <span class="block text-center sm:text-2xl">
              Supercharged Productivity
            </span>
                </a>
              </div>
              <div>
                <a href="https://www.typescriptlang.org"
                   class="flex flex-col items-center sm:rounded sm:px-3 sm:py-2 sm:hover:shadow">
                  <img class="w-52 h-52 sm:p-4" src="@/assets/img/typescript.svg" alt="Typescript logo">
                  <span class="block text-center sm:text-2xl">
            Industrial Typed Strength
          </span>
                </a>
              </div>
              <div>
                <a href="https://tailwindcss.com"
                   class="flex flex-col items-center sm:rounded sm:px-3 sm:py-2 sm:hover:shadow">
                  <img class="w-52 h-52 sm:p-1" src="@/assets/img/tailwindcss.svg" alt="tailwindcss logo">
                  <span class="block text-center sm:text-2xl">
              Rapid Fluid Design
            </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 whitespace-nowrap text-center pt-8">
            Getting Started
          </h2>
          <div class="mb-8 md:mb-16">
            <div class="sm:mx-0 sm:px-4 sm:py-8 flex justify-evenly">
              <div class="flex flex-col">

                <h4 class="py-6 text-center text-xl">Create New Project</h4>
                <input type="text" v-model="project" autocomplete="off" spellcheck="false"
                       class="mb-8 sm:text-lg rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"/>
                
                <ShellCommand class="mb-2">dotnet tool install -g x</ShellCommand>
                <ShellCommand class="mb-2">mkdir {{project}} && cd {{project}}</ShellCommand>
                <ShellCommand class="mb-2">x new vue-vite</ShellCommand>

                <h4 class="py-6 text-center text-xl">Build &amp; Run Client Dev Server</h4>
                <ShellCommand class="mb-2">cd {{uiPath()}} &amp;&amp; npm run build:local</ShellCommand>
                <ShellCommand class="mb-2">npm run dev</ShellCommand>

                <h4 class="py-6 text-center text-xl">Run Server .NET Project (New Terminal)</h4>
                <ShellCommand class="mb-2">cd {{apiPath()}}</ShellCommand>
                <ShellCommand class="mb-2">dotnet watch</ShellCommand>

                <div class="mt-8">

                  <h3 class="mt-4 text-lg font-bold">Use npm dev server for UI development</h3>
                  <div class="text-center"><a href="http://localhost:3000">http://localhost:3000</a></div>

                  <h3 class="mt-4 text-lg font-bold">Preview `build:local` output in .NET App</h3>
                  <div class="text-center"><a href="https://localhost:5001">https://localhost:5001</a></div>
                </div>
                
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ShellCommand from "@/components/ShellCommand.vue"
import HelloApi from "@/components/HelloApi.vue"
import { ref } from "vue"

const inputValue = ref('Vue.js')
const project = ref('ProjectName')
const resolvePath = (path:string) => navigator.userAgent.indexOf("Win") >= 0 ? path.replace(/\//g,'\\') : path
const uiPath = () => resolvePath(`ui`)
const apiPath = () => resolvePath(`api/${project.value}`)
</script>