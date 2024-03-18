<script>
import Pagination_master from "@/components/pagination/pagination_master.vue";
import CategoryModal from "@/components/modal/CategoryModal.vue";
import {mapGetters} from "vuex";
import UpdateCategoryModal from "@/components/modal/UpdateCategoryModal.vue";
import DeleteCategory from "@/components/modal/DeleteCategory.vue";

export default {
  name: "Product",
  components: {DeleteCategory, UpdateCategoryModal, CategoryModal, Pagination_master},
  data() {
    return {
      isCategoryModalOpen: false,
      isUpdateCategoryModalOpen: false,
      dataDetail: null,
      isDeleteCategoryModalOpen: false
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapGetters({
      categoryList: "category/getListCategory"
    })
  },
  methods: {
    async init() {
      await this.$store.dispatch("category/fetchListCategory")
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
    openUpdateCategoryModal(item) {
      this.isUpdateCategoryModalOpen = true
      this.dataDetail = item
    },
    closeUpdateCategoryModal() {
      this.isUpdateCategoryModalOpen = false
    },
    openDeleteCategoryModal(item) {
      this.isDeleteCategoryModalOpen = true
      this.dataDetail = item
    },
    closeDeleteCategoryModal() {
      this.isDeleteCategoryModalOpen = false
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
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-10">No.</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-10">ID</th>
          <th class="whitespace-nowrap border border-slate-300 rounded">Name</th>
          <th class="whitespace-nowrap border border-slate-300 text-center rounded w-24">Action</th>
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
                class="tooltip block flex justify-left font-medium whitespace-nowrap" :key="item.category_name"
                tag="div"
                :content="item.category_name"
                :options="{
                  theme: 'light',
                }">
              <span class="truncate">{{ item.category_name }}</span>
            </Tippy>
          </td>
          <td>
            <div class="text-center flex">
              <span class="flex items-center mr-3 text-primary" @click="openUpdateCategoryModal(item)">
                <EditIcon class="w-4 h-4 mr-1" />
              </span>
              <span class="flex items-center mr-3 text-primary" @click="openDeleteCategoryModal(item)">
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
  <UpdateCategoryModal :is-open="isUpdateCategoryModalOpen" :on-close="closeUpdateCategoryModal" :data="dataDetail"/>
  <DeleteCategory :is-open="isDeleteCategoryModalOpen" :on-close="closeDeleteCategoryModal" :data="dataDetail"/>
</template>

<style scoped>
.scroll-list {
  height: 75vh;
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