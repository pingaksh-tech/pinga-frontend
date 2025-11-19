<template>
  <div class="">
    <div class="vx-row">
      <div class="p-6 vx-col w-1/2">
        <div class="vx-card p-6">
          <div>
            <h3 class="mb-2">Privacy Policy</h3>
          </div>
          <div class="editor-container">
            <div id="editor2" class="h-64 border rounded"></div>
            <vs-button class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" @click="submitPrivacyHtml"> Submit Privacy Policy </vs-button>
          </div>
        </div>
      </div>

      <div class="p-6 vx-col w-1/2">
        <div class="vx-card p-6">
          <div>
            <h3 class="mb-2">Return Policy</h3>
          </div>
          <div class="editor-container">
            <div id="editor2-return" class="h-64 border rounded"></div>
            <vs-button class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" @click="submitReturnHtml">Submit Return Policy</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Policy',

  data() {
    return {
      privacyQuill: null,
      returnQuill: null,
      privacyHtml: '',
      returnHtml: '',
      type: 'Policies'
    }
  },

  computed: {
    ...mapState('setting', ['settingRecord', 's3Path'])
  },

  mounted() {
    this.initPrivacyQuillEditor()
    this.initReturnQuillEditor()
    this.getSettings()
  },

  beforeDestroy() {
    this.privacyQuill = null
    this.returnQuill = null
  },

  methods: {
    ...mapActions('setting', {
      updatePolicy: 'updatePolicy',
      getSetting: 'getSetting'
    }),
    async getSettings() {
      try {
        const response = await this.getSetting({
          setting_name: this.type
        })
        this.privacyHtml = response.data.setting_value.privacy_text
        this.returnHtml = response.data.setting_value.return_text
        if (this.privacyQuill && this.privacyHtml) {
          this.privacyQuill.root.innerHTML = this.privacyHtml
        }
        if (this.returnQuill && this.returnHtml) {
          this.returnQuill.root.innerHTML = this.returnHtml
        }
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

    async submitPrivacyHtml() {
      try {
        const data = {
          policy_info: this.privacyHtml,
          type: 'privacy'
        }
        const { message } = await this.updatePolicy({ data })
        this.$vs.notify({
          title: 'Success',
          text: message || 'Privacy Policy updated successfully',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
      } catch (error) {
        this.$vs.notify({
          title: 'Error',
          text: error.message || 'Failed to update Privacy Policy',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
      }
    },

    async submitReturnHtml() {
      try {
        const data = {
          policy_info: this.returnHtml,
          type: 'return'
        }
        const { message } = await this.updatePolicy({ data })
        this.$vs.notify({
          title: 'Success',
          text: message || 'Return Policy updated successfully',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
      } catch (error) {
        this.$vs.notify({
          title: 'Error',
          text: error.message || 'Failed to update Return Policy',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
      }
    },

    initPrivacyQuillEditor() {
      //initialize the text editor as soon as the dom mount.
      this.privacyQuill = new Quill('#editor2', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['blockquote', 'code-block'],
            [{ direction: 'rtl' }],
            ['clean']
          ]
        }
      })

      // Populate editor with existing privacy policy content if available
      if (this.settingRecord && this.settingRecord.privacy_policy) {
        this.privacyQuill.setContents(this.settingRecord.privacy_policy)
      }

      // Convert Quill delta to inline-style HTML for privacy policy
      this.privacyQuill.on('text-change', () => {
        const delta = this.privacyQuill.getContents()
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {
          inlineStyles: true
        })
        this.privacyHtml = converter.convert()
      })
    },

    initReturnQuillEditor() {
      this.returnQuill = new Quill('#editor2-return', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['blockquote', 'code-block'],
            [{ direction: 'rtl' }],
            ['clean']
          ]
        }
      })

      // Populate editor with existing return policy content if available
      if (this.settingRecord && this.settingRecord.return_policy) {
        this.returnQuill.setContents(this.settingRecord.return_policy)
      }

      // Convert Quill delta to inline-style HTML for return policy
      this.returnQuill.on('text-change', () => {
        const delta = this.returnQuill.getContents()
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {
          inlineStyles: true
        })
        this.returnHtml = converter.convert()
      })
    }
  }
}
</script>

<style scoped>
.editor-container {
  width: 100%;
}
#editor2,
#editor2-return {
  min-height: 200px;
  background: #fff;
}
.ql-container {
  font-size: 14px;
}
.ql-toolbar {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
</style>
