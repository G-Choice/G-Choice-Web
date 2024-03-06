<script>
import {ModalBody} from "@/global-components/modal";

export default {
  name: "ProductModal",
  components: {ModalBody},
  props: ['isOpen', 'onClose', 'id'],
  data() {
    return {
      isProductModalOpen: false
    }
  },
  methods: {
    closeModal() {
      this.isProductModalOpen = false
    }
  }
}
</script>

<template>
<Modal :show="isProductModalOpen" size="verybigmodal modal-xl">
  <ModalHeader>
    Add product
  </ModalHeader>
  <ModalBody>
    Trưa nay ăn gì
  </ModalBody>
</Modal>
</template>

<style scoped>

</style>