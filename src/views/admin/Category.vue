<script>
export default {
  name: "Category",
  methods: {
    sortTable(column) {}
  }
}
</script>

<template>
  <div>
    <div class="scroll-list">
      <table class="table table-report">
        <thead class="text-white sticky top-0 z-20">
        <tr class="bg-black">
          <th class="whitespace-nowrap border border-slate-300 text-center request-id">STT</th>
          <th class="whitespace-nowrap border border-slate-300 request_userName"
              @click="sortTable('user_name')">
            Category
            <span
                class="fa fa-caret-up ml-3"
            ></span>
            <span class="fa fa-caret-down ml-3"></span>
          </th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id">Action</th>
        </tr>
        </thead>
        <tbody class="font-medium">
        <tr class="cursor-pointer">
          <td class="text-center" >1</td>
          <td>
            <div class="">Home nay chi co fashion</div>
          </td>
          <td>
            <div class="text-center">5454</div>
          </td>
        </tr>
        <tr class="cursor-pointer">
          <td class="text-center" >1</td>
          <td>
            <div class="">Home nay chi co fashion</div>
          </td>
          <td>
            <div class="text-center">5454</div>
          </td>
        </tr>
        <tr class="cursor-pointer">
          <td class="text-center" >1</td>
          <td>
            <div class="">Home nay chi co fashion</div>
          </td>
          <td>
            <div class="text-center">5454</div>
          </td>
        </tr><tr class="cursor-pointer">
          <td class="text-center" >1</td>
          <td>
            <div class="">Home nay chi co fashion</div>
          </td>
          <td>
            <div class="text-center">5454</div>
          </td>
        </tr>
        <tr class="cursor-pointer">
          <td class="text-center" >1</td>
          <td>
            <div class="">Home nay chi co fashion</div>
          </td>
          <td>
            <div class="text-center">5454</div>
          </td>
        </tr>


        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>

</style>