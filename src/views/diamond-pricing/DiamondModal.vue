<template>
  <div>
    <!-- Diamond Pricing popup -->
    <vs-popup :title="`${action_name} ${module_name}`" button-accept="false" button-cancel="false"
      :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">

            <!-- Slieve Size -->
            <div class="vx-row mb-2">
              <vs-input :disabled="action_name === 'Edit'" icon="icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:1'"
                v-model="form.diamond_slieve_size" label="Slieve Size *" name="diamond_slieve_size" data-vv-as="Slieve Size"
                id="Slieve Size" />
              <span class="text-danger text-sm" v-show="errors.has('diamond_slieve_size')">{{ errors.first('diamond_slieve_size') }}</span>
            </div>

            <!-- Slieve Size Range -->
            <div class="vx-row mb-2">
              <vs-input :disabled="action_name === 'Edit'" icon="icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:1'"
                v-model="form.slieve_size_range" label="Slieve Size Range *" name="slieve_size_range" data-vv-as="Slieve Size Range"
                id="Slieve Size Range" />
              <span class="text-danger text-sm" v-show="errors.has('slieve_size_range')">{{ errors.first('slieve_size_range') }}</span>
            </div>

            <!-- Carat -->
            <div class="vx-row mb-2">
              <vs-input :disabled="action_name === 'Edit'" icon="icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:1'"
                v-model="form.carat" label="Carat *" name="carat" data-vv-as="Carat"
                id="Carat" />
              <span class="text-danger text-sm" v-show="errors.has('carat')">{{ errors.first('carat') }}</span>
            </div>

            <!-- MM Size -->
            <div class="vx-row mb-2">
              <vs-input :disabled="action_name === 'Edit'" icon="icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:1'"
                v-model="form.mm_size" label="MM Size *" name="mm_size" data-vv-as="MM Size"
                id="MM Size" />
              <span class="text-danger text-sm" v-show="errors.has('mm_size')">{{ errors.first('mm_size') }}</span>
            </div>

            <!-- SI-HI -->
            <div class="vx-row mb-2">
              <vs-input icon="icon-package" icon-pack="feather" class="w-full" v-validate="'required|numeric|min_value:0'"
                v-model="form.si_hi" label="SI-HI *" name="si_hi" data-vv-as="SI-HI"
                id="SI-HI" type="number" />
              <span class="text-danger text-sm" v-show="errors.has('si_hi')">{{ errors.first('si_hi') }}</span>
            </div>

            <!-- VS-SI-GH -->
            <div class="vx-row mb-2">
              <vs-input icon="icon-package" icon-pack="feather" class="w-full" v-validate="'required|numeric|min_value:0'"
                v-model="form.vs_si_gh" label="VS-SI-GH *" name="vs_si_gh" data-vv-as="VS-SI-GH" id="VS-SI-GH" type="number" />
              <span class="text-danger text-sm" v-show="errors.has('vs_si_gh')">{{ errors.first('vs_si_gh') }}</span>
            </div>

            <!-- VS-SI-HI -->
            <div class="vx-row mb-2">
              <vs-input icon="icon-package" icon-pack="feather" class="w-full" v-validate="'required|numeric|min_value:0'"
                v-model="form.vs_si_hi" label="VS-SI-HI *" name="vs_si_hi" data-vv-as="VS-SI-HI" id="VS-SI-HI" type="number" />
              <span class="text-danger text-sm" v-show="errors.has('vs_si_hi')">{{ errors.first('vs_si_hi') }}</span>
            </div>

            <!-- VVS-EF -->
            <div class="vx-row mb-2">
              <vs-input icon="icon-package" icon-pack="feather" class="w-full" v-validate="'required|numeric|min_value:0'"
                v-model="form.vvs_ef" label="VVS-EF *" name="vvs_ef" data-vv-as="VVS-EF" id="VVS-EF" type="number" />
              <span class="text-danger text-sm" v-show="errors.has('vvs_ef')">{{ errors.first('vvs_ef') }}</span>
            </div>

            <!-- Price Type -->
            <!-- <div class="vx-row mb-2">
              <label class="vs-input--label">Price Type *</label>
              <vs-select class="w-full" v-model="form.price_type" name="price_type" v-validate="'required'" data-vv-as="Price Type">
                <vs-select-item value="Default" text="Default" />
                <vs-select-item value="Retailer Price" text="Retailer Price" />
              </vs-select>
              <span class="text-danger text-sm" v-show="errors.has('price_type')">{{ errors.first('price_type') }}</span>
            </div> -->

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
                  { label: 'Retailer Price', value: 'Retailer Price' },
                ]"
                :typeable="false"
                v-validate="'required'"
                data-vv-as="Price Type"
              />
              <span class="text-danger text-sm" v-show="errors.has('price_type')">{{ errors.first('price_type') }}</span>
            </div>

            <!-- Retailer -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Retailer *</label>
              <select-2 multiple="true" class="w-full category-input" name="Retailer" placeholder="Select Retailer"
                :value="form.retailer" @input="(item) => (form.retailer = item && item.value)" autocomplete
                :ssr="true" v-validate="'required'" action="common/getRetailer" />
              <span class="text-danger text-sm" v-show="errors.has('Retailer')">{{ errors.first('Retailer') }}</span>
            </div>

            <!-- User -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">User *</label>
              <select-2 multiple="true" class="w-full category-input" name="User" placeholder="Select User"
                :value="form.user" @input="(item) => (form.user = item && item.value)" autocomplete
                :ssr="true" v-validate="'required'" action="common/getUserDropdownList" />
              <span class="text-danger text-sm" v-show="errors.has('User')">{{ errors.first('User') }}</span>
            </div>
          </div>
        </div>

        <!-- Save & Cancel Buttons -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-diamond-pricing" @click="save_changes"
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

export default {
  name: 'DiamondModal',
  components: {
    Select2
  },
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    module_name: {
      type: String,
      required: true
    },
    action_name: {
      type: String,
      required: true
    },
    editData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        diamond_slieve_size: null,
        slieve_size_range: null,
        carat: null,
        mm_size: null,
        si_hi: null,
        vs_si_gh: null,
        vs_si_hi: null,
        vvs_ef: null,
        price_type: null,
        retailer: [],
        user: []
      },
      zIndex: 0
    }
  },
  computed: {
    ...mapState('diamondPricing', ['createLoading']),
    validateForm() {
      return !this.errors.any()
    },
    isActive: {
      get() {
        return this.showModal
      },
      set(val) {
        this.$emit('update:showModal', val)
        if (!val) {
          this.resetForm()
        }
      }
    }
  },
  watch: {
    editData: {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.form.diamond_slieve_size = newData.diamond_slieve_size || null
          this.form.slieve_size_range = newData.slieve_size_range || null
          this.form.carat = newData.carat || null
          this.form.mm_size = newData.mm_size || null
          this.form.si_hi = newData.si_hi || null
          this.form.vs_si_gh = newData.vs_si_gh || null
          this.form.vs_si_hi = newData.vs_si_hi || null
          this.form.vvs_ef = newData.vvs_ef || null
          this.form.price_type = newData.price_type || 'Default'
          this.form.retailer = newData.retailer ? (Array.isArray(newData.retailer) ? newData.retailer : [newData.retailer]) : []
          this.form.user = newData.user ? (Array.isArray(newData.user) ? newData.user : [newData.user]) : []
        } else {
          this.resetForm()
        }
      }
    },
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#create-diamond-pricing',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-diamond-pricing > .con-vs-loading')
      }
    }
  },
  methods: {
    ...mapActions('diamondPricing', {
      createDiamondPricing: 'createDiamondPricing',
      updateDiamondPricing: 'updateDiamondPricing'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        let data
        if (this.action_name === 'Add') {
          data = {
            diamond_slieve_size: this.form.diamond_slieve_size,
            slieve_size_range: this.form.slieve_size_range,
            carat: this.form.carat,
            mm_size: this.form.mm_size,
            si_hi: this.form.si_hi,
            vs_si_gh: this.form.vs_si_gh,
            vs_si_hi: this.form.vs_si_hi,
            vvs_ef: this.form.vvs_ef,
            price_type: this.form.price_type,
            retailer: this.form.retailer,
            user: this.form.user
          }
        } else {
          data = {
            si_hi: this.form.si_hi,
            vs_si_gh: this.form.vs_si_gh,
            vs_si_hi: this.form.vs_si_hi,
            vvs_ef: this.form.vvs_ef,
            price_type: this.form.price_type,
            retailer: this.form.retailer,
            user: this.form.user
          }
        }

        let result
        if (this.action_name === 'Add') {
          result = await this.createDiamondPricing(data)
        } else {
          result = await this.updateDiamondPricing({
            diamondPricingId: this.editData._id,
            data
          })
        }
        this.$vs.notify({
          title: 'Success',
          text: result.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
        this.$emit('update-data', true)
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
    resetForm() {
      this.form = {
        diamond_slieve_size: null,
        slieve_size_range: null,
        carat: null,
        mm_size: null,
        si_hi: null,
        vs_si_gh: null,
        vs_si_hi: null,
        vvs_ef: null,
        price_type: null,
        retailer: [],
        user: []
      }
      this.$validator.reset()
    }
  }
}
</script>