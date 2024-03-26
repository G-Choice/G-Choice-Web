<script>

import CouponApi from "@/api/CouponApi";

export default {
  name: "CouponModal",
  props: ['isOpen', 'onClose', 'dataProduct'],
  data() {
    return {
      productCoupon: [],
      coupon: {
        minQuantity: null,
        discountPercent: null
      },
      isAddNew: false
    }
  },
  methods: {
    async init() {
      const res = await CouponApi.getAllCouponAtProduct(this.dataProduct?.product_id)
      this.productCoupon = res.data.data
    },
    handleAddNewCoupon() {
      this.coupon = {
        minQuantity: null,
        discountPercent: null
      }
      this.isAddNew = true
    },
    async submitAddNewCoupon() {
      const params = {
        minQuantity: this.coupon.minQuantity,
        discountPercentage: this.coupon.discountPercent,
        product_id: this.dataProduct?.product_id
      }
      const res = await CouponApi.addNewCoupon(JSON.stringify(params))
      this.isAddNew = false
      await this.init()
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.init()
      }
    }
  }
}
</script>

<template>
  <Modal :show="isOpen" @hidden="onClose">
    <ModalBody>
      <h2 class="text-lg justify-center flex font-bold mb-3">Coupon</h2>
      <div>
        <div class="grid grid-cols-4 mb-0.5 text-white">
          <p class="col-span-2 border border-red-400 p-2 rounded-md bg-primary font-medium text-center">Min quantity</p>
          <p class="col-span-2 border border-red-400 ml-0.5 p-2 rounded-md bg-primary font-medium text-center">Discount
            percent</p>
        </div>
        <div v-for="(item, index) in productCoupon" class="grid grid-cols-4 mb-0.5">
          <p class="col-span-2 border border-red-400 p-2 rounded-md bg-gray-100 font-medium text-center">
            {{ item?.minquantity }}</p>
          <p class="col-span-2 border border-red-400 ml-0.5 p-2 rounded-md bg-gray-100 font-medium text-center">
            {{ item?.discountpercentage }}%</p>
        </div>
        <div class="grid grid-cols-4 mb-0.5" v-if="isAddNew">
          <input type="number" min="1" class="col-span-2 form-control" v-model="coupon.minQuantity" placeholder="Enter quantity">
          <input type="number" min="1" max="99" class="col-span-2 ml-0.5 form-control" v-model="coupon.discountPercent" placeholder="Enter discount percent">
        </div>
      </div>
      <div class="flex justify-end" @click="handleAddNewCoupon" v-if="!isAddNew">
        <button class="btn border-primary bg-white p-1">
          <PlusIcon class="font-bold"/>
        </button>
      </div>
      <div class="flex justify-end" @click="submitAddNewCoupon" v-else>
        <button class="btn text-black border-primary bg-white">Add</button>
      </div>
    </ModalBody>
  </Modal>
</template>

<style scoped>

</style>