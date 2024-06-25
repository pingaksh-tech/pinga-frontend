<template>
  <div class="vx-card p-6">
    <h3 class="mb-2">Policy</h3>
    <form method="POST">
      <div class="vx-col w-full cursor-pointer">
        <div class="flex gap-2">
          <label class="vs-input--label block">Privacy Policy</label>
          <vx-tooltip text="View Privacy Policy"
            v-if="settingRecord && settingRecord.Policies && settingRecord.Policies.setting_value && settingRecord.Policies.setting_value.privacy_policy">
            <feather-icon icon="EyeIcon"
              @click="openPrivacyPolicy(s3Path + settingRecord.Policies.setting_value.privacy_policy)"
              svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
          </vx-tooltip>
        </div>
        <input type="file" class="border p-2 rounded w-full" name="privacy_policy" ref="files" accept=".pdf"
          @change="handleFileUpload($event, 'privacy')" style="border: 1px solid rgba(0, 0, 0, 0.2);"
          data-vv-as="Privacy Policy" />
        <span class="text-danger text-sm" v-show="errors.has('privacy_policy')">{{ errors.first('privacy_policy')
          }}</span>

      </div>
      <div class="vx-col w-full cursor-pointer my-3">
        <div class="flex gap-2">
          <label class="vs-input--label block">Return Policy</label>
          <vx-tooltip text="View Return Policy">
            <feather-icon icon="EyeIcon"
              v-if="settingRecord && settingRecord.Policies && settingRecord.Policies.setting_value && settingRecord.Policies.setting_value.return_policy"
              @click="openPrivacyPolicy(s3Path + settingRecord.Policies.setting_value.return_policy)"
              svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
          </vx-tooltip>
        </div>
        <input type="file" class="border p-2 rounded w-full" name="return_policy" ref="files" accept=".pdf"
          @change="handleFileUpload($event, 'return')" style="border: 1px solid rgba(0, 0, 0, 0.2);"
          data-vv-as="Return Policy" />
        <span class="text-danger text-sm" v-show="errors.has('return_policy')">{{ errors.first('return_policy')
          }}</span>
      </div>

    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  /** Page Name */
  name: `Policy`,

  /** data */
  data() {
    return {
      type: 'Policies'
    }
  },

  /** computed */
  computed: {
    ...mapState('setting', ['settingRecord', 's3Path']),
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
  },
  /** methods */
  methods: {
    ...mapActions('setting', {
      updatePolicy: 'updatePolicy',
      getSetting: 'getSetting',
    }),

    /** file upload  */
    async handleFileUpload(e, value) {
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
        const data = new FormData();
        data.append("policy", file);
        data.append("type", value);
        const { message } = await this.updatePolicy({
          data
        });

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
    openPrivacyPolicy(url) {
      window.open(url, '_blank');
    }

  },

}
</script>
