<script>
import * as Yup from "yup";
import {Field, Form} from "vee-validate";

export default {
  name: "CategoryModal",
  components: {Field, Form},
  props: ['isOpen', 'onClose'],
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Category is required")
    })
    return {
      schema,
      dataCreate: {
        name: "",
      },
    }
  },
  methods: {
    addCategory() {

    },
    closeModal() {
      this.onClose()
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
                v-model="dataCreate.name"
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
              <button class="btn btn-primary w-24 mb-2" type="submit">Add</button>
            </div>
          </div>
        </ModalFooter>
      </Form>
    </ModalBody>
  </Modal>
</template>

<style scoped>

</style>