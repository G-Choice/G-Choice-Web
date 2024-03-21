<script>
import {StationStatus} from "@/common/StationStatusEnum";
import {isEmpty} from "lodash";
import TrackOrderApi from "@/api/TrackOrderApi";

export default {
  name: "DetailPackage",
  methods: {
    isEmpty,
    async confirmReceivingOrder(id) {
      const res = await TrackOrderApi.confirmReceivingOrder(id)
      await this.$store.dispatch('station/fetchListOrderStation')
    }
  },
  computed: {
    StationStatus() {
      return StationStatus
    }
  },
  props: ['data'],
  data() {
  },
  mounted() {
    console.log(this.data)
  }
}
</script>

<template>
  <div class="bg-white p-4 rounded-md grid grid-cols-3 font-medium sticky top-4">
    <p class="col-span-1">B/L No.: {{ data?.shipping_code }}</p>
    <p class="col-span-1">Order: {{ data?.group_name }}</p>
    <p class="col-span-1">Status: <span :class="{'text-red-500': data?.status === 'waiting_delivery', 'text-yellow-500': data?.status === 'fetching_items', 'text-green-700': data?.status === 'completed'}">{{ StationStatus[data?.status] }}</span></p>
  </div>
  <div class="h-[60vh] overflow-y-scroll scroll-view mt-6 p-0">
    <table class="table">
      <thead>
      <tr class="bg-gray-600 text-white">
        <th class="text-center w-24">#ID</th>
        <th class="text-center">Role</th>
        <th class="text-center">Amount</th>
        <th class="text-center">Total price</th>
        <th class="w-40">Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data?.user_groups">
        <td class="text-center">{{ item?.id }}</td>
        <td class="text-center">{{ item?.role }}</td>
        <td class="text-center">{{ item?.quantity }}</td>
        <td class="text-center">{{ item?.price }}</td>
        <td class="flex gap-2">
          <input @click="confirmReceivingOrder(item?.id)" type="checkbox" v-model="item.isFetching_items"
                 :disabled="item.isFetching_items" :class="{'cursor-pointer': !item.isFetching_items}"/>
          <span
              :class="{'text-red-600': !item?.isFetching_items, 'text-green-600': item?.isFetching_items}">{{
              item.isFetching_items ? "Received" : "Waiting"
            }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>