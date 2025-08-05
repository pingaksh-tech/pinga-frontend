<template>
  <div>
    <!-- Add Retailer popup -->
    <vs-popup :title="`Add ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <!-- first_name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full"  v-model="form.first_name" label="First Name" name="First Name" id="First Name" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('First Name')">{{ errors.first('First Name') }}</span> -->
            </div>
          </div>
          <!-- last_name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full"  v-model="form.last_name" label="Last Name" name="Last Name" id="Last Name" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Last Name')">{{ errors.first('Last Name') }}</span> -->
            </div>
          </div>
          <!-- date of birth -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Date of birth</label>
              <datepicker class="w-full" v-model="form.birth_date" :input-class="'vs-inputx vs-input--input normal'" placeholder="Select Date of Birth" name="birth_date"></datepicker>
            </div>
          </div>
          <!-- date of anniversary -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Date of anniversary</label>
              <datepicker
                class="w-full"
                v-model="form.anniversary_date"
                :input-class="'vs-inputx vs-input--input normal'"
                placeholder="Select Date of Anniversary"
                name="anniversary_date"
              ></datepicker>
            </div>
          </div>
          <!-- business_name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-package"
                icon-pack="feather"
                class="w-full"
                v-model="form.business_name"
                label="Business Name"
                name="Business Name"
                id="Business Name"
              />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Business Name')">{{ errors.first('Business Name') }}</span> -->
            </div>
          </div>
          <!-- Legal name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.legal_name" label="Legal  Name" name="Legal Name" id="Legal Name" />
            </div>
          </div>
          <!-- email -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.email" label="Email" name="Email" id="Email" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Email')">{{ errors.first('Email') }}</span> -->
            </div>
          </div>
          <!-- website -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.website" label="Website" name="Website" id="Website" />
            </div>
          </div>
           <!--  code -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" type='text' icon-pack="feather" class="w-full" v-model="form.code" label="Code" name="Code" id="Code" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Code')">{{ errors.first('Code') }}</span> -->
            </div>
          </div>
          <!-- phone -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input type="text"  @input="form.phone = form.phone === '' ? '+91' : '+91' + form.phone .replace(/^\+91/, '') .replace(/[^0-9]/g, '')" @clear="form.phone = '+91'" icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.phone" label="Phone" name="Phone" id="Phone" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Phone')">{{ errors.first('Phone') }}</span> -->
            </div>
          </div>
          <!-- whatsapp_number -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.whatsapp_number" label="Whatsapp Number" name="whatsapp_number" id="whatsapp_number" />
            </div>
          </div>
          <!-- landline -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.landline" label="Landline (with area code)" name="Landline" id="Landline" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Landline')">{{ errors.first('Landline') }}</span> -->
            </div>
          </div>
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Manager</label>
              <select-2
                class="w-1/2 role-input"
                name="Manager"
                placeholder="Select Manager"
                :value="form.manager"
                @input="(item) => (form.manager = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                :options="this.dropDownManagers"
                
              />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Manager')">{{ errors.first('Manager') }}</span> -->
            </div>
          </div>
          <!-- country  -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.country" label="Country" name="Country" id="Country" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Country')">{{ errors.first('Country') }}</span> -->
            </div>
          </div>
          <!-- state -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input  icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.state" label="State" name="State" id="State" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('State')">{{ errors.first('State') }}</span> -->
            </div>
          </div>
          <!-- city -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.city" label="City" name="City" id="City" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('City')">{{ errors.first('City') }}</span> -->
            </div>
          </div>
          <!-- street   -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.street" label="Street" name="Street" id="Street" />
            </div>
          </div>
          <!-- zip_code -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.zip_code" label="Zip Code" name="Zip Code" id="zip_code" />
            </div>
          </div>
          <!-- address -->
          <div class="vx-col w-1/2 mt-5">
            <div class="">
              <vs-textarea icon="icon icon-package" icon-pack="feather" v-model="form.address" label="Address" name="Address" id="Address" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Address')">{{ errors.first('Address') }}</span> -->
            </div>
          </div>
        </div>
        <!-- Send sms -->
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
  /** Page Name */
  name: 'AddCategory',

  /** components */
  components: {
    Select2,
    Datepicker
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
        phone: '+91',
        code: '',
        landline: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        send_sms: '',
        website: '',
        street: '',
        anniversary_date: '',
        birth_date: '',
        manager: '',
        whatsapp_number: '',
        legal_name: ''
      },
      zIndex: 0,
      dropDownManagers: []
    }
  },
  /** Mounted */
  mounted() {
    console.log('Fasdfasdf............')
    this.getData()
  },

  /** computed */
  computed: {
    ...mapState('retailer', ['createLoading']),
    ...mapState('user', ['createLoading', 'managers']),
    // validateForm() {
    //   return !this.errors.any()
    // },
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
    ...mapActions('user', {
      getManagerList: 'getManagers'
    }),
    async getData() {
      try {
        const res = await this.getManagerList('6847b9542a3c54aa35ce4b7b')
        console.log('Manager list fetched in component:', res)
      } catch (error) {
        console.error('Failed to fetch manager list:', error)
      }
    },
    ...mapState('user', { getManagers: 'managers' }),
    async save_changes() {
     // if (!(await this.$validator.validate())) {
     // return false
     //}
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
    },
    managers(managersArray) {
      this.dropDownManagers = managersArray
    }
  }
}
</script>
