<script>
import Chart from "@/global-components/chart/Main.vue";

export default {
  name: "Dashboard",
  components: {Chart},
  computed: {
    data () {
      return {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    }
  }
}
</script>

<template>
  <Chart :data="data" type="bar" />
</template>

<style scoped>

</style>