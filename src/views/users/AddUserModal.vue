span
<template>
  <div>
    <!-- Add User popup -->
    <vs-popup :title="`Add ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <!-- first_name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.first_name" label="First Name *" name="First Name" id="First Name" />
              <span class="text-danger text-sm" v-show="errors.has('First Name')">{{ errors.first('First Name') }}</span>
            </div>
          </div>
          <!-- last_name -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.last_name" label="Last Name *" name="Last Name" id="Last Name" />
              <span class="text-danger text-sm" v-show="errors.has('Last Name')">{{ errors.first('Last Name') }}</span>
            </div>
          </div>
          <!-- date of joining -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Date of joining</label>
              <datepicker
                class="w-full"
                v-model="form.date_of_joining"
                :input-class="'vs-inputx vs-input--input normal'"
                placeholder="Select Date"
                name="date_of_joining"
              ></datepicker>
            </div>
          </div>
          <!-- gender -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Gender</label>
              <select-2
                class="w-full role-input"
                name="MaterialStatus"
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
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.email" label="Email *" name="Email" id="Email" />
              <span class="text-danger text-sm" v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
            </div>
          </div>
          <!-- phone -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.phone" label="Phone *" name="Phone" id="Phone" />
              <span class="text-danger text-sm" v-show="errors.has('Phone')">{{ errors.first('Phone') }}</span>
            </div>
          </div>
          <!-- Role -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Role *</label>
              <select-2
                class="w-1/2 role-input"
                name="Role"
                placeholder="Select Role"
                :value="form.role_id"
                @input="(item) => (form.role_id = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                v-validate="'required'"
                action="common/getRoles"
              />
              <span class="text-danger text-sm" v-show="errors.has('Role')">{{ errors.first('Role') }}</span>
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
                autocomplete
                :ssr="true"
                :multiple="false"
                :options="this.dropDownManagers"
              />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Manager')">{{ errors.first('Manager') }}</span> -->
            </div>
          </div>

          <!-- Pan Number -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-credit-card" icon-pack="feather" class="w-full" v-model="form.pan_number" label="PAN Number" name="pan_number" id="pan_number" />
            </div>
          </div>
          <!-- adhaar card -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-credit-card" icon-pack="feather" class="w-full" v-model="form.aadhar_number" label="Aadhar Number" name="aadhar_number" id="aadhar_number" />
            </div>
          </div>
          <!-- Bank account details -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
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
          <!-- Material status  -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <label class="vs-input--label">Material Status</label>
              <select-2
                class="w-full role-input"
                name="MaterialStatus"
                placeholder="Select Material Status"
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
          <!-- employee Id -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-credit-card" icon-pack="feather" class="w-full" v-model="form.employee_id" label="Employee Id" name="employee_id" id="employee_id" />
            </div>
          </div>

          <!-- password -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input
                type="password"
                icon="icon icon-lock"
                icon-pack="feather"
                class="w-full"
                v-model="form.password"
                label="Password"
                name="Password"
                id="Password"
              />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Password')">{{ errors.first('Password') }}</span> -->
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
        email: '',
        phone: '',
        role_id: '',
        password: '',
        manager: '',
        pan_number: '',
        bank_account_details: '',
        aadhar_number: '',
        marital_status: '',
        employee_id:"",
        designation:"",
        gender:"",
        date_of_joining:""
      },
      zIndex: 0,
      dropDownManagers: []
    }
  },
  /** Mounted */

  /** computed */
  computed: {
    ...mapState('user', ['createLoading', 'managers']),
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
    ...mapActions('user', {
      createUser: 'createUser',
      getManagers: 'getManagers'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.createUser(this.form)
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
    'form.role_id'(newVal) {
      // whenever the value of the form.role_id change that time this function will be called.
      if (newVal) {
        this.getManagers(newVal)
      }
    },
    managers(managersArray) {
      this.dropDownManagers = managersArray
    }
  }
}
</script>
