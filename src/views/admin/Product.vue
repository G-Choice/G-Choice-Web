<script>
import ProductModal from "@/components/modal/ProductModal.vue";
import Pagination_master from "@/components/pagination/pagination_master.vue";
import {mapGetters} from "vuex";
import DeleteProductModal from "@/components/modal/DeleteProductModal.vue";
import UpdateProductModal from "@/components/modal/UpdateProductModal.vue";

export default {
  name: "Product",
  components: {UpdateProductModal, DeleteProductModal, Pagination_master, ProductModal},
  data() {
    return {
      isProductModalOpen: false,
      perPage: 6,
      dataPage: {},
      totalPages: 0,
      currentPage: 1,
      stt: 0,
      isUpdateProductModalOpen: false,
      isDeleteProductModalOpen: false,
      dataDetail: {}
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
      const size = this.productResponse.meta?.take;
      this.stt = size * (this.currentPage -1) + 1;
      this.totalPages = this.productResponse.meta?.pageCount;
      this.dataPage = this.paginate(this.productList, this.perPage, 1);
    },
    openProductModal() {
      this.isProductModalOpen = true
    },
    closeProductModal() {
      this.isProductModalOpen = false
    },
    openDeleteProductModal(item) {
      this.dataDetail = item
      this.isDeleteProductModalOpen = true
    },
    closeDeleteProductModal() {
      this.isDeleteProductModalOpen = false
    },
    openUpdateProductModal(item) {
      this.dataDetail = item
      this.isUpdateProductModalOpen = true
    },
    closeUpdateProductModal() {
      this.isUpdateProductModalOpen = false
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
    },
    formattedPrice(props) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(props);

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
  <div class="h-[72vh]" v-if="productList.length > 0">
    <div class="scroll-list scroll-view">
      <table class="table table-report">
        <thead class="text-white sticky top-0 z-20">
        <tr class="bg-black">
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">No.</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Category</th>
          <th class="whitespace-nowrap border border-slate-300 rounded">Name</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Images</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Price</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Brand</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Stock</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Sold</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Description</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Status</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded">Action</th>
        </tr>
        </thead>
        <tbody class="font-medium">
        <tr v-for="(item, index) in productList">
          <td class="text-center" >{{ stt + index }}</td>
          <td>
            <Tippy
                class="tooltip block flex justify-left font-medium w-20 whitespace-nowrap" :key="item.category_name"
                tag="div"
                :content="item.category_name"
                :options="{
                  theme: 'light',
                }"><span class="truncate">{{item?.category_name}}</span>
            </Tippy>
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
          <td class="text-center">
              <img :src="item?.product_images[0]" class="w-16 h-10 object-cover rounded-md" />
          </td>
          <td>{{formattedPrice(item?.product_price)}}</td>
          <td class="text-center">{{ item?.product_brand }}</td>
          <td class="text-center">{{ item?.product_quantity_inventory }}</td>
          <td class="text-center">{{ item?.product_quantity_sold }}</td>
          <td>
            <Tippy
                class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :key="item.product_description"
                tag="div"
                :content="item.product_description"
                :options="{
                  theme: 'light',
                }">
                <span class="truncate">{{ item.product_description }}</span>
            </Tippy>
          </td>
          <td class="text-center" :class="{'text-green-600': item.product_status === 'active', 'text-blue-600': item.product_status === 'maintaining'}">{{ item.product_status }}</td>
          <td>
            <div class="text-center flex ">
              <button class="flex items-center mr-3 text-primary" @click="openUpdateProductModal(item)">
                <EditIcon class="w-4 h-4 mr-1" />
              </button>
              <button class="flex items-center mr-3 text-primary" :class="{'hidden': item.product_status !== 'inactive'}" @click="openDeleteProductModal(item)">
                <TrashIcon class="w-4 h-4 mr-1" />
              </button>
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
    </div>
  </div>
  <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-else>
    <LoadingIcon icon="three-dots" class="w-20 h-20"/>
  </div>
  <ProductModal :is-open="isProductModalOpen" :on-close="closeProductModal" />
  <DeleteProductModal :is-open="isDeleteProductModalOpen" :on-close="closeDeleteProductModal" :data="dataDetail"/>
  <UpdateProductModal :is-open="isUpdateProductModalOpen" :on-close="closeUpdateProductModal" :data="dataDetail"/>
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
  overflow-y: hidden;
}
.main {
  overflow-y: hidden;
}
</style>