<template>
  <AppPage title="Bookings CRUD" class="max-w-fit">
    <Create v-if="newBooking" class="max-w-screen-sm" @done="onDone" />
    <Edit v-else-if="editBookingId" :id="editBookingId" class="max-w-screen-sm" @done="onDone" />
    <OutlineButton v-else @click="() => reset({newBooking:true})">
      New Booking
    </OutlineButton>
    <div v-if="bookings.length > 0" class="mt-4 flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr class="select-none">
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <FluentAddCircle24Regular class="w-6 h-6 cursor-pointer" title="New Booking" @click="() => reset({newBooking:true})" />
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </th>
                <th class="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span class="hidden sm:inline">Room </span>Type
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span class="hidden sm:inline">Room </span>No
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th class="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th class="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(booking, index) in bookings" :key="booking.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <MdiSquareEditOutline class="w-6 h-6 cursor-pointer" title="Edit Booking" @click="() => reset({editBookingId:booking.id})" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ booking.id }}
                </td>
                <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ booking.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ booking.roomType }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ booking.roomNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatCurrency(booking.cost) }}
                </td>
                <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(booking.bookingStartDate) }}
                </td>
                <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ booking.createdBy }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 flex justify-between items-center">
      <div class="flex">
        <SrcLink href="https://github.com/NetCoreTemplates/vue-vite/blob/main/api/MyApp.ServiceModel/Bookings.cs">
          <MdiCodeTags class="w-5 h-5 inline" />
        </SrcLink>
        <SrcLink href="https://github.com/NetCoreTemplates/vue-vite/blob/main/ui/src/pages/bookings-crud/Index.vue">
          <LogosVue class="w-5 h-5 inline" />
        </SrcLink>
      </div>
      <div class="flex justify-between">
        <div>
          <MdiChevronLeft class="text-gray-400 w-6 h-6 inline" aria-hidden="true"/>
          <RouterLink class="text-gray-400 hover:text-gray-600" to="/bookingsdata">Bookings DataGrid</RouterLink>
        </div>
        <div class="mx-4 text-gray-400">|</div>
        <div>
          <RouterLink class="text-gray-400 hover:text-gray-600" to="/bookings">Bookings AutoQueryGrid</RouterLink>
          <MdiChevronRight class="text-gray-400 w-6 h-6 inline" aria-hidden="true"/>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="mb-5 sm:text-3xl text-gray-700">
        <a class="text-green-600 hover:text-green-800" href="https://docs.servicestack.net/autoquery">Creating a multi-user .NET Core Booking system in minutes</a>
      </h2>
      <iframe class="youtube" src="https://www.youtube.com/embed/rSFiikDjGos" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>

  </AppPage>
</template>

<script setup lang="ts">
import Create from "@/pages/bookings-crud/Create.vue"
import Edit from "@/pages/bookings-crud/Edit.vue"
import AppPage from "@/components/AppPage.vue"
import SrcLink from "@/components/SrcLink.vue"

import { ref } from "vue"
import { formatDate, formatCurrency } from "@/utils"
import { Booking, QueryBookings } from "@/dtos"
import { client } from "@/api"

const newBooking = ref<boolean>(false)
const editBookingId = ref<number|undefined>()

const bookings = ref<Booking[]>([])

const refreshBookings = async () => {
  const api = await client.api(new QueryBookings())
  if (api.succeeded) {
    bookings.value = api.response!.results ?? []
  }
}

onMounted(async () => await refreshBookings())

const reset = (args:{ newBooking?: boolean, editBookingId?:number } = {}) => {
  newBooking.value = args.newBooking ?? false
  editBookingId.value = args.editBookingId ?? undefined
}

const onDone = () => {
  reset()
  refreshBookings()
}

</script>
