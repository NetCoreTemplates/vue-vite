<template>
  <AppPage title="Bookings DataGrid" class="sm:max-w-fit">
    <AutoCreateForm v-if="create" type="CreateBooking" @done="done" @save="done"/>
    <AutoEditForm v-else-if="edit" type="UpdateBooking" :deleteType="canDelete ? 'DeleteBooking' : null" v-model="edit"
                  @done="done" @save="done" @delete="done"/>
    <OutlineButton @click="() => reset({ create:true })">
      <svg class="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
      </svg>
      New Booking
    </OutlineButton>
    <DataGrid :items="bookings" :visible-from="{ name:'xl', bookingStartDate:'sm', bookingEndDate:'xl' }"
              @row-selected="editId = editId == $event.id ? null : $event.id" :is-selected="(row:Booking) => editId == row.id">
      <template #id="{ id }">
        <span class="text-gray-900">{{ id }}</span>
      </template>
      <template #name="{ name }">
        {{ name }}
      </template>
      <template #roomNumber-header>
        <span class="hidden lg:inline">Room </span>No
      </template>
      <template #cost="{ cost }">
        <span v-html="currency(cost)"></span>
      </template>

      <template #bookingStartDate-header>
        Start<span class="hidden lg:inline"> Date</span>
      </template>
      <template #bookingEndDate-header>
        End<span class="hidden lg:inline"> Date</span>
      </template>
      <template #createdBy-header>
        Employee
      </template>
      <template #createdBy="{ createdBy }">{{ createdBy }}</template>
    </DataGrid>
    <div class="mt-5 flex justify-between items-center">
      <div>
        <LogosVue class="w-5 h-5 inline" />
        <SrcLink href="https://github.com/NetCoreTemplates/vue-vite/blob/main/ui/src/pages/BookingsData.vue"/>
      </div>
      <div class="flex justify-between">
        <div>
          <MdiChevronLeft class="text-gray-400 w-6 h-6 inline" aria-hidden="true"/>
          <RouterLink class="text-gray-400 hover:text-gray-600" to="/bookings">Bookings AutoQueryGrid</RouterLink>
        </div>
        <div class="mx-4 text-gray-400">|</div>
        <div>
          <RouterLink class="text-gray-400 hover:text-gray-600" to="/bookings-crud">Custom Bookings</RouterLink>
          <MdiChevronRight class="text-gray-400 w-6 h-6 inline" aria-hidden="true"/>
        </div>
      </div>
    </div>
    <div class="mt-12">
      <h2 class="mb-5 sm:text-3xl text-gray-700">
        <a class="text-green-600 hover:text-green-800" href="https://docs.servicestack.net/vue/">Vue Component Library</a>
      </h2>
      <iframe class="youtube" src="https://www.youtube.com/embed/YIa0w6whe2U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useClient, useAuth, useFormatters } from "@servicestack/vue"
import { Booking, QueryBookings } from "@/dtos"

const create = ref(false)
const editId = ref()
const edit = ref()
const bookings = ref<Booking[]>([])

const client = useClient()
const { currency } = useFormatters()
const { hasRole } = useAuth()
const canDelete = computed(() => hasRole('Manager'))

async function refresh() {
  const api = await client.api(new QueryBookings())
  if (api.succeeded) {
    bookings.value = api.response!.results || []
  }
}

function reset(args:{ create?: boolean, editId?:number }={}) {
  create.value = args.create ?? false
  editId.value = args.editId ?? undefined
}

function done() {
  refresh()
  reset()
}

watch(editId, async () => {
  if (editId.value) {
    const api = await client.api(new QueryBookings({ id: editId.value }))
    if (api.succeeded) {
      edit.value = api.response!.results![0]
      return
    }
  }
  edit.value = null
})

onMounted(refresh)
</script>
