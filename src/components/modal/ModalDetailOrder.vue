<script>

import dayjs from "dayjs";
import {Process} from "@/common/ProcessEnum";

export default {
  name: "ModalDetailOrder",
  computed: {
    Process() {
      return Process
    }
  },
  props: ['isOpen', 'onClose', 'data'],
  methods: {
    closeModal() {
      this.onClose()
    },
    formattedPrice(props) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(props);
    },
    dateFormatted(date) {
      return dayjs(date).format('DD-MM-YYYY')
    }
  }
}
</script>

<template>
<Modal :show="isOpen" size="modal-xl" @hidden="onClose">
  <ModalHeader class="text-lg justify-center flex font-bold">
    Order Detail
  </ModalHeader>
  <ModalBody>
    <div class="flex">
      <div class="w-1/2">
        <p class="font-bold">Product</p>
        <div class="flex gap-3 my-2 bg-white rounded-md">
          <img class="w-1/3 rounded-md" :src="data?.products?.images[0]"/>
          <div class="flex flex-col justify-between">
            <p class="font-medium">{{data?.products?.product_name}}</p>
            <p class="text-lg text-primary font-bold">{{formattedPrice(data?.products?.price)}}</p>
          </div>
        </div>
        <div class="bg-white rounded-md p-3">
          <p class="my-1">Delivery address: <span class="font-medium">{{data?.deliveryAddress}}</span></p>
          <p class="my-1">Delivery phone: <span class="font-medium">{{data?.phoneNumber}}</span></p>
          <p class="my-1">Status: <span class="font-medium">{{Process[data?.status]}}</span></p>
          <p class="my-1">Created: <span class="font-medium">{{dateFormatted(data?.create_At)}}</span></p>
        </div>
      </div>
      <div class="w-1/2">
        <p class="font-bold">Buyer</p>
        <div class="w-full mx-2 my-2 bg-white rounded-md p-3" v-for="(item, index) in data?.user_groups">
          <p>Role: <span class="font-medium">{{item.role}}</span></p>
          <p>Amount: <span class="font-medium">{{item.quantity}}</span></p>
          <p>Total price: <span class="font-medium">{{formattedPrice(item.price)}}</span></p>
        </div>
      </div>
    </div>
  </ModalBody>
  <ModalFooter class="intro-x mx-auto text-center flex justify-end px-0">
      <div class="btn btn-secondary w-24 mr-4 mb-2" @click="closeModal">Close</div>
  </ModalFooter>
</Modal>
</template>

<style scoped>

</style>