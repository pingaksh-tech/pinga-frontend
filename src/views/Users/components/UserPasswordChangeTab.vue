  <template>
  <div id="user-edit-tab-info">
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2">
        <!-- Col Header -->
        <!-- <div class="flex items-end mb-5">
          <feather-icon icon="LockIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Change Password</span>
        </div> -->

        <!-- Col Content -->
        <div class="mb-3">
          <label for="Current Password" class="text-xs">Current Password</label>
          <vx-input-group class="w-full">
            <vs-input
              placeholder="Enter Current Password"
              v-validate="'required'"
              :type="!form.showOldPassword && 'password'"
              name="Current Password"
              icon-no-border
              icon="icon icon-lock"
              icon-pack="feather"
              v-model="form.old_password"
              class="w-full"
            />
            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button icon-pack="feather" :icon="form.showOldPassword ? 'icon icon-eye' : 'icon icon-eye-off'" @click="form.showOldPassword = !form.showOldPassword" />
              </div>
            </template>
          </vx-input-group>

          <span class="text-danger text-sm" v-show="errors.has('Current Password')">{{ errors.first('Current Password') }}</span>
        </div>
        <div class="mb-3">
          <label for="New Password" class="text-xs">New Password</label>
          <vx-input-group class="w-full">
            <vs-input
              placeholder="Enter New Password"
              v-validate="'required|min:4|max:4'"
              :type="!form.showNewPassword && 'password'"
              name="New Password"
              icon-no-border
              icon="icon icon-lock"
              icon-pack="feather"
              v-model="form.new_password"
              class="w-full"
            />
            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button icon-pack="feather" :icon="form.showNewPassword ? 'icon icon-eye' : 'icon icon-eye-off'" @click="form.showNewPassword = !form.showNewPassword" />
              </div>
            </template>
          </vx-input-group>

          <span class="text-danger text-sm" v-show="errors.has('New Password')">{{ errors.first('New Password') }}</span>
        </div>
        <div class="mb-3">
          <label for="Confirm Password" class="text-xs">Confirm Password</label>
          <vx-input-group class="w-full">
            <vs-input
              placeholder="Enter Confirm Password"
              v-validate="'required|min:4|max:4'"
              :type="!form.showConfirmPassword && 'password'"
              name="Confirm Password"
              icon-no-border
              icon="icon icon-lock"
              icon-pack="feather"
              v-model="form.confirm_password"
              class="w-full"
            />
            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button icon-pack="feather" :icon="form.showConfirmPassword ? 'icon icon-eye' : 'icon icon-eye-off'" @click="form.showConfirmPassword = !form.showConfirmPassword" />
              </div>
            </template>
          </vx-input-group>
          <span class="text-danger text-sm" v-show="errors.has('Confirm Password')">{{ errors.first('Confirm Password') }}</span>
        </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div>
          <vs-button class="ml-auto mt-2 vs-con-loading__container" id="change-password-button" type="filled" @click="save_changes" :disabled="!validateForm || processing">Save Password</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Form Data
  data() {
    return {
      form: {
        old_password: '',
        new_password: '',
        confirm_password: '',
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
      },
      processing: false
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  /* Form Validate */
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  mounted() {},
  /* API Calling Function */
  methods: {
    async save_changes() {
      if (!(await this.$validator.validate())) {
        this.$vs.notify({
          title: 'Error',
          text: 'Please Fill The Form',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
position: 'top-center',
time:5000,
          color: 'danger'
        })
        return
      }
      this.processing = true
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#change-password-button',
        scale: 0.45
      })
      try {
        const { message } = await this.$store.dispatch('auth/changePassword', this.form)
        // Routing for login

        // For Login user accesoken remove
        setTimeout(() => {
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
position: 'top-center',
time:5000,
            color: 'success'
          })
        }, 2000)
        //clear the form
        delete this.form.new_password
        delete this.form.old_password
        delete this.form.confirm_password

        this.errors.clear()
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
position: 'top-center',
time:5000,
          color: 'danger'
        })
      }
      this.processing = false
      this.$vs.loading.close('#change-password-button > .con-vs-loading')
    }
  }
}
</script>