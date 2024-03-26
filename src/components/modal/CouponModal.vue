<script>

export default {
  name: "CouponModal",
  props: ['isOpen', 'onClose', 'dataProduct']
}
</script>

<template>
<Modal :show="isOpen" @hidden="onClose">
  <ModalBody>
    <h2 class="text-lg justify-center flex font-bold"> Coupon</h2>
    <button class="btn border-primary bg-white">Add new coupon</button>
  </ModalBody>
</Modal>
</template>

<style scoped>

</style>