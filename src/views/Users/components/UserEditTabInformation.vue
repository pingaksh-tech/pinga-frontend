<template>
  <div id="user-edit-tab-info">
    <div class="v x-row">
      <div class="vx-col w-full md:w-1/2">
        <!-- Col Header -->
        <!-- <div class="flex items-end">
          <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">User Information</span>
        </div> -->

        <!-- Col Content -->
        <div>
          <vs-input class="w-full mt-6" placeholder="Enter Full Name" label="Full Name" v-model="form.fullname" name="Full Name" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('Full Name')">{{ errors.first('Full Name') }}</span>

          <!-- <vs-input class="w-full mt-4" placeholder="Enter Last Name" label="Last Name" v-model="form.lastname" name="Last Name" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('Last Name')">{{ errors.first('Last Name') }}</span> -->

          <vs-input class="w-full mt-4" label="Email" placeholder="Enter Email Address" v-model="form.email" name="Email" disabled />
          <span class="text-danger text-sm" v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
        </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div>
          <vs-button class="ml-auto mt-5 vs-con-loading__container" id="edit-user-button" type="filled" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'User',

  // Form Data
  data() {
    return {
      form: {
        name: '',
        email: localStorage.getItem('email'),
      },
      image_preview: 'null',
      IsOpenImageCrop: false
    }
  },

  components: {
    Select2
  },

  /* Form Validate */
  computed: {
    ...mapState('auth', ['user', 'loading', 'userInfo']),
    ...mapState('developer', ['departmentType']),
    validateForm() {
      return !this.errors.any()
    },
    stencilComponent() {
      return CircleStencil
    }
  },
  /* API Calling Function */
  methods: {
    ...mapActions('auth', {
      getUserProfile: 'getUserProfile'
    }),
    change(result) {},

    // resetForm() {
    //   this.IsOpenImageCrop = false;
    //   this.form.image = '';
    // },

    cropImage() {
      const result = this.$refs.cropper.getResult()
      if (result.canvas == undefined) {
        this.toast.error('Please Select Image')
        return
      }
      const resultTest = result.canvas.toDataURL(this.form.image.type)
      const base64Image = resultTest.replace(`data:${this.form.image.type};base64,`, '')
      this.b64toBlob(base64Image, this.form.image.type)

      this.IsOpenImageCrop = false
    },
    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = window.atob(b64Data)
      const byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }

      const blob = new File(byteArrays, 'image.jpg', {
        type: contentType
      })
      this.form.image = blob
      this.image_preview = URL.createObjectURL(blob)
      return blob
    },

    handleUpload(e) {
      const { files } = e.target
      const blob = URL.createObjectURL(files[0])
    },
    async save_changes() {
      if (!(await this.$validator.validate())) {
        this.$vs.notify({
          title: 'Error',
          text: 'Please Fill The Form',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
        return
      }
      this.processing = true
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#edit-user-button',
        scale: 0.45
      })
      const data = new FormData()
      data.append('image', this.form.image)
      data.append('fullname', this.form.fullname)
      data.append('email', this.form.email)
      data.append('department', this.form.department)
      data.append('role', this.form.role)

      try {
        const { message } = await this.$store.dispatch('auth/updateProfile', data)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
        this.getUserRecord()
        this.$router.push({
          name: 'home'
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
      this.$vs.loading.close('#edit-user-button > .con-vs-loading')
    },

    // Get Profile
    async getUserRecord() {
      await this.getUserProfile()
    }
  },

  async mounted() {
    await this.getUserRecord()
    this.form.fullname = this.userInfo.fullname
    this.form.lastname = this.userInfo.lastname
    this.form.email = this.userInfo.email
    this.form.department = this.userInfo.department
    this.form.role = this.userInfo.role._id
    this.form.image = this.userInfo.image
    this.image_preview = this.userInfo.image
  }
}
</script>
<style scoped>
.edit-icon {
  bottom: 0;
  right: 0;
  transform: translate(10px, 10px);
}
.min-h-120 {
  min-height: 120px;
}
.max-h-450 {
  max-height: 450px;
  overflow: hidden;
}
</style>
