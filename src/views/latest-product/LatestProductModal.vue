<template>
  <div>
    <!-- latest product popup -->
    <vs-popup :title="`${action_name} ${module_name}`" button-accept="false" button-cancel="false"
      :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Product name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'"
                v-model="form.product_name" label="Product Name *" name="product_name" data-vv-as="Product Name"
                id="Product Name" />
              <span class="text-danger text-sm" v-show="errors.has('product_name')">{{ errors.first('product_name')
                }}</span>
            </div>
            <!-- Category -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Category *</label>
              <select-2 class="w-full category-input" name="Category" placeholder="Select Category"
                :value="form.categoryId" @input="(item) => (form.categoryId = item && item.value)" autocomplete
                :ssr="true" v-validate="'required'" action="common/getCategories" />
              <span class="text-danger text-sm" v-show="errors.has('Category')">{{ errors.first('Category') }}</span>
            </div>
            <!-- Product Tag -->

            <div class="vx-row mb-2">
              <label class="vs-input--label">Inventory *</label>
              <!-- <select-2 class="w-full category-input" name="inventory" placeholder="Select Inventory"
                :value="form.inventory_ids" @input="(item) => (form.inventory_ids = item && item.value)" autocomplete
                :ssr="true" :multiple="true" v-validate="'required'" action="common/getInventories"
                data-vv-as="Inventory" /> -->
                <customInventory-select-2
                class="w-full category-input"
                name="inventory"
                placeholder="Select Inventory"
                :value="form.inventory_ids"
           @input="(item) => (form.inventory_ids = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="true"
                v-validate="'required'"
                data-vv-as="User"

                action="common/getInventories"
              />
              <span class="text-danger text-sm" v-show="errors.has('inventory')">{{
                errors.first('inventory')
              }}</span>
            </div>
          </div>
          <div class="vx-col w-full cursor-pointer">
            <label class="vs-input--label block">Product Image *</label>
            <input type="file" class="border p-2 rounded w-full" name="product_image" ref="files"
              accept=".jpg, .png , .jpeg,.pdf" @change="handleFileUpload" style="border: 1px solid rgba(0, 0, 0, 0.2);"
              v-validate="productImagevalidationRule" data-vv-as="Product Image" />
            <span class="text-danger text-sm" v-show="errors.has('product_image')">{{ errors.first('product_image')
              }}</span>
            <div class="mt-5">
              <div class="relative" v-if="preview_image">
                <div class="h-64 w-64 mt-5 rounded-lg overflow-hidden">
                  <img height="200px" width="250px" :src="preview_image" alt="Image Preview" class="object-fit" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-latest-product" @click="save_changes"
                :disabled="!validateForm">{{ action_name }}</vs-button>
              <vs-button color="danger" class="text-left" @click="isActive = false">Cancel</vs-button>
            </div>
          </div>
        </div>
      </form>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import CustomInventorySelect2 from '@/components/custom/form-elements/CustomInventorySelect2.vue'

export default {
  /** Page Name */
  name: `LatestProduct`,

  /** components */
  components: {
    Select2,
    CustomInventorySelect2
  },

  /** Props */
  props: {
    showModal: Boolean,
    data: Object,
    module_name: String,
    action_name: String
  },

  /** data */
  data() {
    return {
      form: {
        categoryId: null,
        product_name: null,
        inventory_ids: [],
        product_image: null
      },
      preview_image: null,
      zIndex: 0
    }
  },
  /** Mounted */
  mounted() {
    if (this.data) {
      this.form.categoryId = this.data.category ? this.data.category._id : null;
      this.form.product_name = this.data.product_name ? this.data.product_name : null;
      this.form.inventory_ids = this.data.inventory_ids ? this.data.inventory_ids : []
      this.preview_image = this.data.product_image ? this.data.product_image : null;
    }
  },

  /** computed */
  computed: {
    ...mapState('latestProduct', ['createLoading', 'dropDownOpt']),
    validateForm() {
      return !this.errors.any()
    },
    isActive: {
      get() {
        return this.showModal
      },
      set(val) {
        this.$emit('update:showModal', val)
      }
    },
    productImagevalidationRule() {
      return !this.data ? 'required' : '';
    }
  },

  /** methods */
  methods: {
    ...mapActions('latestProduct', {
      createLatestProduct: 'createLatestProduct',
      updateLatestProduct: 'updateLatestProduct'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData();
        if (this.form.product_image) {
          data.append("product_image", this.form.product_image);
        }
        data.append("category_id", this.form.categoryId);
        data.append("product_name", this.form.product_name);
        this.form.inventory_ids.map((value) => {
          data.append("inventory_ids[]", value);
        })
        let result;
        if (!this.data) {
          result = await this.createLatestProduct(data)
        } else {
          result = await this.updateLatestProduct({
            latestProductId: this.data._id,
            data: data
          });
        }
        const message = result.message
        this.$emit('update-data', true)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
        this.isActive = false
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
      }
    },

    /** file upload  */
    handleFileUpload(e) {
      const file = e.target.files[0]

      // Check if a file is selected
      if (!file) {
        this.$vs.notify({
          title: 'Error',
          text: 'No file selected',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
        return
      }

      // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
      if (this.form.product_image && this.form.product_image.src) {
        URL.revokeObjectURL(this.form.product_image.src);
      }
      // 2. Create the image link to the file to optimize performance:
      this.preview_image = URL.createObjectURL(file);
      this.form.product_image = file

    },
  },

  /** watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#create-latest-product',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-latest-product > .con-vs-loading')
      }
    }
  }
}
</script>
