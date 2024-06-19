<template>
  <div>
    <!-- Add inventory popup -->
    <vs-popup :title="`Add ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Inventory Name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-box" icon-pack="feather" class="w-full" v-validate="'required'"
                v-model="form.name" label="Inventory Name" name="Inventory Name" id="Inventory Name" />
              <span class="text-danger text-sm" v-show="errors.has('Inventory Name')">{{ errors.first('Inventory Name')
                }}</span>
            </div>

            <!-- Category -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Category</label>
              <select-2 class="w-full category-input" name="Category" placeholder="Select Category"
                :value="form.category_id" @input="(item) => (form.category_id = item && item.value)" autocomplete
                :ssr="true" :multiple="false" v-model="categoryID" v-validate="'required'"
                action="common/getCategories" />
              <span class="text-danger text-sm" v-show="errors.has('Category')">{{ errors.first('Category') }}</span>
            </div>

            <!-- Sub Category -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Sub Category</label>
              <select-2 class="w-full category-input" name="Sub Category" placeholder="Select Sub Category"
                :value="form.sub_category_id" v-model="form.sub_category_id" :options="SubCategoryList" autocomplete
                :ssr="true" :multiple="false" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('Sub Category')">{{ errors.first('Sub Category')
                }}</span>
            </div>

            <!-- Inventory Size -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-box" icon-pack="feather" class="w-full" v-model="form.size"
                label="Inventory Size" Size="Inventory Size" id="Inventory Size" />
            </div>

            <!-- Inventory Metal -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Inventory Metal</label>
              <select-2 class="w-full metal-input" name="Metal" placeholder="Select Metal" :value="form.metal_id"
                @input="(item) => (form.metal_id = item && item.value)" autocomplete :ssr="true" :multiple="false"
                v-validate="'required'" action="common/getMetals" />
              <span class="text-danger text-sm" v-show="errors.has('Metal')">{{ errors.first('Metal') }}</span>
            </div>

            <!-- Metal Weight -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-database" icon-pack="feather" class="w-full" type="number"
                v-validate="'required|min:1'" v-model="form.metal_weight" label="Metal Weight" name="Metal Weight"
                id="Metal Weight" />
              <span class="text-danger text-sm" v-show="errors.has('Metal Weight')">{{
                errors.first('Metal Weight') }}</span>
            </div>

            <!-- Diamond -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Diamond</label>
              <select-2 class="w-full category-input" name="Diamond" placeholder="Select Diamond" :value="form.diamonds"
                @input="(item) => (form.diamonds = item && item.value)" autocomplete :ssr="true" :multiple="true"
                action="common/getDiamonds" />
              <span class="text-primary text-sm" v-show="errors.has('Diamond')">{{ errors.first('Diamond') }}</span>
            </div>

            <!-- Product Tags -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Product Tag</label>
              <select-2 class="w-full category-input" name="Product Tag" placeholder="Select Product Tag"
                :value="form.product_tags" @input="(item) => (form.product_tags = item && item.value)" autocomplete
                :ssr="true" :multiple="true" action="common/getProductTags" />
              <span class="text-primary text-sm" v-show="errors.has('Product Tag')">{{ errors.first('Product Tag')
                }}</span>
            </div>


            <!-- Manufacturing Price -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-dollar-sign" icon-pack="feather" class="w-full" type="number"
                v-validate="'required|min:1'" v-model="form.manufacturing_price" label="Manufacturing Price"
                name="Manufacturing Price" id="Manufacturing Price" />
              <span class="text-danger text-sm" v-show="errors.has('Manufacturing Price')">{{
                errors.first('Manufacturing Price') }}</span>
            </div>

            <!-- Inventory Gender -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Inventory Gender</label>
              <div class="w-full mt-1">
                <vs-radio v-validate="'required'" v-model="form.gender" name="Gender" vs-value="male" class="mr-4"
                  vs-name="layout-type-male">MALE</vs-radio>
                <vs-radio v-validate="'required'" v-model="form.gender" name="Gender" vs-value="female" class="mr-4"
                  vs-name="layout-type-female">FEMALE</vs-radio>
                <vs-radio v-validate="'required'" v-model="form.gender" name="Gender" vs-value="unisex" class="mr-4"
                  vs-name="layout-type-unisex">UNISEX</vs-radio>
              </div>
              <span class="text-danger text-sm" v-show="errors.has('Gender')">{{ errors.first('Gender') }}</span>
            </div>

            <div class="vx-row mb-2">
              <!-- Inventory In Stock -->
              <div class="mb-2 w-48">
                <label class="vs-input--label pl-0">Inventory In Stock ?</label>
                <div class="mt-1">
                  <vs-switch color="primary" v-model="form.in_stock">
                    <span slot="on">Yes</span>
                    <span slot="off">No</span>
                  </vs-switch>
                </div>
              </div>

              <!-- Inventory In Stock -->
              <div class="mb-2 w-48 ">
                <label class="vs-input--label pl-0">Wear It Item ?</label>
                <div class="mt-1">
                  <vs-switch color="primary" v-model="form.wear_it_item">
                    <span slot="on">Yes</span>
                    <span slot="off">No</span>
                  </vs-switch>
                </div>
              </div>

            </div>
            <!-- Delivery -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-box" icon-pack="feather" class="w-full" v-validate="'required'"
                v-model="form.delivery" label="Delivery" name="Delivery" id="Delivery" />
              <span class="text-danger text-sm" v-show="errors.has('Delivery')">{{ errors.first('Delivery')
                }}</span>
            </div>

            <!-- Production Name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-box" icon-pack="feather" class="w-full" v-validate="'required'"
                v-model="form.production_name" label="Production Name" name="Production Name" id="Production Name" />
              <span class="text-danger text-sm" v-show="errors.has('Production Name')">
                {{ errors.first('Production Name') }}</span>
            </div>

          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-inventory" @click="save_changes"
                :disabled="!validateForm">Add</vs-button>
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
  name: 'AddInventory',

  /** components */
  components: {
    Select2
  },

  /** Props */
  props: {
    showModal: Boolean,
    module_name: String
  },

  /** data */
  data() {
    return {
      categoryID:null,
      form: {
        name: null,
        category_id: null,
        sub_category_id:null,
        size: null,
        metal_id: null,
        metal_weight: null,
        gender:null,
        in_stock:false,
        wear_it_item:false,
        delivery:null,
        production_name:null,
        diamonds:[],
        product_tags:[],
        manufacturing_price:null
      },
      zIndex: 0
    }
  },
  /** Mounted */
  mounted() {},

  /** computed */
  computed: {
    ...mapState('inventory', ['createLoading']),
    ...mapState("common", ["SubCategoryList"]),

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
    }
  },

  /** methods */
  methods: {
    ...mapActions('inventory', {
      createInventory: 'createInventory'
    }),
    ...mapActions('common', {
      getSubCategory: 'getSubCategoryByCategoryId'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        this.form.sub_category_id = this.form.sub_category_id.value
        const { message } = await this.createInventory(this.form)
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
    /* -------------------------------------------------------------------------- */
    /*                         Get Category List By Project                         */
    /* -------------------------------------------------------------------------- */
    async fetchSubCategories() {
      await this.getSubCategory(this.categoryID.value)
    }
  },

  /** watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#create-inventory',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-inventory > .con-vs-loading')
      }
    },
    categoryID(){
      this.fetchSubCategories();
    }
  }
}
</script>
