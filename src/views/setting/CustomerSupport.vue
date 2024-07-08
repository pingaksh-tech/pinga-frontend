<template>
  <div class="vx-card p-6">
    <h3 class="px-4 mb-2">Customer Support</h3>
    <form method="POST" @submit.prevent="save_changes">
      <!-- email -->
      <div class="vx-col w-full px-8">
        <div class="vx-row mb-2">
          <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4|email'"
            v-model="form.email" label="Email *" name="email" id="email" data-vv-as="Email" />
          <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
      </div>
      <!-- phone -->
      <div class="vx-col w-full px-8">
        <div class="vx-row mb-2">
          <vs-input type="number" icon="icon icon-package" icon-pack="feather" class="w-full"
            v-validate="'required|numeric'" v-model="form.phone" label="Phone *" name="phone" id="phone"
            data-vv-as="Phone" />
          <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
        </div>
      </div>
      <!-- Save & Reset Button -->
      <div class="vx-row pt-5 px-5 text-center">
        <div class="vx-col w-full">
          <div class="items-center">
            <vs-button class="mr-2 vs-con-loading__container" id="create-customer-support" @click="save_changes"
              :disabled="!validateForm">Save</vs-button>
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  /** Page Name */
  name: `CustomerSupport`,

  /** data */
  data() {
    return {
      form: {
        email: null,
        phone: null,
      },
      type: 'Customer Care'
    }
  },

  /** Mounted */
  async mounted() {
    try {
      await this.getSetting({
        setting_name: this.type
      });
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

    if (this.settingRecord && this.settingRecord['Customer Care'] && this.settingRecord['Customer Care'].setting_value) {
      const { email, phone } = this.settingRecord['Customer Care'].setting_value
      this.form.email = email
      this.form.phone = phone
    }
  },

  /** computed */
  computed: {
    ...mapState('setting', ['settingRecord']),
    validateForm() {
      return !this.errors.any()
    },
  },

  /** methods */
  methods: {
    ...mapActions('setting', {
      getSetting: 'getSetting',
      updateCustomerSuppport: 'updateCustomerSuppport'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.updateCustomerSuppport(this.form)
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
  },
}
</script>
