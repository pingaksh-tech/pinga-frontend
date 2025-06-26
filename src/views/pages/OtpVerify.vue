<template>
  <div class="otp-verification">
    <p class="mb-2">Please enter the OTP sent to {{ this.email }}.</p>
    <div class="mb-4">
      <otp-input :digits="4" :gap="30" :isValid="isCodeValid" @on-complete="onCompleteHandler" @on-changed="onChangedHandler">
        <template #errorMessage> There is an error </template>
      </otp-input>
      <!-- <vs-input id="otp" v-model="otp" type="text" v-validate="'required|numeric|min:6|max:6'" class="w-full" placeholder="Enter OTP" /> -->
      <span class="text-danger" v-show="errors.has('otp')">{{ errors.first('otp') }}</span>
    </div>
    <div class="flex items-center">
      <vs-button :disabled="!canResend" style="padding: 20px 60px" class="items-center vs-con-loading__container" @click="handleResendOtp">Resend OTP</vs-button>
      <span v-if="timer > 0" class="ml-4 text-primary"> Resend available in {{ timer }} seconds </span>
    </div>
    <div class="mt-4">
      <div class="px-4 w-full md:w-auto cursor-pointer" @click="backToLogin">Back To Login</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import OtpInput from 'otp-input-vue2'

export default {
  name: 'otpVerify',
  components: {
    OtpInput
  },
  props: {
    email: {
      type: String,
      required: true
    },
    otpPage: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      otp: '',
      isCodeValid: true,
      isProcess: false,
      canResend: true, // Determines if the Resend OTP button is enabled
      timer: 0 // Countdown timer for resend button
    }
  },
  mounted() {
   console.log('🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥', );
    this.canResend = false
    this.timer = 30 // 30 seconds timer
    this.startTimer()
  },
  methods: {
    ...mapActions('auth', { verifyOtp: 'verifyOtp', resendOtp: 'resendOtp' }),

    async onCompleteHandler(code) {
      if (!this.isProcess) {
        this.isProcess = true
        try {
          this.isCodeValid = true
          const { message, success } = await this.verifyOtp({
            email: this.email,
            otp: code
          })

          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'success'
          })
          this.isProcess = false

          const redirectPath =
            localStorage.getItem('redirectPath') || (window.location.hostname.includes('mygurudwara') ? 'gurudwara-list' : window.location.hostname.includes('artist') ? 'audio-list' : 'home')
          localStorage.removeItem('redirectPath')
          this.$router.push(redirectPath.startsWith('/') ? redirectPath : { name: redirectPath })
        } catch (message) {
          this.isProcess = false
          this.isCodeValid = false
          this.$vs.notify({
            title: 'Error',
            text: message.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'primary'
          })
        }
      }
    },

    async handleResendOtp() {
      if (this.canResend) {
        try {
          this.canResend = false
          this.timer = 30 // 30 seconds timer
          await this.resendOtp({ email: this.email })
          this.$vs.notify({
            title: 'Success',
            text: 'OTP resent successfully.',
            iconPack: 'feather',
            icon: 'icon-check-circle',
            position: 'top-center',
            time: 5000,
            color: 'success'
          })
          this.startTimer()
        } catch (error) {
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'primary'
          })
        }
      }
    },

    onChangedHandler(lastEnteredCode) {
      this.isCodeValid = true
    },

    backToLogin() {
      this.$emit('back-to-login')
    },

    startTimer() {
      const interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          clearInterval(interval)
          this.canResend = true
        }
      }, 1000)
    }
  }
}
</script>

<style scoped></style>
