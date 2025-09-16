<template>
  <div>
    <!-- Diamond Pricing popup -->
    <vs-popup :title="`${action_name} ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <!-- Diamond shape -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Diamond shapes</label>
              <select-2
                multiple="true"
                class="w-full category-input"
                name="Shape"
                placeholder="Select Diamond Shapes"
                :value="form.shape"
                @input="(item) => (form.shape = item && item.value ? item.value : [])"
                autocomplete
                :ssr="true"
                :options="[
                  { label: 'Round', value: 'Round' },
                  { label: 'Princess', value: 'Princess' },
                  { label: 'Emerald', value: 'Emerald' },
                  { label: 'Oval', value: 'Oval' },
                  { label: 'Marquise', value: 'Marquise' },
                  { label: 'Radiant', value: 'Radiant' },
                  { label: 'Pear', value: 'Pear' },
                  { label: 'Cushion', value: 'Cushion' },
                  { label: 'Heart', value: 'Heart' }
                ]"
                v-validate="'required'"
              />
              <span class="text-danger text-sm" v-show="errors.has('Shape')">{{ errors.first('Shape') }}</span>
            </div>
          </div>

          <!-- weight range min -->
          <div class="vx-col w-1/2 px-8" v-if="form.shape && form.shape.length && ['Pear', 'Marquise', 'Oval'].some((shape) => form.shape.includes(shape))">
            <div class="vx-row mb-2">
              <vs-input
                v-validate="'required|min:1'"
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-model="form.weight_range_min"
                label="Weight Range Minimum *"
                name="weight_range_min"
                data-vv-as="Weight Range Minimum"
                id="weight_range_min"
                type="number"
              />
              <span class="text-danger text-sm" v-show="errors.has('weight_range_min')">{{ errors.first('weight_range_min') }}</span>
            </div>
          </div>

          <!-- weight range max -->
          <div class="vx-col w-1/2 px-8" v-if="form.shape && form.shape.length && ['Pear', 'Marquise', 'Oval'].some((shape) => form.shape.includes(shape))">
            <div class="vx-row mb-2">
              <vs-input
                v-validate="'required|min:1'"
                type="number"
                icon="icon-package"
                icon-pack="feather"
                class="w-full"
                v-model="form.weight_range_max"
                label="Weight Range Maximum *"
                name="weight_range_max"
                data-vv-as="Weight Range Maximum"
                id="weight_range_max"
              />
              <span class="text-danger text-sm" v-show="errors.has('weight_range_max')">{{ errors.first('weight_range_max') }}</span>
            </div>
          </div>

          <!-- Retailer -->
          <div class="vx-col w-1/2 px-8" v-if="form.price_type === 'Retailer Price'">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Retailer *</label>
              <select-2
                multiple="true"
                class="w-full category-input"
                name="Retailer"
                placeholder="Select Retailer"
                :value="form.retailer"
                @input="(item) => (form.retailer = item && item.value ? item.value : [])"
                autocomplete
                :ssr="true"
                v-validate="'required'"
                action="common/getRetailer"
              />
              <span class="text-danger text-sm" v-show="errors.has('Retailer')">{{ errors.first('Retailer') }}</span>
            </div>
          </div>

          <!-- Slieve Size -->
          <div v-if="form.shape && form.shape.length && ['Round', 'Princess', 'Emerald', 'Radiant', 'Cushion', 'Heart'].some((shape) => form.shape.includes(shape))" class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
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
          <div class="vx-col w-1/2 px-8" v-if="form.shape && form.shape.length && ['Round', 'Princess', 'Emerald', 'Radiant', 'Cushion', 'Heart'].some((shape) => form.shape.includes(shape))">
            <div class="vx-row mb-2">
              <vs-input
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
          <div class="vx-col w-1/2 px-8" v-if="form.shape && form.shape.length && ['Round', 'Princess', 'Emerald', 'Radiant', 'Cushion', 'Heart'].some((shape) => form.shape.includes(shape))">
            <div class="vx-row mb-2">
              <vs-input
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
          <div class="vx-col w-1/2 px-8" v-if="form.shape && form.shape.length && ['Round', 'Princess', 'Emerald', 'Radiant', 'Cushion', 'Heart'].some((shape) => form.shape.includes(shape))">
            <div class="vx-row mb-2">
              <vs-input
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

          <div class="w-full px-4">
            <vs-button @click="addClarity" class="mb-4 mt-2">Add diamond clarity</vs-button>
            <div class="retailer-container px-4">
              <div v-for="(item, index) in form.clarity" :key="'retailer-' + index" class="retailer-entry vx-row border-sky-500 border">
                <div class="flex items-center mt-2">
                  <h4>{{ index + 1 }}</h4>
                </div>
                <div class="vx-col mb-2">
                  <label class="vs-input--label">Diamond Clarity *</label>
                  <select-2
                    class="w-full category-input"
                    :name="'diamond_clarity_' + index"
                    v-validate="'required'"
                    placeholder="Select Diamond Clarity"
                    :options="DiamondClarityList"
                    :ssr="false"
                    :multiple="false"
                    :value="form.clarity[index].diamond_clarity"
                    data-vv-as="Diamond Clarity"
                    @input="(item) => handleClarityChange(index, item)"
                  />
                  <span class="text-danger text-xs" v-show="errors.has(`diamond_clarity_${index}`)">{{ errors.first(`diamond_clarity_${index}`) }}</span>
                </div>
                <div class="vx-col mb-2">
                  <vs-input type="number" v-model="form.clarity[index].price" label="Price *" :name="'price_' + index" v-validate="'required|numeric|min_value:0'" data-vv-as="Price" />
                  <span class="text-danger text-xs" v-show="errors.has(`price_${index}`)">{{ errors.first(`price_${index}`) }}</span>
                </div>
                <div class="vx-col mb-2 flex items-center">
                  <vs-button color="danger" type="flat" icon-pack="feather" icon="icon-trash" @click="deleteClarity(index)" :disabled="form.clarity.length <= 1"></vs-button>
                </div>
              </div>
            </div>
          </div>
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
    },
    clarityData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        diamond_slieve_size: null,
        slieve_size_range: null,
        carat: null,
        mm_size: null,
        price_type: this.tabConfig,
        retailer: [],
        clarity: [],
        shape: [],
        weight_range_min: null,
        weight_range_max: null
      },
      zIndex: 0,
      includeShapes: ['Pear', 'Oval', 'Marquise'],
      excludeShapes: ['Radiant', 'Emerald', 'Princess', 'Round']
    }
  },
  computed: {
    ...mapState('diamondPricing', ['createLoading']),
    ...mapState('common', ['DiamondClarityList']),
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
        console.log(newData, 'newData.........')
        if (newData) {
          this.form.diamond_slieve_size = newData.diamond_slieve_size || null
          this.form.slieve_size_range = newData.slieve_size_range || null
          this.form.carat = newData.carat || null
          this.form.mm_size = newData.mm_size || null
          this.form.price_type = newData.price_type || 'Default'
          this.form.retailer = newData.retailer ? (Array.isArray(newData.retailer) ? newData.retailer.map((r) => r._id) : [newData.retailer._id]) : []
          this.form.clarity = newData.clarity
            ? newData.clarity.map((item) => ({
                diamond_clarity: item.diamond_clarity || '',
                price: item.price || null
              }))
            : []
          this.form.shape = Array.isArray(newData.shape) ? newData.shape : []
          this.form.weight_range_min = newData.weight_range ? newData.weight_range.min || null : null
          this.form.weight_range_max = newData.weight_range ? newData.weight_range.max || null : null
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
    ...mapActions('diamondPricing', ['createDiamondPricing', 'updateDiamondPricing']),
    ...mapActions('common', ['getDiamondClarityDropdown']),
    async save_changes() {
      if (this.form.clarity.length === 0) {
        this.$vs.notify({
          title: 'Error',
          text: 'At least one diamond clarity entry is required.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'danger'
        })
        return false
      }

      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        let data
        if (this.action_name === 'Add') {
          if (this.includeShapes.some((shape) => this.form.shape.includes(shape)) && !this.excludeShapes.some((shape) => this.form.shape.includes(shape))) {
            data = {
              clarity: this.form.clarity,
              shape: this.form.shape,
              weight_range: {
                min: this.form.weight_range_min,
                max: this.form.weight_range_max
              },
              price_type: this.form.price_type
            }
          } else {
            data = {
              diamond_slieve_size: this.form.diamond_slieve_size,
              slieve_size_range: this.form.slieve_size_range,
              carat: this.form.carat,
              mm_size: this.form.mm_size,
              price_type: this.form.price_type,
              retailer: this.form.retailer,
              clarity: this.form.clarity,
              shape: this.form.shape
            }
          }
        } else {
          if (this.includeShapes.some((shape) => this.form.shape.includes(shape)) && !this.excludeShapes.some((shape) => this.form.shape.includes(shape))) {
            data = {
              clarity: this.form.clarity,
              shape: this.form.shape,
              weight_range: {
                min: this.form.weight_range_min,
                max: this.form.weight_range_max
              },
              price_type: this.form.price_type
            }
          } else {
            data = {
              diamond_slieve_size: this.form.diamond_slieve_size,
              slieve_size_range: this.form.slieve_size_range,
              carat: this.form.carat,
              mm_size: this.form.mm_size,
              price_type: this.form.price_type,
              retailer: this.form.retailer,
              clarity: this.form.clarity,
              shape: this.form.shape
            }
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
        price_type: this.tabConfig,
        retailer: [],
        clarity: [],
        shape: [],
        weight_range_min: null,
        weight_range_max: null
      }
      this.$validator.reset()
    },
    addClarity() {
      this.form.clarity.push({
        diamond_clarity: '',
        price: null
      })
    },
    deleteClarity(index) {
      this.form.clarity.splice(index, 1)
      this.$validator.reset()
    },
    handleClarityChange(index, item) {
      const selectedClarity = item && item.value
      const existingClarity = this.form.clarity.some((clarity, i) => i !== index && clarity.diamond_clarity === selectedClarity)

      if (existingClarity) {
        this.$vs.notify({
          title: 'Error',
          text: 'This diamond clarity is already selected. Please choose a different clarity.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'danger'
        })
        this.form.clarity[index].diamond_clarity = ''
      } else {
        this.form.clarity[index].diamond_clarity = selectedClarity
      }
    },
    getClarityData() {
      this.getDiamondClarityDropdown()
    }
  },
  mounted() {
    this.getClarityData()
  }
}
</script>