<template>
  <div class="flex gap-6">
    <div class="vx-card p-6">
      <div class="flex">
        <h3 class="mb-2 w-full">Return Policy</h3>
      </div>
      <div class="editor-container">
        <div id="editor2-return" class="h-64 border rounded"></div>
        <vs-button class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" @click="submitHtml">Submit Return Policy</vs-button>
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
  name: 'ReturnPolicy',

  data() {
    return {
      quill: null,
      generatedHtml: '',
      type: 'Policies'
    }
  },

  computed: {
    ...mapState('setting', ['settingRecord', 's3Path'])
  },

  mounted() {
    this.initQuillEditor()
  },

  beforeDestroy() {
    this.quill = null
  },

  methods: {
    ...mapActions('setting', {
      updatePolicy: 'updatePolicy',
      getSetting: 'getSetting'
    }),

    async submitHtml() {
      try {
        const data = {
          policy_info: this.generatedHtml,
          type: 'return'
        }
        const { message } = await this.updatePolicy({ data })
        this.$vs.notify({
          title: 'Success',
          text: message || 'Policy updated successfully',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
      } catch (error) {
        this.$vs.notify({
          title: 'Error',
          text: error.message || 'Failed to update policy',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
      }
    },

    initQuillEditor() {
      this.quill = new Quill('#editor2-return', {
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

      // Populate editor with existing content if available
      if (this.settingRecord && this.settingRecord.policy_info) {
        this.quill.setContents(this.settingRecord.policy_info)
      }

      // Convert Quill delta to inline-style HTML
      this.quill.on('text-change', () => {
        const delta = this.quill.getContents()
        console.log('Delta:', delta) // Debug log
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {
          inlineStyles: true
        })
        this.generatedHtml = converter.convert()
        console.log('Generated HTML:', this.generatedHtml) // Debug log
      })
    }
  }
}
</script>

<style scoped>
.editor-container {
  width: 100%;
}
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