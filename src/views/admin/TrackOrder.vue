<script>
export default {
  name: "TrackOrder"
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
        <tr class="cursor-pointer">
          <td class="text-center">No.</td>
          <td>Uyen</td>
          <td>uyen xinh</td>
          <td>July</td>
          <td>Uyen</td>
          <td>uyen xinh</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>