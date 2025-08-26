<template>
  <div>
    <!-- Diamond Pricing popup -->
    <vs-popup :title="`${action_name} ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <!-- Slieve Size -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                :disabled="action_name === 'Edit'"
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|min:1'"
                v-model="form.diamond_slieve_size"
                label="Slieve Size *"
                name="diamond_slieve_size"
                data-vv-as="Slieve Size"
                id="Slieve Size"
              />
              <span class="text-danger text-sm" v-show="errors.has('diamond_slieve_size')">{{ errors.first('diamond_slieve_size') }}</span>
            </div>
          </div>

          <!-- Slieve Size Range -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                :disabled="action_name === 'Edit'"
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|min:1'"
                v-model="form.slieve_size_range"
                label="Slieve Size Range *"
                name="slieve_size_range"
                data-vv-as="Slieve Size Range"
                id="Slieve Size Range"
              />
              <span class="text-danger text-sm" v-show="errors.has('slieve_size_range')">{{ errors.first('slieve_size_range') }}</span>
            </div>
          </div>

          <!-- Carat -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                :disabled="action_name === 'Edit'"
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|min:1'"
                v-model="form.carat"
                label="Carat *"
                name="carat"
                data-vv-as="Carat"
                id="Carat"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('carat')">{{ errors.first('carat') }}</span>
            </div>
          </div>

          <!-- MM Size -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                :disabled="action_name === 'Edit'"
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|min:1'"
                v-model="form.mm_size"
                label="MM Size *"
                name="mm_size"
                data-vv-as="MM Size"
                id="MM Size"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('mm_size')">{{ errors.first('mm_size') }}</span>
            </div>
          </div>

          <!-- SI-HI -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|numeric|min_value:0'"
                v-model="form.si_hi"
                label="SI-HI *"
                name="si_hi"
                data-vv-as="SI-HI"
                id="SI-HI"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('si_hi')">{{ errors.first('si_hi') }}</span>
            </div>
          </div>

          <!-- VS-SI-GH -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|numeric|min_value:0'"
                v-model="form.vs_si_gh"
                label="VS-SI-GH *"
                name="vs_si_gh"
                data-vv-as="VS-SI-GH"
                id="VS-SI-GH"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('vs_si_gh')">{{ errors.first('vs_si_gh') }}</span>
            </div>
          </div>

          <!-- si_gh  -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|numeric|min_value:0'"
                v-model="form.si_gh"
                label="SI-GH *"
                name="si_gh"
                data-vv-as="SI-GH"
                id="SI-GH"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('si_gh')">{{ errors.first('si_gh') }}</span>
            </div>
          </div>

          <!-- SI2_I1_GH  -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|numeric|min_value:0'"
                v-model="form.si2_i1_gh"
                label="SI2-I1-GH *"
                name="si2_i1_gh"
                data-vv-as="SI2-I1-GH"
                id="SI2-I1-GH"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('si2_i1_gh')">{{ errors.first('si2_i1_gh') }}</span>
            </div>
          </div>

          <!-- VVS-SI-HI -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|numeric|min_value:0'"
                v-model="form.vvs_si_hi"
                label="VVS-SI-HI *"
                name="vvs_si_hi"
                data-vv-as="VVS-SI-HI"
                id="VVS-SI-HI"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('vvs_si_hi')">{{ errors.first('vvs_si_hi') }}</span>
            </div>
          </div>

          <!-- VS-SI-HI -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|numeric|min_value:0'"
                v-model="form.vs_si_hi"
                label="VS-SI-HI *"
                name="vs_si_hi"
                data-vv-as="VS-SI-HI"
                id="VS-SI-HI"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('vs_si_hi')">{{ errors.first('vs_si_hi') }}</span>
            </div>
          </div>

          <!-- VVS-EF -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|numeric|min_value:0'"
                v-model="form.vvs_ef"
                label="VVS-EF *"
                name="vvs_ef"
                data-vv-as="VVS-EF"
                id="VVS-EF"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('vvs_ef')">{{ errors.first('vvs_ef') }}</span>
            </div>
          </div>

          <!-- Retailer -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2" v-if="form.price_type === 'Retailer Price'">
              <label class="vs-input--label">Retailer *</label>
              <select-2
                multiple="true"
                class="w-full category-input"
                name="Retailer"
                placeholder="Select Retailer"
                :value="form.retailer"
                @input="(item) => (form.retailer = item && item.value)"
                autocomplete
                :ssr="true"
                v-validate="'required'"
                action="common/getRetailer"
              />
              <span class="text-danger text-sm" v-show="errors.has('Retailer')">{{ errors.first('Retailer') }}</span>
            </div>
          </div>

          <!-- User -->
          <!-- <div class="vx-row mb-2">
            <label class="vs-input--label">User *</label>
            <select-2
              multiple="true"
              class="w-full category-input"
              name="User"
              placeholder="Select User"
              :value="form.user"
              @input="(item) => (form.user = item && item.value)"
              autocomplete
              :ssr="true"
              v-validate="'required'"
              action="common/getUserDropdownList"
            />
            <span class="text-danger text-sm" v-show="errors.has('User')">{{ errors.first('User') }}</span>
          </div> -->
        </div>

        <!-- Save & Cancel Buttons -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-diamond-pricing" @click="save_changes" :disabled="!validateForm">{{ action_name }}</vs-button>
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
    },
    tabConfig: {
      type: String,
      default: 'Default'
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
        si_gh: null,
        si2_i1_gh: null,
        // vvs_si_hi: null,
        vs_si_hi: null,
        vvs_ef: null,
        price_type: this.tabConfig,
        retailer: []
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
          this.form.si_gh = newData.si_gh || null
          this.form.si2_i1_gh = newData.si2_i1_gh || null
          // this.form.vvs_si_hi = newData.vvs_si_hi || null
          this.form.vs_si_hi = newData.vs_si_hi || null
          this.form.vvs_ef = newData.vvs_ef || null
          this.form.price_type = newData.price_type || 'Default'
          this.form.retailer = newData.retailer ? (Array.isArray(newData.retailer) ? newData.retailer : [newData.retailer]) : []
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
    },
    tabConfig: {
      immediate: true,
      handler(newData) {
        this.form.price_type = newData
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
            si_gh: this.form.si_gh,
            si2_i1_gh: this.form.si2_i1_gh,
            // vvs_si_hi: this.form.vvs_si_hi,
            vs_si_hi: this.form.vs_si_hi,
            vvs_ef: this.form.vvs_ef,
            price_type: this.form.price_type,
            retailer: this.form.retailer
            // user: this.form.user
          }
        } else {
          data = {
            si_hi: this.form.si_hi,
            vs_si_gh: this.form.vs_si_gh,
            si_gh: this.form.si_gh,
            si2_i1_gh: this.form.si2_i1_gh,
            // vvs_si_hi: this.form.vvs_si_hi,
            vs_si_hi: this.form.vs_si_hi,
            vvs_ef: this.form.vvs_ef,
            price_type: this.form.price_type,
            retailer: this.form.retailer
            // user: this.form.user
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
        // vvs_si_hi: null,
        vs_si_hi: null,
        vvs_ef: null,
        price_type: this.tabConfig,
        retailer: []
        // user: []
      }
      this.$validator.reset()
    }
  }
}
</script>