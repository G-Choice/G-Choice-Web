<script>
export default {
  name: "DetailPackage"
}
</script>

<template>
  <div class="">
    <div class="bg-white mx-4 py-4 rounded-md grid grid-cols-4 font-medium sticky top-4">
      <p class="col-span-1">Mã vận đơn: #0111348</p>
      <p class="col-span-1">Đơn hàng: Nguyễn Thị Vĩnh Uyên</p>
      <p class="col-span-1">Trạng thái: Đang đợi nhận hàng</p>
      <p class="col-span-1">Ngày tới kho: 12/12/1212</p>
    </div>
    <div class="h-[55vh] overflow-y-scroll scroll-view">
      <table class="table table-3">
        <thead>
        <tr>
          <th>Uyen</th>
          <th>Uyen xinh</th>
          <th>Uyen xinh dẹp</th>
          <th>UYen xinh đẹp tuyệt vời</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in 20">
          <td>Uyen uyen</td>
          <td>uyen</td>
          <td>uyen</td>
          <td>uyen</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>