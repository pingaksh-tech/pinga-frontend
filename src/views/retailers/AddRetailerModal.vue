<template>
  <div>
    <vs-popup :title="`Add ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <!-- Code -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" type="text" icon-pack="feather" class="w-full" v-model="form.code" label="Code" name="Code" id="Code" />
            </div>
          </div>
          <!-- First Name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.first_name" label="First Name" name="First Name" id="First Name" />
            </div>
          </div>
          <!-- Legal Name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.legal_name" label="Legal Name" name="Legal Name" id="Legal Name" />
            </div>
          </div>
          <!-- Manager -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Manager</label>
              <select-2
                class="w-1/2 role-input"
                name="Manager"
                placeholder="Select Manager"
                :value="form.manager"
                @input="(item) => (form.manager = item && item.value)"
                :autocomplete="true"
                :ssr="false"
                :multiple="false"
                :options="managers"
                :typeable="true"
                @search="debouncedHandleManagerSearch"
              />
            </div>
          </div>
          <!-- State Head -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">State Head</label>
              <select-2
                class="w-1/2 role-input"
                name="StateHead"
                placeholder="Select State Head"
                :value="form.state_head"
                @input="(item) => (form.state_head = item && item.value)"
                :autocomplete="true"
                :ssr="false"
                :multiple="false"
                :options="stateHeads"
                :typeable="true"
                @search="debouncedHandleStateHeadSearch"
              />
            </div>
          </div>
          <!-- Regional Sales Head -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Regional Sales Head</label>
              <select-2
                class="w-1/2 role-input"
                name="RegionalSalesHead"
                placeholder="Select Regional Sales Head"
                :value="form.regional_sales_head"
                @input="(item) => (form.regional_sales_head = item && item.value)"
                :autocomplete="true"
                :ssr="false"
                :multiple="false"
                :options="regionalSalesHeads"
                :typeable="true"
                @search="debouncedHandleRegionalSalesHeadSearch"
              />
            </div>
          </div>
          <!-- Other fields remain unchanged -->
          <!-- Phone -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                type="text"
                @input="form.phone = form.phone === '' ? '+91' : '+91' + form.phone.replace(/^\+91/, '').replace(/[^0-9]/g, '')"
                @clear="form.phone = '+91'"
                icon="icon icon-package"
                icon-pack="feather"
                class="w-full"
                v-model="form.phone"
                label="Phone"
                name="Phone"
                id="Phone"
              />
            </div>
          </div>
          <!-- Address -->
          <div class="vx-col w-1/2 mt-5">
            <div class="">
              <vs-textarea icon="icon icon-package" icon-pack="feather" v-model="form.address" label="Address" name="Address" id="Address" />
            </div>
          </div>
          <!-- Zip Code -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.zip_code" label="Zip Code" name="Zip Code" id="zip_code" />
            </div>
          </div>
          <!-- City -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.city" label="City" name="City" id="City" />
            </div>
          </div>
          <!-- State -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.state" label="State" name="State" id="State" />
            </div>
          </div>
          <!-- Country -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.country" label="Country" name="Country" id="Country" />
            </div>
          </div>
          <!-- Last Name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.last_name" label="Last Name" name="Last Name" id="Last Name" />
            </div>
          </div>
          <!-- Date of Birth -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Date of Birth</label>
              <datepicker class="w-full" v-model="form.birth_date" :input-class="'vs-inputx vs-input--input normal'" placeholder="Select Date of Birth" name="birth_date"></datepicker>
            </div>
          </div>
          <!-- Date of Anniversary -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Date of Anniversary</label>
              <datepicker
                class="w-full"
                v-model="form.anniversary_date"
                :input-class="'vs-inputx vs-input--input normal'"
                placeholder="Select Date of Anniversary"
                name="anniversary_date"
              ></datepicker>
            </div>
          </div>
          <!-- Business Name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.business_name" label="Business Name" name="Business Name" id="Business Name" />
            </div>
          </div>
          <!-- Email -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.email" label="Email" name="Email" id="Email" />
            </div>
          </div>
          <!-- Website -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.website" label="Website" name="Website" id="Website" />
            </div>
          </div>
          <!-- WhatsApp Number -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.whatsapp_number" label="WhatsApp Number" name="whatsapp_number" id="whatsapp_number" />
            </div>
          </div>
          <!-- Landline -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.landline" label="Landline (with area code)" name="Landline" id="Landline" />
            </div>
          </div>
        </div>
        <!-- Send SMS -->
        <div class="vx-col w-1/2 px-8">
          <div class="vx-row mb-2">
            <vs-checkbox v-model="form.send_sms" name="send_sms" id="send_sms"> Send SMS </vs-checkbox>
          </div>
        </div>
        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-category" @click="save_changes">Add</vs-button>
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
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'AddCategory',
  components: {
    Select2,
    Datepicker
  },
  props: {
    showModal: Boolean,
    module_name: String
  },
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        business_name: '',
        email: '',
        phone: '+91',
        code: '',
        landline: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        send_sms: false,
        website: '',
        anniversary_date: '',
        birth_date: '',
        manager: '',
        whatsapp_number: '',
        legal_name: '',
        state_head: '',
        regional_sales_head: ''
      },
      debounceTimeout: null
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('user', ['managers', 'stateHeads', 'regionalSalesHeads']),
    isActive: {
      get() {
        return this.showModal
      },
      set(val) {
        this.$emit('update:showModal', val)
      }
    }
  },
  methods: {
    ...mapActions('retailer', {
      createRetailer: 'createRetailer'
    }),
    ...mapActions('user', {
      getManagerList: 'getManagers',
      getStateHeadList: 'getStateHeads',
      getRegionalSalesHeadList: 'getRegionalSalesHeads'
    }),
    async handleManagerSearch(searchValue) {
      try {
        const res = await this.getManagerList({
          roleId: '6847b9542a3c54aa35ce4b7b',
          searchValue: searchValue,
          type: 'Retailer'
        })
        return res
      } catch (error) {
        console.error('Failed to fetch manager list:', error)
        throw error
      }
    },
    debouncedHandleManagerSearch(searchValue) {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(async () => {
        try {
          await this.handleManagerSearch(searchValue)
        } catch (error) {
          // Error is already logged in handleManagerSearch
        }
      }, 500) // Reduced debounce time for better UX
    },
    async handleStateHeadSearch(searchValue) {
      try {
        const res = await this.getStateHeadList({
          roleId: 'STATE_HEAD_ROLE_ID', // Replace with actual role ID
          searchValue: searchValue
        })
        return res
      } catch (error) {
        console.error('Failed to fetch state head list:', error)
        throw error
      }
    },
    debouncedHandleStateHeadSearch(searchValue) {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(async () => {
        try {
          await this.handleStateHeadSearch(searchValue)
        } catch (error) {
          // Error is already logged in handleStateHeadSearch
        }
      }, 500)
    },
    async handleRegionalSalesHeadSearch(searchValue) {
      try {
        const res = await this.getRegionalSalesHeadList({
          roleId: 'REGIONAL_SALES_HEAD_ROLE_ID', // Replace with actual role ID
          searchValue: searchValue
        })
        return res
      } catch (error) {
        console.error('Failed to fetch regional sales head list:', error)
        throw error
      }
    },
    debouncedHandleRegionalSalesHeadSearch(searchValue) {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(async () => {
        try {
          await this.handleRegionalSalesHeadSearch(searchValue)
        } catch (error) {
          // Error is already logged in handleRegionalSalesHeadSearch
        }
      }, 500)
    },
    async getData() {
      try {
        const [managers, stateHeads, regionalSalesHeads] = await Promise.all([
          this.getManagerList({ roleId: '6847b9542a3c54aa35ce4b7b', searchValue: '', type: 'Retailer' }),
          this.getStateHeadList({ roleId: 'STATE_HEAD_ROLE_ID', searchValue: '' }),
          this.getRegionalSalesHeadList({ roleId: 'REGIONAL_SALES_HEAD_ROLE_ID', searchValue: '' })
        ])
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    },
    async save_changes() {
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
  }
}
</script>
