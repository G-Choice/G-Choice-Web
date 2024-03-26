<script>
import Chart from "@/global-components/chart/Main.vue";
import StatisticalApi from "@/api/StatisticalApi";

export default {
  name: "Dashboard",
  components: {Chart},
  data() {
    return {
      getTotalRevenue: null,
      getTotalRevenueOfMonth: null,
      getTotalOrder: null,
      getTotalOrderOfMonth: null,
      data: {
        labels: [],
        datasets: [{
          label: 'Month Revenue',
          data: [],
          backgroundColor: [
            'rgb(22, 101, 52)'
          ],
          hoverOffset: 4
        }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    formattedPrice(props) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(props);
    },
    async init() {
      const getTotalRevenue = await StatisticalApi.getTotalRevenue()
      const getTotalRevenueOfMonth = await StatisticalApi.getTotalRevenueOfMonth()
      const getTotalOrder = await StatisticalApi.getTotalOrder()
      const getTotalOrderOfMonth = await StatisticalApi.getTotalOrderOfMonth()
      this.getTotalRevenue = getTotalRevenue?.data?.totalPrice
      this.getTotalRevenueOfMonth = getTotalRevenueOfMonth?.data?.totalRevenue
      this.getTotalOrder = getTotalOrder?.data?.data
      this.getTotalOrderOfMonth = getTotalOrderOfMonth?.data?.totalOrders
      await this.dataForChart()
    },
    async dataForChart() {
      const revenueOfYear = await StatisticalApi.getRevenueOfYear()
      for (let i = 0; i < 12; i++) {
        this.data.labels[i] = revenueOfYear?.data[i]?.month
        this.data.datasets[0].data[i] = revenueOfYear?.data[i]?.revenue
      }
      console.log(this.data.labels)
    }
  }
}
</script>

<template>
  <div class="h-[75vh] grid grid-cols-3 bg-white p-0">
    <div class="col-span-1 items-center flex flex-col mt-12">
      <div class="w-2/3 border-2 border-b-blue-800 mb-2 p-2 text-center">
        <p class="uppercase font-medium">Total Revenue</p>
        <p class="font-bold text-green-700 text-lg">{{ formattedPrice(getTotalRevenue) }}</p>
      </div>
      <div class="w-2/3 border-2 border-b-blue-800 mb-2 p-2 text-center">
        <p class="uppercase font-medium">current month's revenue</p>
        <p class="font-bold text-green-700 text-lg">{{ formattedPrice(getTotalRevenueOfMonth) }}</p>
      </div>
      <div class="w-2/3 border-2 border-b-blue-800 mb-2 p-2 text-center">
        <p class="uppercase font-medium">total order</p>
        <p class="font-bold text-green-700 text-lg">{{ getTotalOrder ? getTotalOrder : 0 }}</p>
      </div>
      <div class="w-2/3 border-2 border-b-blue-800 mb-2 p-2 text-center">
        <p class="uppercase font-medium">current month's order</p>
        <p class="font-bold text-green-700 text-lg">{{ getTotalOrderOfMonth ? getTotalOrderOfMonth : 0 }}</p>
      </div>
    </div>
    <div class="col-span-2">
      <Chart :data="data" type="bar"/>
    </div>
  </div>
</template>

<style scoped>

</style>