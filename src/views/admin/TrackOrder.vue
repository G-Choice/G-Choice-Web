<script>
import Pagination_master from "@/components/pagination/pagination_master.vue";

export default {
  name: "TrackOrder",
  components: {Pagination_master},
  data() {
    return {
      perPage: 6,
      dataPage: {},
      totalPages: 0,
      currentPage: 1,
    }
  }
}
</script>

<template>
  <div class="h-[75vh]">
    <div class="scroll-list scroll-view">
      <table class="table table-report">
        <thead class="text-white sticky top-0 z-20">
        <tr class="bg-black">
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-10">No.</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-32">Username</th>
          <th class="whitespace-nowrap border border-slate-300 rounded">Address</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-10">Amount</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-32">Into money</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-20">Status</th>
        </tr>
        </thead>
        <tbody class="font-medium">
        <tr class="cursor-pointer" v-for="(item) in 5">
          <td class="text-center">1</td>
          <td>Uyen Nguyen</td>
          <td>101B Le Huu Trac, Que Son, Quang Nam</td>
          <td>12</td>
          <td>23243</td>
          <td><button class="btn btn-warning text-white">Placed</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3">
      <Pagination_master
          :totalPages="totalPages"
          :perPage="perPage"
          :currentPage="currentPage"
          @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped>

</style>