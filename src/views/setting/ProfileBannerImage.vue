<template>
  <div class="vx-card p-6">
    <h3 class="mb-2">Profile Banner Image</h3>
    <form method="POST">
      <div class="vx-col w-full cursor-pointer">
        <div class="flex gap-2">
          <label class="vs-input--label block">Banner Image (Recommended banner size: 16:7)</label>
        </div>
        <input type="file" class="border p-2 rounded w-full" name="Image" ref="files" accept=".jpg, .png , .jpeg"
          @change="handleFileUpload" style="border: 1px solid rgba(0, 0, 0, 0.2);" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('profile_banner')">{{ errors.first('profile_banner')
          }}</span>
        <div v-if="preview_image">
          <div class="aspect-[16/7] w-full mt-5 rounded-lg overflow-hidden bg-gray-100">
            <img :src="s3Path + preview_image" alt="Image Preview" class="w-full h-full object-cover" />
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
  name: `ProfileBanner`,

  /** data */
  data() {
    return {
      type: 'Profile_Banner',
      preview_image: null
    }
  },

  /** computed */
  computed: {
    ...mapState('setting', ['s3Path']),
  },

  /** Mounted */
  async mounted() {
    try {
      const data = await this.getSetting({
        setting_name: this.type
      });
      this.preview_image = data.data.setting_value
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
  /** methods */
  methods: {
    ...mapActions('setting', {
      updateProfileBanner: 'updateProfileBanner',
      getSetting: 'getSetting',
    }),


    /** file upload  */
    async handleFileUpload(e) {
      const file = e.target.files[0]

      // Check if a file is selected
      if (!file) {
        this.$vs.notify({
          title: 'Error',
          text: 'No file selected',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
        return
      }


      try {
        const formData = new FormData();
        formData.append("profile_banner", file);

        const { data, message } = await this.updateProfileBanner(formData);

        this.preview_image = data.setting_value

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
