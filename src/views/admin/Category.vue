<script>
import Pagination_master from "@/components/pagination/pagination_master.vue";
import CategoryModal from "@/components/modal/CategoryModal.vue";
import CategoryApi from "@/api/CategoryApi";

export default {
  name: "Product",
  components: {CategoryModal, Pagination_master},
  data() {
    return {
      categoryList: [],
      isCategoryModalOpen: false,
    }
  },
  watch: {
    perPage: function () {
      this.dataPage = this.paginate(
          this.categoryList,
          this.perPage,
          this.currentPage
      );
    },
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
      const res = await CategoryApi.getAllCategory(params)
      this.categoryList = res.data.data
    },
    wrapText(text) {
      if (text?.length > 32) {
        return text?.slice(0, 32) + "\n" + text?.slice(32);
      }
      return text;
    },
    openCategoryModal() {
      this.isCategoryModalOpen = true
    },
    closeCategoryModal() {
      this.isCategoryModalOpen = false
    },
    onPageChange(page) {
      this.currentPage = page - 1;
      this.list(page - 1);
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
    <button class="btn btn-primary flex gap-1 items-center" @click="openCategoryModal">
      <PlusIcon class="font-bold"/>
      <span class="text-md font-bold">Create</span>
    </button>
  </div>
  <div class="h-[72vh]" v-if="categoryList?.length > 0">
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
          <th class="whitespace-nowrap border border-slate-300 text-center request-id rounded">Action</th>
        </tr>
        </thead>
        <tbody class="font-medium">
        <tr class="cursor-pointer" v-for="(item, index) in categoryList">
          <td class="text-center" >{{ index + 1 }}</td>
          <td>
            <div class="">{{item.id}}</div>
          </td>
          <td>
            <Tippy
                class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :key="item.category_name"
                tag="div"
                :content="item.category_name"
                :options="{
                  theme: 'light',
                }">
              <span class="truncate">{{ item.category_name }}</span>
            </Tippy>
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
    </div>
  <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-else>
    <LoadingIcon icon="three-dots" class="w-20 h-20"/>
  </div>
  <CategoryModal :is-open="isCategoryModalOpen" :on-close="closeCategoryModal"/>
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