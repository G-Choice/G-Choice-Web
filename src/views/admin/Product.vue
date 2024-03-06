<script>
import ProductApi from "@/api/ProductApi";
import ProductModal from "@/components/modal/ProductModal.vue";

export default {
  name: "Product",
  components: {ProductModal},
  data() {
    return {
      productList: [],
      isProductModalOpen: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const params = {
        page: 1,
        take: 10
      }
      const res = await ProductApi.getAllProduct(params)
      console.log(res.data.data)
      this.productList = res.data.data
    },
    wrapText(text) {
      if (text?.length > 32) {
        return text?.slice(0, 32) + "\n" + text?.slice(32);
      }
      return text;
    },
    openProductModal() {
      this.isProductModalOpen = true
    }
  }
}
</script>

<template>
  <div class="h-[80vh]">
    <div class="scroll-list">
      <table class="table table-report">
        <thead class="text-white sticky top-0 z-20">
        <tr class="bg-black">
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">STT</th>
          <th class="whitespace-nowrap border border-slate-300 request_userName rounded"
              @click="sortTable('user_name')">
            Category
<!--            <span class="fa fa-caret-up ml-3"></span>-->
            <span class="fa fa-caret-down ml-3"></span>
          </th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Name</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Images</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Price</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Status</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Brand</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Sold</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Stock</th>
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Action</th>
        </tr>
        </thead>
        <tbody class="font-medium">
        <tr class="cursor-pointer" v-for="(item, index) in productList">
          <td class="text-center" >{{ index + 1 }}</td>
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
            <div class="text-center">{{ item.status }}</div>
          </td>
          <td>
            <div class="text-center">{{ item.brand }}</div>
          </td>
          <td>
            <Tippy
                class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :key="item.description"
                tag="div"
                :content="item.description"
                :options="{
                  theme: 'light',
                }">
              <span class="truncate">{{ item.product_name }}</span>
            </Tippy>
          </td>
          <td>
            <div class="text-center">{{ item.quantity_sold }}</div>
          </td>
          <td>
            <div class="text-center">{{ item.quantity_inventory }}</div>
          </td>
          <td>
            <div class="text-center flex ">
              <span class="flex items-center mr-3 text-primary"
                 @click="">
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
  </div>
  <ProductModal :is-open="" />
</template>

<style scoped>
.scroll-list {
  height: 75vh;
  overflow-y: scroll;
}
</style>
<style>
.content {
  min-height: 80vh !important;
}
.main {
  overflow-y: hidden;
}
</style>