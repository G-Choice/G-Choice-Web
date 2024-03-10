<script>
import ProductApi from "@/api/ProductApi";
import ProductModal from "@/components/modal/ProductModal.vue";
import Pagination_master from "@/components/pagination/pagination_master.vue";

export default {
  name: "Product",
  components: {Pagination_master, ProductModal},
  data() {
    return {
      productList: [],
      isProductModalOpen: false,
      perPage: 8,
      dataPage: {},
      totalPages: 0,
      currentPage: 1,
      stt: 0,
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
        take: this.perPage
      }
      const res = await ProductApi.getAllProduct(params)
      this.productList = res.data.data
      const size = res.data?.meta?.take;
      this.stt = size * (this.currentPage -1) + 1;
      this.totalPages = res.data?.meta?.pageCount;
      this.dataPage = this.paginate(this.productList, this.perPage, 1);
    },
    wrapText(text) {
      if (text?.length > 32) {
        return text?.slice(0, 32) + "\n" + text?.slice(32);
      }
      return text;
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
  <div class="h-[80vh]">
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
            <div class="">{{item.category_id}}</div>
          </td>
          <td>
            <Tippy
                   class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :key="item.product_name"
                   tag="div"
                   :content="item.product_name"
                   :options="{
                  theme: 'light',
                }">
              <span class="truncate">{{ item.product_name }}</span>
            </Tippy>
          </td>
          <td>
            <div class="text-center">
              <img :src="item.images[0]" class="w-16 h-10 object-cover rounded-md" />
            </div>
          </td>
          <td>
            <div class="">{{item.price}}</div>
          </td>
          <td>
            <div class="text-center">{{ item.brand }}</div>
          </td>

          <td>
            <div class="text-center">{{ item.quantity_inventory }}</div>
          </td>
          <td>
            <div class="text-center">{{ item.quantity_sold }}</div>
          </td>
          <td>
            <Tippy
                class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :key="item.description"
                tag="div"
                :content="item.description"
                :options="{
                  theme: 'light',
                }">
              <span class="truncate">{{ item.description }}</span>
            </Tippy>
          </td>
          <td>
            <div class="text-center">{{ item.status }}</div>
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
</template>

<style scoped>
.scroll-list {
  height: 75vh;
  overflow-y: scroll;
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