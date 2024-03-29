<template>
  <form @submit.prevent="onSubmit">
    <div class="shadow overflow-hidden sm:rounded-md bg-white">
      <div class="relative px-4 py-5 bg-white sm:p-6">

        <CloseButton @close="close"/>

        <fieldset>
          <legend class="text-base font-medium text-gray-900 text-center mb-4">Edit Booking</legend>

          <ErrorSummary :except="visibleFields" class="mb-4" />

          <div class="grid grid-cols-6 gap-6">

            <div class="col-span-6 sm:col-span-3">
              <TextInput id="name" v-model="request.name" required placeholder="Name for this booking" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <SelectInput id="roomType" v-model="request.roomType" :options="enumOptions('RoomType')" />
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
              <TextareaInput id="notes" v-model="request.notes" placeholder="Notes about this booking" style="height:6rem" />
            </div>
          </div>
        </fieldset>
      </div>

      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <div class="flex justify-between items-center">
          <div>
            <ConfirmDelete @delete="onDelete">Delete</ConfirmDelete>
          </div>
          <SrcLink href="https://github.com/NetCoreTemplates/vue-vite/blob/main/ui/src/pages/bookings-crud/Edit.vue">
            <LogosVue class="w-5 h-5 inline" />
          </SrcLink>
          <div><PrimaryButton>Update Booking</PrimaryButton></div>
        </div>
      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import SrcLink from "@/components/SrcLink.vue"

import { DeleteBooking, QueryBookings, UpdateBooking } from "@/dtos"
import { sanitizeForUi } from "@/utils"
import { useClient, useMetadata } from "@servicestack/vue"

const props = defineProps<{
  id: number
}>()

const emit = defineEmits<{
  (e:'done'): () => void
}>()

const visibleFields = "name,roomType,roomNumber,bookingStartDate,bookingEndDate,cost,notes"

const client = useClient()
const { enumOptions } = useMetadata()

const request = ref(new UpdateBooking())

watchEffect(async() => {
  const api = await client.api(new QueryBookings({ id: props.id }))
  if (api.succeeded) {
    request.value = new UpdateBooking(sanitizeForUi(api.response?.results![0]))
  }
})

const onSubmit = async (e: Event) => {
  const api = await client.api(request.value)
  if (api.succeeded) close()
}
const onDelete = async () => {
  const api = await client.apiVoid(new DeleteBooking({ id: props.id }))
  if (api.succeeded) close()
}

const close = () => emit('done')
</script>
