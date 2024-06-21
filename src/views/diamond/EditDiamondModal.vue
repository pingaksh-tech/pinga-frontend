<template>
  <div>
    <!-- Update Category popup -->
    <vs-popup id="update_category_modal" class="vs-con-loading__container" :title="`Update ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <!-- Form -->
      <form method="POST" @submit.prevent="save_changes">
        <!-- Form Content -->
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Diamond Clarity -->
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-box"
                icon-pack="feather"
                class="w-full"
                v-validate="'required'"
                v-model="form.diamond_clarity"
                label="Diamond Clarity"
                name="Diamond Clarity"
                id="Diamond Clarity"
              />
              <span class="text-danger text-sm" v-show="errors.has('Diamond Clarity')">{{ errors.first('Diamond Clarity') }}</span>
            </div>
            <!-- Diamond Shape -->
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-feather"
                icon-pack="feather"
                class="w-full"
                v-validate="'required'"
                v-model="form.diamond_shape"
                label="Diamond Shape"
                name="Diamond Shape"
                id="Diamond Shape"
              />
              <span class="text-danger text-sm" v-show="errors.has('Diamond Shape')">{{ errors.first('Diamond Shape') }}</span>
            </div>
            <!-- Diamond Color -->
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-stop-circle"
                icon-pack="feather"
                class="w-full"
                v-validate="'required'"
                v-model="form.diamond_color"
                label="Diamond Color"
                name="Diamond Color"
                id="Diamond Color"
              />
              <span class="text-danger text-sm" v-show="errors.has('Diamond Color')">{{ errors.first('Diamond Color') }}</span>
            </div>
            <!-- Diamond Weight -->
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-database"
                icon-pack="feather"
                class="w-full"
                type="number"
                v-validate="'required|min:1'"
                v-model="form.diamond_weight"
                label="Diamond Weight"
                name="Diamond Weight"
                id="Diamond Weight"
              />
              <span class="text-danger text-sm" v-show="errors.has('Diamond Weight')">{{ errors.first('Diamond Weight') }}</span>
            </div>
            <!-- Diamond Price -->
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-dollar-sign"
                icon-pack="feather"
                class="w-full"
                type="number"
                v-validate="'required|min:1'"
                v-model="form.diamond_price"
                label="Diamond Price"
                name="Diamond Price"
                id="Diamond Price"
              />
              <span class="text-danger text-sm" v-show="errors.has('Diamond Price')">{{ errors.first('Diamond Price') }}</span>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" @click="save_changes()" id="add-user-button" :disabled="!validateForm">Update</vs-button>
              <vs-button color="danger" class="text-left" @click="isActive = false">Cancel</vs-button>
            </div>
          </div>
        </div>
        <!-- End Form Content -->
      </form>
      <!-- End Form -->
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions } from 'vuex'

export default {
  name: 'AddCategory',

  /** Components */
  components: {
    Select2
  },

  /** Props */
  props: {
    showModal: Boolean,
    data: Object,
    module_name: String
  },

  /** Init Data */
  data() {
    return {
      loading: false,
      form: {
        diamond_clarity: this.data.diamond_clarity,
        diamond_color: this.data.diamond_color,
        diamond_weight: this.data.diamond_weight,
        diamond_price: this.data.diamond_price,
        diamond_shape: this.data.diamond_shape
      },
      zIndex: 0
    }
  },

  /** Page Render */
  mounted() {
    console.log(this.data._id)
  },

  /** Computed */
  computed: {
    /** Form Validation Manage */
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
    ...mapActions('diamond', {
      updateDiamondRecord: 'updateDiamondRecord'
    }),
    // reset form data
    resetForm() {
      this.form = {
        CategoryName: '',
        type: null
      }

      this.$nextTick(() => {
        this.errors.clear()
        this.$validator.reset()
      })
    },

    /** Update Category */
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.updateDiamondRecord({
          diamondId: this.data._id,
          data: this.form
        })
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

  /** watch Loading Manage */
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#update_category_modal .vs-popup .vs-popup--content',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#update_category_modal .vs-popup .vs-popup--content > .con-vs-loading')
      }
    }
  }
}
</script>

