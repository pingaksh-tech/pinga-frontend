<template>
  <div>
    <!-- Update Category popup -->
    <vs-popup id="update_category_modal" class="vs-con-loading__container" :title="`Update ${module_name}`"
      button-accept="false" button-cancel="false" :active.sync="isActive">
      <!-- Form -->
      <form method="POST" @submit.prevent="save_changes">
        <!-- Form Content -->
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Metal name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'"
                v-model="form.name" label="Metal Name" name="Metal Name" id="Metal Name" />
              <span class="text-danger text-sm" v-show="errors.has('Metal Name')">{{ errors.first('Metal Name')
                }}</span>
            </div>
            <!-- Sort Name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'"
                v-model="form.sort_name" label="Sort Name" name="Sort Name" id="Sort Name" />
              <span class="text-danger text-sm" v-show="errors.has('Sort Name')">{{ errors.first('Sort Name')
                }}</span>
            </div>
            <!-- Metal Carat -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Metal Carat</label>
              <select-2 class="w-full" name="Metal Carat" placeholder="Select Metal Carat" :value="form.metal_carat"
                @input="(item) => (form.metal_carat = item && item.value)" autocomplete :ssr="true"
                v-validate="'required'" :options="MetalCaratOptions" />
              <span class="text-danger text-sm" v-show="errors.has('Metal Carat')">{{ errors.first('Metal Carat')
                }}</span>
            </div>
            <!-- Metal Color -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Metal Color</label>
              <select-2 class="w-full" name="Metal Color" placeholder="Select Metal Color" :value="form.metal_color"
                @input="(item) => (form.metal_color = item && item.value)" autocomplete :ssr="true"
                v-validate="'required'" :options="MetalColorOptions" />
              <span class="text-danger text-sm" v-show="errors.has('Metal Color')">{{ errors.first('Metal Color')
                }}</span>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" @click="save_changes()" id="add-user-button"
                :disabled="!validateForm">Update</vs-button>
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Edit',

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
        name: this.data.name,
        metal_carat: this.data.metal_carat,
        metal_color: this.data.metal_color,
        sort_name: this.data.sort_name,
      },
      zIndex: 0
    }
  },

  /** Page Render */
  mounted() {
    console.log(this.data._id);
  },

  /** Computed */
  computed: {
    ...mapState('metal', ['updateLoading', 'MetalCaratOptions', 'MetalColorOptions']),
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
    ...mapActions("metal", {
      updateMetalRecord: "updateMetalRecord",
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
        const { message } = await this.updateMetalRecord({
          metalId: this.data._id,
          data: this.form
        });
        this.$emit('update-data', true);
        this.$vs.notify({
          title: "Success",
          text: message,
          iconPack: "feather",
          icon: "icon-alert-circle",
          position: "top-center",
          time: 5000,
          color: "success",
        });
        this.isActive = false
      } catch ({ message }) {
        this.$vs.notify({
          title: "Error",
          text: message,
          iconPack: "feather",
          icon: "icon-alert-circle",
          position: "top-center",
          time: 5000,
          color: "primary",
        });
      }
    },
  },

  /** watch Loading Manage */
  watch: {
    updateLoading() {
      if (this.updateLoading) {
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