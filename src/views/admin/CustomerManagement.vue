<script>
import DetailPackage from "@/components/part/DetailPackage.vue";
import {mapGetters} from "vuex";
import {StationStatus} from "@/common/StationStatusEnum";

export default {
  name: "Customer Management",
  components: {DetailPackage},
  computed: {
    StationStatus() {
      return StationStatus
    },
    ...mapGetters({
      orderStationResponse: 'station/getListOrderStationInfo',
      orderStationList: 'station/getDataDisplay'
    })
  },
  data() {
    return {
      perPage: 6,
      dataPage: {},
      totalPages: 0,
      currentPage: 1,
      selectedProcess: "",
      dataDetail: {},
      id: null,
      selectedStatus: "waiting_delivery",
      idSearch: ""
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init(pageNumber = 1) {
      this.currentPage = Math.max(pageNumber);
      const params = {
        page: this.currentPage,
        take: this.perPage,
        status_group: this.selectedStatus,
        shipping_code: this.idSearch
      }
      this.$store.dispatch("station/setParams", params)
      await this.$store.dispatch("station/fetchListOrderStation")
      this.$store.dispatch("station/setDataDisplay", this.orderStationResponse.data)
      const size = this.orderStationResponse.meta?.take
      this.stt = size * (this.currentPage - 1) + 1
      this.totalPages = this.orderStationResponse.meta?.pageCount
      this.dataPage = this.paginate(this.orderStationList, this.perPage, 1)
    },
    showDetail(item) {
      this.dataDetail = item
      this.id = item.id
    },
    handleSearch() {
      this.init()
      this.id = null
    },
    onPageChange(page) {
      this.currentPage = page;
      this.init(page)
    },
    paginate(array, page_size, page_number) {
      return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
      )
    }
  }
}
</script>

<template>
  <div class="h-[70vh]">
    <div class="grid grid-cols-5 mx-2">
      <div class="col-span-2 pr-4 border-r-2">
        <div class="flex justify-between">
          <div class="flex my-2">
            <label class="flex items-center font-medium">Status:</label>
            <select v-model="selectedStatus" id="tabulator-html-filter-field" class="form-select ml-3 w-44">
              <option v-for="(status, index) in StationStatus" :key="index" :value="index">{{ status }}</option>
            </select>
          </div>
          <div class="flex my-2 gap-3 mx-2">
            <label class="flex items-center font-medium">ID:</label>
            <input type="text" placeholder="Search by ID.." v-model="idSearch" class="form-control gap-2">
            <button class="btn btn-primary" @click="handleSearch">Search</button>
          </div>
        </div>
        <div v-if="orderStationList?.length <= 0"
             class="text-primary flex flex-col items-center justify-center p-6 font-medium text-2xl h-[500px]">
          <img class="w-20 h-20" src="/src/assets/images/box.png" alt="">
          <span>No order!</span>
        </div>
        <div v-else class="h-[60vh] overflow-y-scroll scroll-view">
          <div class="grid grid-cols-4 bg-black text-white h-10 items-center font-bold pl-3 rounded-md sticky top-0">
            <p class="col-span-1">B/L No.</p>
            <p class="col-span-2">Name</p>
            <p class="col-span-1">Status</p>
          </div>
          <section
              v-for="(item, index) in orderStationList">
            <div class="grid grid-cols-4 my-2 p-3 rounded-md cursor-pointer box-shadow font-bold"
                 @click="showDetail(item)" :class="{ 'bg-blue-100': id === item.id, 'bg-white': id !== item.id }">
              <p class="col-span-1">{{ item?.shipping_code }}</p>
              <p class="col-span-2">{{ item?.group_name }}</p>
              <p class="col-span-1" :class="{'text-red-500': item?.status === 'waiting_delivery', 'text-yellow-500': item?.status === 'fetching_items', 'text-green-700': item?.status === 'completed'}">{{ StationStatus[item?.status] }}</p>
            </div>
          </section>
        </div>
      </div>
      <div class="col-span-3">
        <DetailPackage v-if="id" class="intro-x" :data="dataDetail"/>
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