<script>
import * as Yup from "yup";
import {Field, Form} from "vee-validate";
import CategoryApi from "@/api/CategoryApi";
import Notification from "@/components/modal/Notification.vue";

export default {
  name: "UpdateCategoryModal",
  components: {Notification, Field, Form},
  props: ['isOpen', 'onClose', 'data'],
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Category is required")
    })
    return {
      schema,
      dataUpdate: {
        name: ""
      },
      isModalNotiOpen: false,
      isSuccess: null
    }
  },
  methods: {
    async addCategory() {
      const params = {
        category_name: this.dataUpdate.name
      }
      try {
        const res = await CategoryApi.updateCategory(JSON.stringify(params), this.data.id)
        await this.openNotiModal('SUCCESS')
      } catch (e) {
        console.warn(e)
        this.openNotiModal('FAIL')
      } finally {
        this.closeModal()
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
      this.dataUpdate.name = ""
    }
  },
  watch: {
    isOpen() {
      this.dataUpdate.name = this.data.category_name
    }
  }
}
</script>

<template>
  <Modal :show="isOpen" size="modal-lg" @hidden="closeModal">
    <ModalHeader class="text-lg justify-center flex font-bold">
      Update Category
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
                v-model="dataUpdate.name"
                required
                min-length="20"
                :class="{ 'is-invalid': errors.name }"
            />
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>
        </div>
        <ModalFooter>
            <div class="intro-x mx-auto text-center flex justify-end">
              <div class="btn btn-secondary w-24 mr-4 mb-2" @click="closeModal">Cancel</div>
              <button class="btn btn-primary w-24 mb-2" type="submit">Update</button>
            </div>
        </ModalFooter>
      </Form>
    </ModalBody>
  </Modal>
  <Notification :is-open="isModalNotiOpen" :on-close="closeNotiModal" :status="isSuccess" />
</template>

<style scoped>

</style>