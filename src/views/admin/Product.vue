<script>
import ProductApi from "@/api/ProductApi";
import ProductModal from "@/components/modal/ProductModal.vue";
import Pagination_master from "@/components/pagination/pagination_master.vue";
import {mapGetters} from "vuex";

export default {
  name: "Product",
  components: {Pagination_master, ProductModal},
  data() {
    return {
      // productList: [],
      isProductModalOpen: false,
      perPage: 6,
      dataPage: {},
      totalPages: 0,
      currentPage: 1,
      stt: 0,
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapGetters({
      productList: "product/getDataDisplay",
      productResponse: "product/getListProductInfo"
    })
  },
  methods: {
    async init(pageNumber = 1) {
      this.currentPage = Math.max(pageNumber);
      const params = {
        page: this.currentPage,
        take: this.perPage
      }
      this.$store.dispatch("product/setParams", params)
      await this.$store.dispatch("product/fetchListProduct")
      this.$store.dispatch("product/setDataDisplay", this.productResponse.data)
      // const res = await ProductApi.getAllProduct(params)
      const size = this.productResponse.meta?.take;
      this.stt = size * (this.currentPage -1) + 1;
      this.totalPages = this.productResponse.meta?.pageCount;
      console.log(this.productList)
      this.dataPage = this.paginate(this.productList, this.perPage, 1);
    },
    openProductModal() {
      this.isProductModalOpen = true
    },
    closeProductModal() {
      this.isProductModalOpen = false
    },
    onPageChange(page) {
      this.currentPage = page;
      this.init(page)
    },
    paginate(array, page_size, page_number) {
      return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
      );
    },
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    }
  }
}
</script>

<template>
  <div class="flex justify-end my-2">
    <button class="btn btn-primary flex gap-1 items-center" @click="openProductModal">
      <PlusIcon class="font-bold"/>
      <span class="text-md font-bold">Create</span>
    </button>
  </div>
  <div class="h-[75vh]" v-if="productList.length > 0">
    <div class="scroll-list scroll-view">
      <table class="table table-report">
        <thead class="text-white sticky top-0 z-20">
        <tr class="bg-black">
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">STT</th>
          <th class="whitespace-nowrap border border-slate-300 request_userName rounded"
              @click="">
            Category
<!--            <span class="fa fa-caret-up ml-3"></span>-->
            <span class="fa fa-caret-down ml-3"></span>
          </th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Name</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Images</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Price</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Brand</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Stock</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Sold</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Description</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Status</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Action</th>
        </tr>
        </thead>
        <tbody class="font-medium">
        <tr class="cursor-pointer" v-for="(item, index) in productList">
          <td class="text-center" >{{ stt + index }}</td>
          <td>
            <div class="">{{item.category_name}}</div>
          </td>
          <td>
            <Tippy
                   class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :key="item.product_product_name"
                   tag="div"
                   :content="item.product_product_name"
                   :options="{
                  theme: 'light',
                }">
              <span class="truncate">{{ item.product_product_name }}</span>
            </Tippy>
          </td>
          <td>
            <div class="text-center">
              <img :src="item?.product_images[0]" class="w-16 h-10 object-cover rounded-md" />
            </div>
          </td>
          <td>
            <div class="">{{item.product_price}}</div>
          </td>
          <td>
            <div class="text-center">{{ item.product_brand }}</div>
          </td>

          <td>
            <div class="text-center">{{ item.product_quantity_inventory }}</div>
          </td>
          <td>
            <div class="text-center">{{ item.product_quantity_sold }}</div>
          </td>
          <td>
            <Tippy
                class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :key="item.description"
                tag="div"
                :content="item.description"
                :options="{
                  theme: 'light',
                }">
              <span class="truncate">{{ item.product_description }}</span>
            </Tippy>
          </td>
          <td>
            <div class="text-center">{{ item.product_status }}</div>
          </td>
          <td>
            <div class="text-center flex ">
              <span class="flex items-center mr-3 text-primary">
                <EditIcon class="w-4 h-4 mr-1" />
              </span>
              <span class="flex items-center mr-3 text-primary"
                    @click="">
                <TrashIcon class="w-4 h-4 mr-1" />
              </span>
            </div>
          </td>
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
      <ProductModal :is-open="isProductModalOpen" :on-close="closeProductModal" />
    </div>
  </div>
  <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-else>
    <LoadingIcon icon="three-dots" class="w-20 h-20"/>
  </div>
</template>

<style scoped>
.scroll-list {
  height: 72vh;
  overflow-y: hidden;
}
</style>
<style>
.content {
  min-height: 75vh !important;
}
.main {
  overflow-y: hidden;
}
</style>