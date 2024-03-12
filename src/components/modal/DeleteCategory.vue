<script>

import CategoryApi from "@/api/CategoryApi";
import Notification from "@/components/modal/Notification.vue";

export default {
  name: "DeleteCategory",
  components: {Notification},
  props: ['isOpen', 'onClose', 'data'],
  data() {
    return {
      isSuccess: null,
      isModalNotiOpen: false,
    }
  },
  methods: {
    closeModal() {
      this.onClose()
    },
    async deleteCategory() {
      try {
        const res = await CategoryApi.deleteCategory(this.data.id)
        this.openNotiModal("SUCCESS")
      } catch (e) {
        console.warn(e)
        this.openNotiModal("FAIL")
      } finally {
        this.closeModal()
        this.$store.dispatch("category/fetchListCategory")
      }
    },
    openNotiModal(status) {
      this.isModalNotiOpen = true
      this.isSuccess = status
    },
    closeNotiModal() {
      this.isModalNotiOpen = false
    },
  }
}
</script>

<template>
  <Modal :show="isOpen" size="modal-md" @hidden="closeModal">
    <div class="absolute top-2 right-2 cursor-pointer" @click="closeModal">
      <XCircleIcon class="text-black" />
    </div>
    <ModalBody>
      <div class="flex flex-col items-center justify-center">
        <img src="/src/assets/images/x-circle.png" class="w-20 h-20" alt="fail">
        <p class="font-bold text-lg mt-5">Are you sure to delete</p>
        <p>Do you really want to delete this product?</p>
        <p>This process can not be undone.</p>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="intro-x mx-auto text-center flex justify-center">
        <div class="btn btn-secondary w-24 mr-4 mb-2" @click="closeModal">Cancel</div>
        <button class="btn btn-primary w-24 mb-2" @click="deleteCategory">Oke</button>
      </div>
    </ModalFooter>
  </Modal>
  <Notification :is-open="isModalNotiOpen" :on-close="closeNotiModal" :status="isSuccess" />
</template>

<style scoped>

</style>