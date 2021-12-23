<template>
<form @submit.prevent="onSubmit">
  <div class="shadow overflow-hidden sm:rounded-md bg-white">
    <div class="relative px-4 py-5 bg-white sm:p-6">

      <CloseButton @close="close"/>
        
      <fieldset>
        <legend class="text-base font-medium text-gray-900 text-center mb-4">New Booking</legend>

        <ErrorSummary :except="visibleFields" class="mb-4" />
  
        <div class="grid grid-cols-6 gap-6">

          <div class="col-span-6 sm:col-span-3">
            <TextInput id="name" v-model="request.name" required placeholder="Name for this booking" />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <SelectInput id="roomType" v-model="request.roomType" :options="app.enumOptions('RoomType')" />
          </div>
  
          <div class="col-span-6 sm:col-span-3">
            <TextInput type="number" id="roomNumber" v-model="request.roomNumber" min="0" required />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <TextInput type="number" id="cost" v-model="request.cost" min="0" required />
          </div>
  
          <div class="col-span-6 sm:col-span-3">
            <TextInput type="date" id="bookingStartDate" v-model="request.bookingStartDate" required />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <TextInput type="date" id="bookingEndDate" v-model="request.bookingEndDate" />
          </div>
  
          <div class="col-span-6">
            <TextAreaInput id="notes" v-model="request.notes" placeholder="Notes about this booking" style="height:6rem" />
          </div>
        </div>
      </fieldset>
    </div>

    <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
      <div class="flex justify-between items-center">
        <SrcLink href="https://github.com/NetCoreTemplates/vue-vite/blob/main/ui/src/pages/bookings-crud/Create.vue">
          <LogosVue class="w-5 h-5 inline" />
        </SrcLink>
        <div><PrimaryButton>Create Booking</PrimaryButton></div>
      </div>
    </div>
    
  </div>
</form>
</template>

<script setup lang="ts">
import ErrorSummary from "@/components/form/ErrorSummary.vue"
import CloseButton from "@/components/form/CloseButton.vue"
import TextInput from "@/components/form/TextInput.vue"
import SelectInput from "@/components/form/SelectInput.vue"
import TextAreaInput from "@/components/form/TextAreaInput.vue"
import PrimaryButton from "@/components/form/PrimaryButton.vue"
import SrcLink from "@/components/SrcLink.vue"

import { CreateBooking, RoomType } from "@/dtos"
import { dateInputFormat } from "@/utils"
import { useClient, useApp } from "@/api"

const emit = defineEmits<{
  (e:'done'): () => void
}>()

const visibleFields = "name,roomType,roomNumber,bookingStartDate,bookingEndDate,cost,notes"

const app = useApp()
const client = useClient()

const request = new CreateBooking({
  roomType: RoomType.Single,
  roomNumber: 0,
  cost: 0,
  bookingStartDate: dateInputFormat(new Date())
})

const onSubmit = async (e: Event) => {
  const api = await client.api(request)
  if (api.succeeded) close()
}
const close = () => emit('done')
</script>
