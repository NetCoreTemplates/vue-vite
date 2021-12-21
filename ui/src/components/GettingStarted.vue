<template>
  <section>
    <h2 class="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 whitespace-nowrap text-center pt-8">
      Getting Started
    </h2>
    <div class="mb-8 md:mb-16">
      <div class="sm:mx-0 sm:px-4 sm:py-8 flex justify-evenly">
        <div class="flex flex-col">

          <h4 class="py-6 text-center text-xl">Create New Project</h4>
          <input type="text" v-model="project" autocomplete="off" spellcheck="false" @keydown="validateSafeName"
                 class="mb-8 sm:text-lg rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:bg-gray-800"/>

          <ShellCommand class="mb-2">dotnet tool install -g x</ShellCommand>
          <ShellCommand class="mb-2">mkdir {{project}} &amp;&amp; cd {{project}}</ShellCommand>
          <ShellCommand class="mb-2">x new vue-ssg</ShellCommand>

          <h4 class="py-6 text-center text-xl">Build Client UI &amp; Run Dev Server</h4>
          <ShellCommand class="mb-2">cd {{uiPath()}} &amp;&amp; npm run build:local</ShellCommand>
          <ShellCommand class="mb-2">npm run dev</ShellCommand>

          <h4 class="py-6 text-center text-xl">Run Server .NET Project (New Terminal)</h4>
          <ShellCommand class="mb-2">cd {{apiPath()}}</ShellCommand>
          <ShellCommand class="mb-2">dotnet watch</ShellCommand>

          <div class="mt-8 text-center">

            <div class="flex justify-center">
              <router-link class="bg-purple-500 text-purple-50 rounded px-2 py-0.5 mx-1" to="/posts/rider">rider</router-link>
              <router-link class="bg-purple-500 text-purple-50 rounded px-2 py-0.5 mx-1" to="/posts/vs">visualstudio</router-link>
            </div>

            <h3 class="mt-4 sm:text-2xl">Use npm dev server for UI Development</h3>
            <div class="text-lg hover:text-green-600"><a href="http://localhost:3000">http://localhost:3000</a></div>

            <h3 class="mt-4 sm:text-2xl">`npm run build:local` to view in .NET App</h3>
            <div class="text-lg hover:text-green-600"><a href="https://localhost:5001">https://localhost:5001</a></div>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ShellCommand from "@/components/ShellCommand.vue"
import { ref } from "vue"

const project = ref('ProjectName')
const resolvePath = (path:string) => navigator.userAgent.indexOf("Win") >= 0 ? path.replace(/\//g,'\\') : path
const uiPath = () => resolvePath(`ui`)
const apiPath = () => resolvePath(`api/${project.value}`)
const validateSafeName = (e:KeyboardEvent) => {
  if (e.key.match(/[\W]+/g)) {
    e.preventDefault()
    return false
  }
}
</script>
