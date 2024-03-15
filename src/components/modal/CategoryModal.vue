<script>
import * as Yup from "yup";
import {Field, Form} from "vee-validate";
import CategoryApi from "@/api/CategoryApi";
import Notification from "@/components/modal/Notification.vue";

export default {
  name: "CategoryModal",
  components: {Notification, Field, Form},
  props: ['isOpen', 'onClose'],
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Category is required")
    })
    return {
      schema,
      dataCreate: {
        name: ""
      },
      isModalNotiOpen: false,
      isSuccess: null,
      isEnabled: false
    }
  },
  methods: {
    async addCategory() {
      const params = {
        category_name: this.dataCreate.name
      }
      try {
        this.isEnabled = true
        const res = await CategoryApi.addCategory(JSON.stringify(params))
        this.openNotiModal('SUCCESS')
        if (res.data.statusCode === 500) {
          this.openNotiModal('FAIL')
        }
      } catch (e) {
        console.warn(e)
      } finally {
        this.closeModal()
        this.isEnabled = false
        this.$store.dispatch("category/fetchListCategory")
      }
    },
    closeModal() {
      this.onClose()
      this.resetForm()
    },
    openNotiModal(status) {
      this.isModalNotiOpen = true
      this.isSuccess = status
    },
    closeNotiModal() {
      this.isModalNotiOpen = false
    },
    resetForm() {
      this.dataCreate.name = ""
    }
  }
}
</script>

<template>
  <Modal :show="isOpen" size="modal-lg" @hidden="closeModal">
    <ModalHeader class="text-lg justify-center flex font-bold">
      Add Category
    </ModalHeader>
    <ModalBody>
      <Form @submit="addCategory" :validation-schema="schema" v-slot="{errors}">
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Name <span
                class="text-red-600">*</span></label>
            <Field
                type="text"
                name="name"
                class="form-control pr-10"
                placeholder="Enter Category name"
                v-model.trim="dataCreate.name"
                required
                min-length="20"
                :class="{ 'is-invalid': errors.name }"
            />
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>
        </div>
        <ModalFooter>
          <div>
            <div class="intro-x mx-auto text-center flex justify-end">
              <button class="btn btn-secondary w-24 mr-4 mb-2" @click="closeModal">Cancel</button>
              <div v-if="isEnabled" class="w-24 mr-4 mb-2"><LoadingIcon icon="three-dots" class="w-20 h-20"/></div>
              <button class="btn btn-primary w-24 mb-2" type="submit" v-else>Add</button>
            </div>
          </div>
        </ModalFooter>
      </Form>
    </ModalBody>
  </Modal>
  <Notification :is-open="isModalNotiOpen" :on-close="closeNotiModal" :status="isSuccess" />
</template>

<style scoped>

</style>