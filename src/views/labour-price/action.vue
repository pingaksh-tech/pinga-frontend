<template>
  <div>
    <!-- latest product popup -->
    <vs-popup :title="`${action_name} ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Regular Price -->
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|integer|min_value:0'"
                v-model="form.regular_price"
                type="number"
                label="Regular Price *"
                name="regular_price"
                data-vv-as="Regular Price"
                id="regular_price"
              />
              <span class="text-danger text-sm" v-show="errors.has('regular_price')">{{ errors.first('regular_price') }}</span>
            </div>

            <!-- Category -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Category *</label>
              <select-2
                class="w-full category-input"
                name="Category"
                placeholder="Select Category"
                :value="form.category_id"
                @input="(item) => (form.category_id = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                v-model="categoryID"
                v-validate="'required'"
                action="common/getCategories"
              />
              <span class="text-danger text-sm" v-show="errors.has('Category')">{{ errors.first('Category') }}</span>
            </div>

            <!-- Sub Category -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Sub Category *</label>
              <select-2
                class="w-full category-input"
                name="Sub Category"
                placeholder="Select Sub Category"
                :value="form.sub_category_id"
                v-model="subCategoryID"
                @input="(item) => (form.sub_category_id = item && item.value)"
                :options="SubCategoryList"
                action="common/getSubCategoryByCategoryId"
                :actionCallRemove="false"
                autocomplete
                :ssr="true"
                :multiple="false"
                v-validate="'required'"
              />
              <span class="text-danger text-sm" v-show="errors.has('Sub Category')">{{ errors.first('Sub Category') }}</span>
            </div>

            <!-- Category -->
            <!-- <div class="vx-row mb-2">
              <label class="vs-input--label">Category *</label>
              <select-2 class="w-full category-input" name="Category" placeholder="Select Category"
                :value="form.categoryId" @input="(item) => (form.categoryId = item && item.value)" autocomplete
                :ssr="true" v-validate="'required'" action="common/getCategories" />
              <span class="text-danger text-sm" v-show="errors.has('Category')">{{ errors.first('Category') }}</span>
            </div> -->
            <!-- Product Tag -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Collection *</label>
              <select-2
                class="w-full category-input"
                name="collection"
                placeholder="Select Collection"
                :value="form.collection_id"
                @input="(item) => (form.collection_id = item && item.value)"
                autocomplete
                :ssr="true"
                v-validate="'required'"
                action="common/getCollections"
                data-vv-as="Collection"
              />
              <span class="text-danger text-sm" v-show="errors.has('collection')">{{ errors.first('collection') }}</span>
            </div>

            <!-- Retailer -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Retailer </label>
              <select-2
                multiple="true"
                class="w-full category-input"
                name="Retailer"
                placeholder="Select Retailer"
                :value="form.retailer"
                @input="(item) => (form.retailer = item && item.value)"
                autocomplete
                :ssr="true"
                action="common/getRetailer"
              />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Retailer')">{{ errors.first('Retailer') }}</span> -->
            </div>
            <!-- Price Type -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Price Type *</label>
              <select-2
                class="w-full role-input"
                name="price_type"
                placeholder="Select Price Type"
                :value="form.price_type"
                @input="(item) => (form.price_type = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                :options="[
                  { label: 'Default', value: 'Default' },
                  { label: 'Retailer Price', value: 'Retailer Price' }
                ]"
                :typeable="false"
                v-validate="'required'"
                data-vv-as="Price Type"
              />
              <span class="text-danger text-sm" v-show="errors.has('price_type')">{{ errors.first('price_type') }}</span>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-latest-product" @click="save_changes" :disabled="!validateForm">{{ action_name }}</vs-button>
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

export default {
  /** Page Name */
  name: `LabourPrice`,

  /** components */
  components: {
    Select2
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
      categoryID: null,
      subCategoryID: null,
      SubCategoryList: [],
      form: {
        category_id: null,
        sub_category_id: null,
        regular_price: null,
        collection_id: null,
        retailer: [],
        price_type: null
      },
      preview_image: null,
      zIndex: 0
    }
  },
  /** Mounted */
  async mounted() {
    if (this.data) {
      this.categoryID = this.form.category_id = this.data.category_id ? this.data.category_id : null

      this.form.regular_price = this.data.regular_price ? this.data.regular_price : null
      this.form.collection_id = this.data.collection_id ? this.data.collection_id : null

      const category = await this.getCategories({ page: 1, limit: 25, type: 'dropdown', categoryId: this.data.category_id })
      this.categoryList = category.data
      this.form.price_type = this.data.price_type || 'Default'

      if (this.form.category_id) {
        const sub_category = await this.getSubCategory({ categoryId: this.form.category_id, page: 1, limit: 25, type: 'dropdown', subCategoryId: this.data.sub_category_id })
        this.SubCategoryList = sub_category.data
        this.subCategoryID = this.form.sub_category_id = this.data.sub_category_id
      }
    }
  },

  /** computed */
  computed: {
    ...mapState('labourPrice', ['createLoading', 'dropDownOpt']),
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
      return !this.data ? 'required' : ''
    }
  },

  /** methods */
  methods: {
    ...mapActions('labourPrice', {
      createLabourPrice: 'createLabourPrice',
      updateLabourPrice: 'updateLabourPrice'
    }),
    ...mapActions('common', {
      getSubCategory: 'getSubCategoryByCategoryId',
      getCategories: 'getCategories'
    }),
    async fetchSubCategories() {
      const sub_category = await this.getSubCategory({ categoryId: this.categoryID.value, page: 1, limit: 25, type: 'dropdown' })
      this.SubCategoryList = sub_category.data
    },

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData()
        let result
        if (!this.data) {
          result = await this.createLabourPrice(this.form)
        } else {
          result = await this.updateLabourPrice({
            labourPriceId: this.data._id,
            data: this.form
          })
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
    }
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
    },
    categoryID(newValue) {
      this.SubCategoryList = []
      this.form.sub_category_id = null
      this.subCategoryID = null
      if (newValue && newValue.value) {
        this.fetchSubCategories()
      }
    }
  }
}
</script>
