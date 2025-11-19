<template>
  <div>
    <!-- Update Category popup -->
    <vs-popup id="update_category_modal" class="vs-con-loading__container" :title="`Update ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <!-- Form -->
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <!-- first_name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required'" v-model="form.first_name" label="First Name *" name="First Name" id="First Name" />
              <span class="text-danger text-sm" v-show="errors.has('First Name')">{{ errors.first('First Name') }}</span>
            </div>
          </div>
          <!-- last_name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required'" v-model="form.last_name" label="Last Name *" name="Last Name" id="Last Name" />
              <span class="text-danger text-sm" v-show="errors.has('Last Name')">{{ errors.first('Last Name') }}</span>
            </div>
          </div>
          <!-- date of joining -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Date of joining</label>
              <datepicker class="w-full" v-model="form.date_of_joining" :input-class="'vs-inputx vs-input--input normal'" placeholder="Select Date" name="date_of_joining"></datepicker>
            </div>
          </div>
          <!-- gender -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Gender</label>
              <select-2
                class="w-full role-input"
                name="Gender"
                placeholder="Gender"
                :value="form.gender"
                @input="(item) => (form.gender = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                :options="[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' }
                ]"
              />
            </div>
          </div>
          <!-- email -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|email'" v-model="form.email" label="Email *" name="Email" id="Email" />
              <span class="text-danger text-sm" v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
            </div>
          </div>
          <!-- phone -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                type="text"
                @input="form.phone = form.phone === '' ? '+91' : '+91' + form.phone.replace(/^\+91/, '').replace(/[^0-9]/g, '')"
                @clear="form.phone = '+91'"
                icon="icon icon-package"
                placeholder="Enter number e.g., 9999900000"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|min:10'"
                v-model="form.phone"
                label="Phone *"
                name="Phone"
                id="Phone"
              />
              <span class="text-danger text-sm" v-show="errors.has('Phone')">{{ errors.first('Phone') }}</span>
            </div>
          </div>
          <!-- Role -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Role *</label>
              <select-2
                class="w-full role-input"
                name="Role"
                placeholder="Select Role"
                :value="form.role_id"
                @input="handleRoleChange"
                autocomplete
                :ssr="true"
                :multiple="false"
                v-validate="'required'"
                action="common/getRoles"
              />
              <span class="text-danger text-sm" v-show="errors.has('Role')">{{ errors.first('Role') }}</span>
            </div>
          </div>
          <!-- Retailer (shown only when role is Retailer) -->
          <div class="vx-col w-1/2 px-8" v-if="isRetailerRole">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Retailer *</label>
              <select-2
                class="w-full category-input"
                name="Retailer"
                placeholder="Select Retailer"
                :value="form.retailer"
                @input="(item) => (form.retailer = item && item.value ? item.value : [])"
                autocomplete
                :ssr="true"
                :multiple="false"
                v-validate="'required'"
                action="common/getRetailer"
              />
              <span class="text-danger text-sm" v-show="errors.has('Retailer')">{{ errors.first('Retailer') }}</span>
            </div>
          </div>
          <!-- Manager -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Manager</label>
              <select-2
                class="w-full role-input"
                name="Manager"
                placeholder="Select Manager"
                :value="form.manager"
                @input="(item) => (form.manager = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                :options="this.dropDownManagers"
              />
            </div>
          </div>
          <!-- Pan Number -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.pan_number" label="Pan Number" name="pan_number" id="pan_number" />
            </div>
          </div>
          <!-- Aadhar card -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-credit-card" type="number" icon-pack="feather" class="w-full" v-model="form.aadhar_number" label="Aadhar Number" name="aadhar_number" id="aadhar_number" />
            </div>
          </div>
          <!-- Bank account details -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                type="number"
                icon="icon icon-credit-card"
                icon-pack="feather"
                class="w-full"
                v-model="form.bank_account_details"
                label="Bank Account Details"
                name="bank_account_details"
                id="bank_account_details"
              />
            </div>
          </div>
          <!-- Marital status -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Marital Status</label>
              <select-2
                class="w-full role-input"
                name="MaritalStatus"
                placeholder="Select Marital Status"
                :value="form.marital_status"
                @input="(item) => (form.marital_status = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                :options="[
                  { label: 'Married', value: 'married' },
                  { label: 'Unmarried', value: 'unmarried' }
                ]"
              />
            </div>
          </div>
          <!-- Designation -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-credit-card" icon-pack="feather" class="w-full" v-model="form.designation" label="Designation" name="designation" id="designation" />
            </div>
          </div>
          <!-- Employee Id -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-credit-card" icon-pack="feather" class="w-full" v-model="form.employee_id" label="Employee Id" name="employee_id" id="employee_id" />
            </div>
          </div>
          <!-- Password -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input type="password" icon="icon icon-lock" icon-pack="feather" class="w-full" v-model="form.password" label="Password" name="Password" id="Password" />
            </div>
          </div>
        </div>
        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-category" @click="save_changes" :disabled="!validateForm">Update</vs-button>
              <vs-button color="danger" class="text-left" @click="isActive = false">Cancel</vs-button>
            </div>
          </div>
        </div>
      </form>
      <!-- End Form -->
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'EditCategory',

  /** Components */
  components: {
    Select2,
    Datepicker
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
      form: {
        first_name: this.data.first_name || '',
        last_name: this.data.last_name || '',
        email: this.data.email || '',
        phone: this.data.phone || '+91',
        role_id: (this.data.role && this.data.role._id) || '',
        role_name: (this.data.role && this.data.role.name) || '',
        retailer: this.data.retailer || [],
        password: '',
        manager: this.data.manager ? this.data.manager._id : null,
        gender: this.data.userInfo ? this.data.userInfo.gender : null,
        pan_number: this.data.userInfo ? this.data.userInfo.pan_number : null,
        bank_account_details: this.data.userInfo ? this.data.userInfo.bank_account_details : null,
        aadhar_number: this.data.userInfo ? this.data.userInfo.aadhar_number : null,
        marital_status: this.data.userInfo ? this.data.userInfo.marital_status : null,
        employee_id: this.data.userInfo ? this.data.userInfo.employee_id : null,
        designation: this.data.userInfo ? this.data.userInfo.designation : null,
        date_of_joining: this.data.userInfo ? this.data.userInfo.date_of_joining : null
      },
      zIndex: 0,
      dropDownManagers: [],
      isRetailerRole: this.data.role && this.data.role.name === 'Retailer'
    }
  },

  /** Computed */
  computed: {
    ...mapState('user', ['createLoading', 'managers']),
    validateForm() {
      // Ensure retailer is validated only when role is Retailer
      if (this.isRetailerRole) {
        return !this.errors.any() && this.form.retailer.length > 0
      }
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

  mounted() {
    if (this.form.role_id) {
      this.getManagers({ roleId: this.form.role_id })
    }
  },

  /** Methods */
  methods: {
    ...mapActions('user', {
      updateUserRecord: 'updateUserRecord',
      getManagers: 'getManagers'
    }),
    handleRoleChange(item) {
      this.form.role_id = item && item.value ? item.value : ''
      this.form.role_name = item && item.label ? item.label : ''
      this.isRetailerRole = this.form.role_name === 'Retailer'
      // Clear retailer selection when role is not Retailer
      if (!this.isRetailerRole) {
        this.form.retailer = []
      }
    },
    resetForm() {
      this.$nextTick(() => {
        this.errors.clear()
        this.$validator.reset()
      })
    },
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        if (!this.form.password) {
          delete this.form.password
        }
        // Create payload, exclude role_name and include retailer only if role is Retailer
        const { role_name, ...payload } = this.form
        if (!this.isRetailerRole) {
          delete payload.retailer
        }
        const { message } = await this.updateUserRecord({
          UserId: this.data._id,
          data: payload
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

  /** Watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#update_category_modal .vs-popup .vs-popup--content',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#update_category_modal .vs-popup .vs-popup--content > .con-vs-loading')
      }
    },
    'form.role_id'(newVal) {
      if (newVal) {
        this.getManagers({ roleId: newVal })
      }
    },
    managers(managersArray) {
      this.dropDownManagers = managersArray
    }
  }
}
</script>
