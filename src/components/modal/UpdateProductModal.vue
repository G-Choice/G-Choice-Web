<script>
import Notification from "@/components/modal/Notification.vue";
import {Field, Form} from "vee-validate";
import * as Yup from "yup";
import CategoryApi from "@/api/CategoryApi";
import ProductApi from "@/api/ProductApi";
import {Status} from "@/common/StatusEnum";

export default {
  name: "UpdateProductModal",
  computed: {
    Status() {
      return Status
    }
  },
  components: {Notification, Field, Form},
  props: ['isOpen', 'onClose', 'data'],
  data() {
    const schema = Yup.object().shape({
      category: Yup.string().required("category is required"),
      name: Yup.string().required('product name is required').min(20),
      price: Yup.number().required('price is required').min(0),
      description: Yup.string().required("description is required"),
      brand: Yup.string().required("brand is required"),
      amount: Yup.number().required("amount is required").min(1)
    })
    return {
      schema,
      dataUpdate: {
        category: "",
        name: "",
        price: "",
        description: "",
        brand: "",
        amount: 1,
        files: [],
        status: ""
      },
      errorImages: [],
      categoryList: [],
      isModalAlertOpen: false,
      isSuccess: null,
      isEnabled: false,
      isFileUpdateChange: false
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
    async getCategories() {
      const res = await CategoryApi.getAllCategory()
      this.categoryList = res.data.data
    },
    async addProduct() {
      const formData = new FormData();
      formData.append('product_name', this.dataUpdate.name)
      formData.append('price', this.dataUpdate.price)
      formData.append('description', this.dataUpdate.description)
      formData.append('brand', this.dataUpdate.brand)
      formData.append('category_id', this.dataUpdate.category)
      formData.append('product_availability', this.dataUpdate.amount)
      formData.append('status', this.dataUpdate.status)
      for (let i = 0; i < this.$refs.uploadFile.files?.length; i++) {
        let file = this.$refs.uploadFile.files[i];
        formData.append('files', file);
      }
      try {
        this.isEnabled = true
        const res = await ProductApi.updateProduct(formData, this.data.product_id)
        if (res.data.statusCode === 200) {
          this.openModalAlert("SUCCESS")
        } else {
          this.openModalAlert("FAIL", "Existing active product in group, can not change status into Inactive")
        }
      } catch (e) {
        console.log(e)
        this.openModalAlert("FAIL")
      } finally {
        this.closeModal()
        this.isEnabled = false
        this.$store.dispatch("product/fetchListProduct")
      }
    },
    removeImage(index) {
      this.dataUpdate.files.splice(index, 1);
      const files = Array.from(this.$refs.uploadFile.files);
      files.splice(index, 1);
    },
    handleFileUpload() {
      this.isFileUpdateChange = true
      this.dataUpdate.files = []
      const files = this.$refs.uploadFile.files;
      for (const file of files) {
        this.dataUpdate.files.push({url: URL.createObjectURL(file), file});
      }
    },
    resetForm() {
      this.dataUpdate = {
        name: "",
        price: "",
        description: "",
        brand: "",
        amount: 1,
        files: []
      }
      this.isFileUpdateChange = false
    },
    openModalAlert(status, title) {
      this.isModalAlertOpen = true
      this.isSuccess = status
      this.message = title
    },
    closeModalAlert() {
      this.isModalAlertOpen = false
    }
  },
  watch: {
    isOpen() {
      this.dataUpdate.name = this.data.product_product_name
      this.dataUpdate.category = this.data.product_category_id
      this.dataUpdate.price = this.data.product_price
      this.dataUpdate.amount = this.data.product_quantity_inventory
      this.dataUpdate.description = this.data.product_description
      this.dataUpdate.brand = this.data.product_brand
      this.dataUpdate.status = this.data.product_status
      this.dataUpdate.files = this.data.product_images
    }
  }
}
</script>

<template>
  <Modal :show="isOpen" size="modal-xl" @hidden="closeModal">
    <ModalHeader class="text-lg justify-center flex font-bold">
      Update product
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
                v-model="dataUpdate.category"
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
                v-model.trim="dataUpdate.name"
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
                type="number"
                name="price"
                class="form-control pr-10"
                placeholder="Enter price"
                v-model.trim="dataUpdate.price"
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
                v-model.trim="dataUpdate.description"
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
                v-model.trim="dataUpdate.brand"
                :class="{ 'is-invalid': errors.brand }"
            />
            <div class="invalid-feedback">{{ errors.brand }}</div>
          </div>
        </div>
        <div class="flex flex-row justify-center gap-5 form-create">
          <div class="w-full create-layout">
            <label for="regular-form-1" class="form-label text-sm font-bold">Status <span class="text-red-600">*</span></label>
            <Field
                as="select"
                name="status"
                class="form-control pr-10"
                placeholder="Enter the stock"
                v-model="dataUpdate.status"
                :class="{ 'is-invalid': errors.status }"
            >
              <option
                  v-for="(index, value) in Status"
                  :key="value"
                  :value="value">{{ index }}
              </option>
            </Field>
            <div class="invalid-feedback">{{ errors.status }}</div>
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
                v-model="dataUpdate.amount"
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
                  accept="image/*"
                  @change="handleFileUpload"
              />
            </div>
            <div class="invalid-feedback" v-for="(item, index) in errorImages" v-bind:key="index">{{ item }}</div>
          </div>
        </div>
        <div v-if="dataUpdate.files.length > 0 && isFileUpdateChange" class="selected-images">
          <div v-for="(image, index) in dataUpdate.files" :key="index" class="image-preview">
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
        <div v-if="!isFileUpdateChange" class="selected-images">
          <div v-for="(image, index) in dataUpdate.files" :key="index" class="image-preview">
            <div class="h-40 w-40 relative image-fit cursor-pointer zoom-in mx-auto">
              <img :src="image" alt="Preview" class="rounded-md">
            </div>
          </div>
        </div>
        <ModalFooter class="px-0">
            <div class="intro-x mx-auto text-center flex justify-end">
              <div class="btn btn-secondary w-24 mr-4 mb-2" @click="closeModal">Cancel</div>
              <div v-if="isEnabled" class="w-24 mr-4 mb-2"><LoadingIcon icon="three-dots" class="w-20 h-20"/></div>
              <button class="btn btn-primary w-24 mb-2" type="submit" v-else>Update</button>
            </div>
        </ModalFooter>
      </Form>
    </ModalBody>
  </Modal>
  <Notification :is-open="isModalAlertOpen" :on-close="closeModalAlert" :status="isSuccess" :title="message"/>
</template>

<style scoped>

</style>