<template>
  <div class="lang relative bg-gray-700 text-gray-300 pl-5 py-3 sm:rounded flex">
    <div class="flex ml-2 w-full justify-between cursor-pointer" @click="copy">
      <label class="">
        <slot></slot>
      </label>
      <small class="text-xs text-gray-400 px-3 -mt-1">sh</small>
    </div>
    <div v-if="successText" class="-mr-24 right-0 absolute text-md text-gray-200 bg-green-700 px-1 rounded">
      <div class="flex pr-1">
        <MdiCheck class="w-5 h-5 mt-0.5"/>
        {{ successText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

let successText = ref('')

function copy(e: MouseEvent) {
  let $el = document.createElement("input")
  let $lbl = (e.target as HTMLElement).parentElement!.querySelector('label')!

  $el.setAttribute("value", $lbl.innerText)
  document.body.appendChild($el)
  $el.select()
  document.execCommand("copy")
  document.body.removeChild($el)

  if (typeof window.getSelection == "function") {
    const range = document.createRange()
    range.selectNodeContents($lbl)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
  }

  successText.value = 'copied'
  setTimeout(() => successText.value = '', 3000)
}
</script>

<style scoped>
.lang::before {
  content: "$ "
}
</style>