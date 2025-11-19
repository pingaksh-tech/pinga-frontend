<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Reset your password</h4>
                </div>

                <!-- Password Field with Toggle -->
                <div class="vx-col mb-2">
                  <!-- <label class="vs-input--label block">New Password *</label> -->
                  <div class="relative">
                    <vs-input
                      ref="password"
                      :type="showPassword ? 'text' : 'password'"
                      icon="icon icon-lock"
                      icon-pack="feather"
                      class="w-full"
                      v-validate="'required|min:8'"
                      v-model="password"
                      label="New Password *"
                      name="password"
                    />
                    <span style="top: 20px" class="absolute right-0 mt-3 mr-3 cursor-pointer" @click="showPassword = !showPassword">
                      <feather-icon :icon="showPassword ? 'EyeOffIcon' : 'EyeIcon'" class="cursor-pointer" svgClasses="w-5 h-5" />
                    </span>
                  </div>
                  <span class="text-danger text-sm" v-show="errors.has('password')">
                    {{ errors.first('password') }}
                  </span>
                  <p class="text-xs mt-1" v-if="!errors.has('password')">Password must be at least 8 characters</p>
                </div>

                <!-- Confirm Password Field with Toggle -->
                <div class="vx-col mb-2">
                  <!-- <label class="vs-input--label block">Confirm Password *</label> -->
                  <div class="relative">
                    <vs-input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      icon="icon icon-lock"
                      icon-pack="feather"
                      class="w-full"
                      v-validate="'required|confirmed:password'"
                      v-model="confirmPassword"
                      data-vv-as="password"
                      label="Confirm Password *"
                      name="confirm_password"
                    />
                    <span style="top: 20px" class="absolute right-0 mt-3 mr-3 cursor-pointer" @click="showConfirmPassword = !showConfirmPassword">
                      <feather-icon :icon="showConfirmPassword ? 'EyeOffIcon' : 'EyeIcon'" class="cursor-pointer" svgClasses="w-5 h-5" />
                    </span>
                  </div>
                  <span class="text-danger text-sm" v-show="errors.has('confirm_password')">
                    {{ errors.first('confirm_password') }}
                  </span>
                </div>

                <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Back To Login</vs-button>
                <vs-button
                  id="forget-password"
                  @click="save_changes"
                  v-on:keyup.enter="save_changes"
                  :disabled="!validateForm"
                  class="float-right vs-con-loading__container px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                  >Reset Password</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { useRoute } from 'vue-router'
// const route = useRoute()

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false
    }
  },

  computed: {
    ...mapState('common', ['loading']),
    validateForm() {
      return !this.errors.any() && this.password && this.confirmPassword && this.password === this.confirmPassword
    }
  },

  methods: {
    ...mapActions('common', { resetPassword: 'resetPassword' }),

    async save_changes() {
      console.log(this.$route.params.token, 'prams........')
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.resetPassword({ password: this.password, token: this.$route.params.token })
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
        this.$router.push('/pages/login')
      } catch (message) {
        this.$vs.notify({
          title: 'Error',
          text: message.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary',
          time: 5000
        })
      }
    }
  },

  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#forget-password',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#forget-password > .con-vs-loading')
      }
    }
  }
}
</script>
