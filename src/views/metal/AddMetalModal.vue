<template>
  <div>
    <!-- Add Metal popup -->
    <vs-popup :title="`Add ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Metal name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'"
                v-model="form.name" label="Metal Name *" name="Metal Name" id="Metal Name" />
              <span class="text-danger text-sm" v-show="errors.has('Metal Name')">{{ errors.first('Metal Name')
                }}</span>
            </div>
            <!-- Short Name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'"
                v-model="form.sort_name" label="Short Name *" name="Short Name" id="Short Name" />
              <span class="text-danger text-sm" v-show="errors.has('Short Name')">{{ errors.first('Short Name')
                }}</span>
            </div>

            <!-- Price Per Gram -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-dollar-sign" icon-pack="feather" class="w-full" type="number"
                v-validate="'required|decimal|min_value:1'" min="1" v-model="form.price_per_gram"
                label="Price Per Gram *" name="Price Per Gram" id="Price Per Gram" />
              <span class="text-danger text-sm" v-show="errors.has('Price Per Gram')">{{
                errors.first('Price Per Gram') }}</span>
            </div>

            <!-- Metal Carat -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Metal Carat *</label>
              <select-2 class="w-full" name="Metal Carat" placeholder="Select Metal Carat" :value="form.metal_carat"
                @input="(item) => (form.metal_carat = item && item.value)" autocomplete :ssr="true"
                v-validate="'required'" :options="MetalCaratOptions" />
              <span class="text-danger text-sm" v-show="errors.has('Metal Carat')">{{ errors.first('Metal Carat')
                }}</span>
            </div>
            <!-- Metal Color -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Metal Color *</label>
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
              <vs-button class="mr-2 vs-con-loading__container" id="create-metal" @click="save_changes"
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
  name: 'Add-Metal-Modal',

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
      form: {
        name: '',
        metal_carat: '',
        metal_color: '',
        sort_name: '',
        price_per_gram: '',
      },
      zIndex: 0
    }
  },
  /** Mounted */
  mounted() { },

  /** computed */
  computed: {
    ...mapState('metal', ['createLoading', 'MetalCaratOptions', 'MetalColorOptions']),
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
    ...mapActions('metal', {
      createMetal: 'createMetal'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.createMetal(this.form)
        console.log(message, 'message API in VUE');
        // this.$emit('update-data', true)
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
          container: '#create-metal',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-metal > .con-vs-loading')
      }
    }
  }
}
</script>
