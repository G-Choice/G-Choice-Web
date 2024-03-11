<template>
  <Modal :show="isOpen" size="modal-xl" @hidden="closeModal">
    <ModalHeader class="text-lg justify-center flex font-bold" @click="openModalAlert('SUCCESS')">
      Add product
    </ModalHeader>
    <ModalBody>
      <Form @submit="addProduct" :validation-schema="schema" v-slot="{ errors }">
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Category <span
                class="text-red-600">*</span></label>
            <Field
                as="select"
                name="category"
                class="form-control pr-10"
                placeholder="Enter category"
                v-model="dataCreate.category"
                :class="{ 'is-invalid': errors.category }"
            >
              <option value="">Please select the category</option>
              <option v-for="(item, index) in this.categoryList" :key="index" :value="item.id">
                {{ item.category_name }}
              </option>
            </Field>
            <div class="invalid-feedback">{{ errors.category }}</div>
          </div>
        </div>
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Name <span
                class="text-red-600">*</span></label>
            <Field
                type="text"
                name="name"
                class="form-control pr-10"
                placeholder="Enter product name"
                v-model="dataCreate.name"
                required
                :class="{ 'is-invalid': errors.name }"
                min-length="20"
            />
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>
        </div>
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Price <span
                class="text-red-600">*</span></label>
            <Field
                type="text"
                name="price"
                class="form-control pr-10"
                placeholder="Enter price"
                v-model="dataCreate.price"
                required
                :class="{ 'is-invalid': errors.price }"
            />
            <div class="invalid-feedback">{{ errors.price }}</div>
          </div>
        </div>
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Description <span
                class="text-red-600">*</span></label>
            <Field
                as="textarea"
                name="description"
                class="form-control pr-10"
                placeholder="Enter description"
                v-model="dataCreate.description"
                required
                :class="{ 'is-invalid': errors.description }"
            />
            <div class="invalid-feedback">{{ errors.description }}</div>
          </div>
        </div>
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Brand <span
                class="text-red-600">*</span></label>
            <Field
                type="text"
                name="brand"
                class="form-control pr-10"
                placeholder="Enter the brand"
                required
                v-model="dataCreate.brand"
                :class="{ 'is-invalid': errors.brand }"
            />
            <div class="invalid-feedback">{{ errors.brand }}</div>
          </div>
        </div>
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Amount <span class="text-red-600">*</span></label>
            <Field
                type="number"
                name="amount"
                class="form-control pr-10"
                placeholder="Enter the stock"
                v-model="dataCreate.amount"
                required
                min="0"
                :class="{ 'is-invalid': errors.amount }"
            />
            <div class="invalid-feedback">{{ errors.amount }}</div>
          </div>
        </div>
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Image <span
                class="text-red-600">*</span></label>
            <div class="mx-auto cursor-pointer relative mt-5">
              <button type="button" class="btn btn-primary w-full">Choose images</button>
              <input
                  type="file"
                  ref="uploadFile"
                  name="images"
                  class="custom-file-input w-full h-full top-0 left-0 absolute opacity-0 bg-yellow-300"
                  placeholder="Attach files"
                  multiple="multiple"
                  required
                  @change="handleFileUpload"
              />
            </div>
            <div class="invalid-feedback" v-for="(item, index) in errorImages" v-bind:key="index">{{ item }}</div>
          </div>
        </div>
        <div v-if="dataCreate.files.length > 0" class="selected-images">
          <div v-for="(image, index) in dataCreate.files" :key="index" class="image-preview">
            <div class="h-40 w-40 relative image-fit cursor-pointer zoom-in mx-auto">
            <img :src="image.url" alt="Preview" class="rounded-md">
            <Tippy
                tag="div"
                content="Remove this profile photo?"
                class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                @click="removeImage(index)"
            >
              <xIcon class="w-4 h-4" />
            </Tippy>
            </div>
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
  <Notification :is-open="isModalAlertOpen" :on-close="closeModalAlert" :status="isSuccess" />
</template>
<script>
import {Field, Form} from "vee-validate";
import ProductApi from "@/api/ProductApi";
import * as Yup from "yup";
import CategoryApi from "@/api/CategoryApi";
import Notification from "@/components/modal/Notification.vue";

export default {
  name: "ProductModal",
  components: {Notification, Field, Form},
  props: ['isOpen', 'onClose'],
  data() {
    const schema = Yup.object().shape({
      category: Yup.string().required("Category is required"),
      name: Yup.string().required('Product name is required').min(20),
      price: Yup.string().required('Price is required'),
      description: Yup.string().required("Description is required"),
      brand: Yup.string().required("Brand is required"),
      amount: Yup.string().required("Amount is required")
    })
    return {
      schema,
      dataCreate: {
        category: "",
        name: "",
        price: "",
        description: "",
        brand: "",
        amount: 1,
        files: []
      },
      errorImages: [],
      categoryList: [],
      isModalAlertOpen: false,
      isSuccess: null
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    closeModal() {
      this.onClose()
      this.resetForm()
    },
    async getCategories () {
      const res = await CategoryApi.getAllCategory()
      this.categoryList = res.data.data
    },
    async addProduct() {
      const isValid = await this.validate();
      if (!isValid) {
        console.log('Validation failed');
        return;
      }
      this.validateImage()
      const formData = new FormData();
      formData.append('product_name', this.dataCreate.name)
      formData.append('price', this.dataCreate.price)
      formData.append('description', this.dataCreate.description)
      formData.append('brand', this.dataCreate.brand)
      formData.append('category_id', this.dataCreate.category)
      formData.append('product_availability', this.dataCreate.amount)
      for (let i = 0; i < this.$refs.uploadFile.files?.length; i++) {
        let file = this.$refs.uploadFile.files[i];
        formData.append('files', file);
      }
      try {
        const res = await ProductApi.addProduct(formData)
        this.openModalAlert("SUCCESS")
      } catch (e) {
        console.log(e)
        this.openModalAlert("FAIL")
      } finally {
        this.closeModal()
        this.$store.dispatch("product/fetchListProduct")
      }
    },
    async validate() {
      try {
        await this.schema.validate(this.dataCreate, {abortEarly: false});
        return true;
      } catch (error) {
        console.error('Validation error:', error);
        return false;
      }
    },
    removeImage(index) {
      this.dataCreate.files.splice(index, 1);
      const files = Array.from(this.$refs.uploadFile.files);
      files.splice(index, 1);
      // this.dataCreate.files = files;
      // console.log('files list as array', Array.from(this.$refs.uploadFile.files));
      // console.log('filtered', Array.from(this.$refs.uploadFile.files).filter((_, i) => i !== index));
      // console.log('filtered with splice', Array.from(this.$refs.uploadFile.files).splice(index, 1));
      // // this.$refs.uploadFile.files = this.$refs.uploadFile.files.filter((_, i) => i !== index);
      // this.$refs.uploadFile.files = FileList.
      // Array.from(this.$refs.uploadFile.files).filter((_, i) => i !== index);
    },
    validateImage() {
      let file = this.$refs.uploadFile.files[0]
      let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
      this.errorImages = []

      if (!file) {
        this.errorImages.push('Image is required')
        return
      }
      if (!allowedTypes.includes(file.type)) {
        this.errorImages.push('Invalid type of files. Allowed jpeg, png and jpg.')
        return
      }
    },
    handleFileUpload() {
      this.dataCreate.files = []
      const files = this.$refs.uploadFile.files;
      for (const file of files) {
        this.dataCreate.files.push({url: URL.createObjectURL(file), file});
      }
    },
    resetForm() {
      this.dataCreate = {
        name: "",
            price: "",
            description: "",
            brand: "",
            amount: 1,
            files: []
      }
    },
    openModalAlert(status) {
      this.isModalAlertOpen = true
      this.isSuccess = status
    },
    closeModalAlert() {
      this.isModalAlertOpen = false
    }
  }
}
</script>
<style>
.modal-content {
  background-color: #FCEFEF !important;
}

.invalid-feedback {
  color: #ff3e72;
}
</style>
<style scoped>
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.selected-images {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 20px 0;
}
</style>