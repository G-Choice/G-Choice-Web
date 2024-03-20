<script>
import DetailPackage from "@/components/part/DetailPackage.vue";
export default {
  name: "Customer Management",
  components: {DetailPackage},
  data() {
    return {
    }
  }
}
</script>

<template>
<div class="h-[70vh]">
  <div class="grid grid-cols-4 mx-2">
    <div class="col-span-1 pr-4 border-r-2">
      <div class="flex my-2 gap-3 mx-2">
        <input type="text" class="form-control w-52 gap-2">
        <button class="btn btn-primary">Search</button>
      </div>
      <div class="h-[60vh] overflow-y-scroll scroll-view">
        <div class="grid grid-cols-2 bg-black text-white h-10 items-center font-bold pl-3 rounded-md sticky top-0">
          <p class="col-span-1">Mã vận đơn</p>
          <p class="col-span-1">Đơn hàng</p>
        </div>
        <div class="grid grid-cols-2 bg-white my-2 p-3 rounded-md cursor-pointer box-shadow font-bold"
             v-for="(item, index) in 10">
          <p class="col-span-1">#0111348</p>
          <p class="col-span-1">Uyen xinh dẹp</p>
        </div>
      </div>
    </div>
    <div class="col-span-3">
      <DetailPackage/>
    </div>
  </div>
</div>
</template>

<style scoped>
.box-shadow {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
<style>
.scroll-view::-webkit-scrollbar {
  border-radius: 1px;
  width: 5px;
  background-color: transparent;
}

.scroll-view::-webkit-scrollbar-thumb {
  border-radius: 5px;
  @apply bg-red-400
}
</style>