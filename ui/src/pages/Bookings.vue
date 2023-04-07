<template>
  <AppPage title="Bookings AutoQueryGrid" class="sm:max-w-fit">
    <AutoQueryGrid type="Booking"
                   selected-columns="id,name,roomType,roomNumber,bookingStartDate,bookingEndDate"
                   :visible-from="{ name:'xl', bookingStartDate:'sm', bookingEndDate:'xl' }" />
    <div class="mt-5 flex justify-between items-center">
      <div>
        <LogosVue class="w-5 h-5 inline" />
        <SrcLink href="https://github.com/NetCoreTemplates/vue-vite/blob/main/ui/src/pages/Bookings.vue"/>
      </div>
      <div class="flex justify-between">
        <div>
          <MdiChevronLeft class="text-gray-400 w-6 h-6 inline" aria-hidden="true"/>
          <RouterLink class="text-gray-400 hover:text-gray-600" to="/bookings-crud">Custom Bookings</RouterLink>
        </div>
        <div class="mx-4 text-gray-400">|</div>
        <div>
          <RouterLink class="text-gray-400 hover:text-gray-600" to="/bookingsdata">Bookings DataGrid</RouterLink>
          <MdiChevronRight class="text-gray-400 w-6 h-6 inline" aria-hidden="true"/>
        </div>
      </div>
    </div>
    <div class="mt-12">
      <h2 class="mb-5 sm:text-3xl text-gray-700">
        Vue <a class="text-green-600 hover:text-green-800" href="https://docs.servicestack.net/vue/gallery/autoquerygrid">AutoQueryGrid</a> Component
      </h2>
      <iframe class="youtube" src="https://www.youtube.com/embed/znCoC-Ct0Ps" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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
