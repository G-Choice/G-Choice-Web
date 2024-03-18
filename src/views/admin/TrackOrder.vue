<script>
import Pagination_master from "@/components/pagination/pagination_master.vue";
import {Process} from "@/common/ProcessEnum";
import {mapGetters} from "vuex";
import ModalDetailOrder from "@/components/modal/ModalDetailOrder.vue";
import TrackOrderApi from "@/api/TrackOrderApi";

export default {
  name: "TrackOrder",
  components: {ModalDetailOrder, Pagination_master},
  computed: {
    Process() {
      return Process
    },
    ...mapGetters({
      orderResponse: 'order/getListOrderInfo',
      orderList: 'order/getDataDisplay'
    })
  },
  data() {
    return {
      perPage: 6,
      dataPage: {},
      totalPages: 0,
      currentPage: 1,
      selectedProcess: "waiting_confirmation_order",
      isModalDetailOpen: false,
      dataDetail: {}
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
        status_group: this.selectedProcess
      }
      this.$store.dispatch("order/setParams", params)
      await this.$store.dispatch('order/fetchListOrder')
      this.$store.dispatch("order/setDataDisplay", this.orderResponse.data)
      const size = this.orderResponse.meta?.take;
      this.stt = size * (this.currentPage -1) + 1;
      this.totalPages = this.orderResponse.meta?.pageCount;
      this.dataPage = this.paginate(this.orderList, this.perPage, 1);
    },
    onPageChange(page) {
      this.currentPage = page;
      this.init(page)
    },
    openModalDetail(item) {
      this.isModalDetailOpen = true
      this.dataDetail = item
      console.log(this.dataDetail)
    },
    closeModalDetail() {
      this.isModalDetailOpen = false
    },
    paginate(array, page_size, page_number) {
      return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
      );
    },
    async confirmOrder(id) {
      const res = await TrackOrderApi.confirmOrder(id)
      this.init()
    }
  },
  watch: {
    selectedProcess() {
      this.init()
    }
  }
}
</script>

<template>
  <div class="h-[75vh]">
    <div class="flex my-2">
      <label class="flex items-center font-medium mr-4"
      >Step:</label
      >
      <select
          v-model="selectedProcess"
          id="tabulator-html-filter-field"
          class="form-select ml-3 w-52"
      >
        <option
            v-for="(item, process) in Process"
            :key="process"
            :value="process"
        >
          {{ item }}
        </option>
      </select>
    </div>
    <div v-if="orderList?.length <= 0"
         class="text-primary flex flex-col items-center justify-center p-6 font-medium text-2xl h-[600px]">
      <img class="w-20 h-20 mb-4" src="/src/assets/images/box.png" alt="">
      <span>No order here!</span>
    </div>
    <div v-else class="scroll-list scroll-view">
      <table class="table table-report">
        <thead class="text-white sticky top-0 z-20">
        <tr class="bg-black">
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-10">No.</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-32">Group Name</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-44">Product Name</th>
          <th class="whitespace-nowrap border border-slate-300 rounded">Address</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-10">Amount</th>
<!--          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-32">Into money</th>-->
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-20"></th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-10"></th>
        </tr>
        </thead>
        <tbody class="font-medium">
        <tr class="cursor-pointer" v-for="(item, index) in orderList">
            <td class="text-center">{{ index + 1 }}</td>
          <td>{{ item?.group_name }}</td>
          <td>
            <Tippy
                class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :key="item?.products?.product_name"
                tag="div"
                :content="item?.products?.product_name"
                :options="{
                  theme: 'light',
                }">
              <span class="truncate">{{ item?.products?.product_name }}</span>
            </Tippy>
          </td>
          <td>{{ item?.deliveryAddress }}</td>
          <td>{{ item?.current_quantity }}</td>
<!--          <td>23243</td>-->
          <td>
            <button v-if="item.status === 'waiting_confirmation_order'" class="btn btn-danger text-white" @click="confirmOrder(item.id)">Confirm</button>
            <p v-else>{{Process[item.status]}}</p>
          </td>
          <td @click="openModalDetail(item)"><EyeIcon class="w-4 h-4 mr-1" /></td>
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
    <ModalDetailOrder :is-open="isModalDetailOpen" :on-close="closeModalDetail" :data="dataDetail"/>
</template>

<style scoped>

</style>