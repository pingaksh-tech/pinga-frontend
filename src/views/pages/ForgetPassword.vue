<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

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
                  <h4 class="mb-4">Recover your password</h4>
                  <p>Please enter your email address and we'll send you instructions on how to reset your password.</p>
                </div>

                <div class="mb-8" >
                  <vs-input v-validate="'required|email'" name="email" type="email" label-placeholder="Email" v-model="email" class="w-full" />
                  <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </div>
                <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Back To Login</vs-button>
                <vs-button id="forget-password" @click="save_changes" v-on:keyup.enter="save_changes" :disabled="!validateForm" class="float-right vs-con-loading__container px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                  >Recover Password</vs-button
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
export default {
  data() {
    return {
      email: ''
    }
  },

  /* Form Validate */
  computed: {
    ...mapState('common', ['loading']),
    validateForm() {
      return !this.errors.any()
    }
  },
  /* API Calling Function */
  methods: {
    ...mapActions('common', { forgetPassword: 'forgetPassword' }),

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.forgetPassword({email: this.email})
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
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

   /** watch */
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
