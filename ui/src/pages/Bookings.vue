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
