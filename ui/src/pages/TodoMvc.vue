<template>
  <AppPage title="Todos Application" class="max-w-xl">

    <div class="mb-3">
      <TextInput :status="store.error" id="Text" v-model="store.newTodo" placeholder="What needs to be done?" label=""
                 @keyup.enter.stop="store.addTodo()" />
    </div>

    <div class="bg-white shadow overflow-hidden rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="todo in store.filteredTodos" :key="todo.id" class="px-6 py-4">
          <div class="relative flex items-start" @click="store.toggleTodo(todo.id)">
            <div class="flex items-center h-6">
              <MdiCheckCircle v-if="todo.isFinished" class="text-green-600" />
              <MdiCheckboxBlankCircleOutline v-else />
            </div>
            <div class="ml-3 flex-grow">
              <label :class="{'line-through':todo.isFinished}">{{ todo.text }}</label>
            </div>
            <div>
              <MdiTrashCanOutline v-if="todo.isFinished" class="cursor-pointer" @click="store.removeTodo(todo.id)" />
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-4 flex justify-between">
      <div class="text-gray-400 leading-8 mr-4">
        {{ store.unfinishedTodos.length }} <span class="hidden sm:inline">item(s)</span> left
      </div>

      <div class="inline-flex shadow-sm rounded-md">
        <FilterTab class="rounded-l-lg border" filter="all">
          All
        </FilterTab>
        <FilterTab class="border-t border-b" filter="unfinished">
          Active
        </FilterTab>
        <FilterTab class="rounded-r-md border" filter="finished">
          Completed
        </FilterTab>
      </div>

      <div class="leading-8 ml-4">
        <a href="#" :class="{ invisible: store.finishedTodos.length === 0 }" @click.prevent="store.removeFinishedTodos()">
          clear <span class="hidden sm:inline">completed</span>
        </a>
      </div>
    </div>

    <div class="mt-4 text-center text-gray-400 flex justify-center -ml-6">
      <SrcLink href="https://github.com/NetCoreTemplates/vue-vite/blob/main/ui/src/stores/todos.ts">
        <NotoPineapple class="w-5 h-5 inline-flex" />
      </SrcLink>
      <SrcLink href="https://github.com/NetCoreTemplates/vue-vite/blob/main/ui/src/pages/TodoMvc.vue">
        <LogosVue class="w-4 h-4 inline-flex" />
      </SrcLink>
    </div>

  </AppPage>
</template>

<script setup lang="ts">
import { h, SetupContext } from "vue"
import { Filter, useTodosStore } from "@/stores/todos"
import AppPage from "@/components/AppPage.vue"

const store = useTodosStore()
store.refreshTodos()

// Should be in its own FilterTab.Vue SFC, using Functional Component to keep in single file
const FilterTab = (props:{ filter:Filter }, context:SetupContext) => {
  return h('a', {
    href: '#',
    'class': `border-gray-200 text-sm font-medium px-4 py-2 hover:bg-gray-100 
      focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 
      dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white
      ${props.filter == store.filter ? 'text-blue-700 dark:bg-blue-600' : 'text-gray-900 hover:text-blue-700 dark:bg-gray-700'}`,
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      store.changeFilter(props.filter)
    }
  }, context.slots)
}
</script>