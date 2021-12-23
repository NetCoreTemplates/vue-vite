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

    <div class="mt-5 flex">
      <a href="#" @click.prevent="toggleAbout"
         class="mr-3 flex text-gray-400 hover:text-gray-400 text-decoration-none">
        <MdiChevronRight v-if="!expandAbout" class="h-6 w-6" aria-hidden="true"/>
        <MdiChevronDown v-else class="h-6 w-6" aria-hidden="true"/>
        About</a>
      <SrcLink href="https://github.com/NetCoreTemplates/vue-ssg/blob/main/api/MyApp.ServiceModel/Bookings.cs">
        <MdiCodeTags class="w-5 h-5 inline" />
      </SrcLink>
      <SrcLink href="https://github.com/NetCoreTemplates/vue-ssg/blob/main/ui/src/pages/bookings-crud/Index.vue">
        <LogosVue class="w-5 h-5 inline" />
      </SrcLink>
    </div>
    <div v-if="expandAbout" class="mt-3 text-gray-500 max-w-screen-md">
      <h2 class="font-medium text-2xl mb-2">Creating a multi-user .NET Core Booking system in minutes</h2>

      <blockquote class="mb-4">
        The Bookings service implementation is built using
        <a href="https://docs.servicestack.net/autoquery-crud">AutoQuery CRUD</a>
        which enables rapid development of typed CRUD Services using only declarative POCO DTOs, allowing for
        developing entire
        <a href="https://docs.servicestack.net/autoquery-crud#advanced-crud-example">audited</a>
        and <a href="https://docs.servicestack.net/autoquery-audit-log">verifiably logged</a>
        data-driven systems in a fraction of time
        <a href="https://docs.servicestack.net/autoquery-crud-bookings">more...</a>
      </blockquote>

      <iframe class="youtube" src="https://www.youtube.com/embed/nhc4MZufkcM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>

  </AppPage>
</template>

<script setup lang="ts">
import Create from "@/pages/bookings-crud/Create.vue"
import Edit from "@/pages/bookings-crud/Edit.vue"
import OutlineButton from "@/components/form/OutlineButton.vue"
import AppPage from "@/components/AppPage.vue"
import SrcLink from "@/components/SrcLink.vue"

import { ref } from "vue"
import { formatDate, formatCurrency } from "@/utils"
import { Booking, QueryBookings } from "@/dtos"
import { client } from "@/api"

const newBooking = ref<boolean>(false)
const editBookingId = ref<number|undefined>()

const expandAbout = ref<boolean>(false)

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

const toggleAbout = () => expandAbout.value = !expandAbout.value

</script>
