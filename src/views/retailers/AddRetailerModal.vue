<template>
  <div>
    <!-- Add Retailer popup -->
    <vs-popup :title="`Add ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <!-- first_name -->
          <div class="vx-col w-full px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.first_name" label="First Name" name="First Name" id="First Name" />
              <span class="text-danger text-sm" v-show="errors.has('First Name')">{{ errors.first('First Name') }}</span>
            </div>
          </div>
          <!-- last_name -->
          <div class="vx-col w-full px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.last_name" label="Last Name" name="Last Name" id="Last Name" />
              <span class="text-danger text-sm" v-show="errors.has('Last Name')">{{ errors.first('Last Name') }}</span>
            </div>
          </div>
          <!-- business_name -->
          <div class="vx-col w-full px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|min:4'"
                v-model="form.business_name"
                label="Business Name"
                name="Business Name"
                id="Business Name"
              />
              <span class="text-danger text-sm" v-show="errors.has('Business Name')">{{ errors.first('Business Name') }}</span>
            </div>
          </div>
          <!-- email -->
          <div class="vx-col w-full px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.email" label="Email" name="Email" id="Email" />
              <span class="text-danger text-sm" v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
            </div>
          </div>
          <!-- phone -->
          <div class="vx-col w-full px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.phone" label="Phone" name="Phone" id="Phone" />
              <span class="text-danger text-sm" v-show="errors.has('Phone')">{{ errors.first('Phone') }}</span>
            </div>
          </div>
          <!-- landline -->
          <div class="vx-col w-full px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.landline" label="Landline" name="Landline" id="Landline" />
              <span class="text-danger text-sm" v-show="errors.has('Landline')">{{ errors.first('Landline') }}</span>
            </div>
          </div>
          <!-- address -->
          <div class="vx-col w-full mt-5">
            <div class="">
              <vs-textarea icon="icon icon-package" icon-pack="feather" v-validate="'required|min:4'" v-model="form.address" label="Address" name="Address" id="Address" />
              <span class="text-danger text-sm" v-show="errors.has('Address')">{{ errors.first('Address') }}</span>
            </div>
          </div>
          <!-- city -->
          <div class="vx-col w-full px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.city" label="City" name="City" id="City" />
              <span class="text-danger text-sm" v-show="errors.has('City')">{{ errors.first('City') }}</span>
            </div>
          </div>
          <!-- state -->
          <div class="vx-col w-full px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.state" label="State" name="State" id="State" />
              <span class="text-danger text-sm" v-show="errors.has('State')">{{ errors.first('State') }}</span>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-category" @click="save_changes" :disabled="!validateForm">Add</vs-button>
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
  name: 'AddCategory',

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
        first_name: '',
        last_name: '',
        business_name: '',
        email: '',
        phone: '',
        landline: '',
        address: '',
        city: '',
        state: ''
      },
      zIndex: 0
    }
  },
  /** Mounted */
  mounted() {},

  /** computed */
  computed: {
    ...mapState('retailer', ['createLoading']),
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
    ...mapActions('retailer', {
      createRetailer: 'createRetailer'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.createRetailer(this.form)
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
          container: '#create-category',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-category > .con-vs-loading')
      }
    }
  }
}
</script>
