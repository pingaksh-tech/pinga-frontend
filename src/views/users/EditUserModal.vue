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
                class="w-full role-input"
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
              <!-- <span class="text-danger text-sm" v-show="errors.has('Manager')">{{ errors.first('Manager') }}</span> -->
            </div>
          </div>
           <!-- Pan Number -->
          <div class="vx-col w-1/2 px-8">
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full"  v-model="form.pan_number" label="Pan Number" name="pan_number" id="pan_number" />
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
              <vs-input type="password" icon="icon icon-lock" icon-pack="feather" class="w-full" v-model="form.password" label="Password *" name="Password" id="Password" />
              <span class="text-danger text-sm" v-show="errors.has('Password')">{{ errors.first('Password') }}</span>
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
  name: 'AddCategory',

  /** Components */
  components: {
    Select2,Datepicker
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
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        email: this.data.email,
        phone: this.data.phone,
        role_id: this.data.role && this.data.role._id,
        password: '',
        manager: this.data.manager ? this.data.manager._id : null,
        gender:this.data.userInfo ? this.data.userInfo.gender : null,
        pan_number: this.data.userInfo ? this.data.userInfo.pan_number : null,
        bank_account_details: this.data.userInfo ? this.data.userInfo.bank_account_details : null,
        aadhar_number: this.data.userInfo ? this.data.userInfo.aadhar_number : null,
        marital_status: this.data.userInfo ? this.data.userInfo.marital_status : null,
        employee_id:this.data.userInfo ? this.data.userInfo.employee_id : null,
        designation:this.data.userInfo ? this.data.userInfo.designation : null,
        date_of_joining:this.data.userInfo ? this.data.userInfo.date_of_joining : null,
      },
      zIndex: 0,
      dropDownManagers: []
    }
  },

  /** Computed */
  computed: {
    /** Form Validation Manage */
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

  mounted() {
    this.getManagers(this.form.role_id)
  },

  /** methods */
  methods: {
    ...mapActions('user', {
      updateUserRecord: 'updateUserRecord',
      getManagers: 'getManagers'
    }),
    // reset form data
    resetForm() {
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
        if (!this.form.password) {
          delete this.form.password
        }
        const { message } = await this.updateUserRecord({
          UserId: this.data._id,
          data: this.form
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

  /** watch Loading Manage */
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#update_category_modal .vs-popup .vs-popup--content',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#update_category_modal .vs-popup .vs-popup--content > .con-vs-loading')
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
