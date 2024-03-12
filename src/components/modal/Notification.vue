<script>
export default {
  name: "Notification",
  props: ['isOpen', 'onClose', 'status'],
  methods: {
    closeModal() {
      this.onClose()
    }
  }
}
</script>

<template>
  <Modal :show="isOpen" size="modal-md" @hidden="closeModal">
    <div class="absolute top-2 right-2 cursor-pointer" @click="closeModal">
      <XCircleIcon class="text-black" />
    </div>
    <ModalBody>
      <div v-if="status === 'SUCCESS'" class="flex flex-col items-center justify-center">
        <img src="/src/assets/images/successfull.png" class="w-52 object-cover" alt="success">
        <p class="font-bold text-lg mt-5">Successfully!</p>
      </div>
      <div v-else-if="status === 'FAIL'" class="flex flex-col items-center justify-center">
        <img src="/src/assets/images/x-circle.png" class="w-20 h-20" alt="fail">
        <p class="font-bold text-lg mt-5">Fail, something went wrong!</p>
      </div>
    </ModalBody>
  </Modal>
</template>

<style scoped>

</style>