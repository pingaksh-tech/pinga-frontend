<template>
 <div class="vx-card p-6 upload-card">
   <h2 class="upload-title mb-6">Upload Document</h2>

   <!-- File Upload Area -->
   <div class="upload-area" @click="$refs.fileInput.click()" @dragover.prevent @drop="handleDrop">
     <input type="file"
            ref="fileInput"
            accept=".pdf"
            @change="handleFileChange"
            class="hidden" />

     <div class="upload-content">
       <feather-icon icon="UploadIcon" class="upload-icon" />
       <h3 class="upload-subtitle">Select PDF File</h3>
       <p class="upload-hint">Click to select or drag a PDF file</p>
     </div>
   </div>

   <!-- Selected File Display -->
   <div v-if="selectedFile" class="selected-file">
     <feather-icon icon="FileIcon" class="file-icon" />
     <span class="file-name">{{ selectedFile.name }}</span>
   </div>

   <div class="divider"></div>

   <!-- Duration Section -->
   <div class="duration-section">
     <h4 class="duration-title">Link will expire in {{ duration }} minutes</h4>
     <vs-input-number v-model="duration" class="duration-input" />
   </div>

   <!-- Generate Button -->
   <div class="button-group">
    <vs-button class="generate-button" @click="uploadPdf" :disabled="!isFormValid">
      Generate Secure Link
    </vs-button>
    <vs-button color="warning" class="reset-button" @click="resetForm" :disabled="!hasData">
      Reset
    </vs-button>
  </div>

   <!-- Generated Link Section -->
   <div v-if="generatedLink" class="link-section">
     <div class="link-item">

       <div class="link-container">
         <vs-input disabled v-model="generatedLink.url" class="link-input" />
         <vs-button @click="copyToClipboard(generatedLink.url)" class="copy-button">
           Copy Link
         </vs-button>
       </div>
     </div>

     <!-- Expiry Timer -->
     <div class="expiry-timer">
       <span>Expires in: {{ formattedExpiryTime }}</span>
       <vs-checkbox v-model="linkExpired" disabled v-if="linkExpired">
         Link has expired
       </vs-checkbox>
     </div>
   </div>
 </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
 name: 'UploadPdf',

 data() {
   return {
     selectedFile: null,
     duration: 30, // Default to 30 minutes
     generatedLink: null,
     copyLink: false,
     expiryInterval: null,
     remainingTime: 0,
     linkExpired: false
   }
 },

 computed: {
   isFormValid() {
     return this.selectedFile && this.duration > 0
   },
   hasData() {
    return this.selectedFile || this.generatedLink
  },

   formattedExpiryTime() {
     if (!this.generatedLink) return '00:00'

     const minutes = Math.floor(this.remainingTime / 60)
     const seconds = this.remainingTime % 60
     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
   }
 },

 methods: {
   ...mapActions('pdfUpload', ['createPdfLink']),

   resetForm() {
    this.selectedFile = null
    this.generatedLink = null
    this.duration = 30
    this.copyLink = false
    this.linkExpired = false
    this.remainingTime = 0

    // Clear any existing file input
    if (this.$refs.fileInput) {
      this.$refs.fileInput.value = ''
    }

    // Clear the interval if it exists
    if (this.expiryInterval) {
      clearInterval(this.expiryInterval)
      this.expiryInterval = null
    }
  },

   handleFileChange(event) {
     const file = event.target.files[0]
     if (!file) return

     if (file.type !== 'application/pdf') {
       this.$vs.notify({
         title: 'Error',
         text: 'Please select a PDF file',
         color: 'danger',
         position: 'top-right'
       })
       return
     }

     this.selectedFile = file
   },

   handleDrop(event) {
     event.preventDefault()
     const file = event.dataTransfer.files[0]
     if (file) {
       this.$refs.fileInput.files = event.dataTransfer.files
       this.handleFileChange({ target: { files: event.dataTransfer.files } })
     }
   },

   async uploadPdf() {
     if (!this.isFormValid) return

     try {
       const formData = new FormData()
       formData.append('pdf_file', this.selectedFile)
       formData.append('duration', this.duration)

       const response = await this.createPdfLink(formData)
       const data  = response.data
       data.url = "https://pingaksh.co/pdf?id=" + data.code
       this.generatedLink = data

       // Start the expiry timer
       this.startExpiryTimer()

       this.$vs.notify({
         title: 'Success',
         text: 'Secure PDF link generated',
         color: 'success',
         position: 'top-right'
       })
     } catch (error) {
       this.$vs.notify({
         title: 'Error',
         text: error.message || 'Failed to generate PDF link',
         color: 'danger',
         position: 'top-right'
       })
     }
   },

   startExpiryTimer() {
     if (this.expiryInterval) clearInterval(this.expiryInterval)

     const expiryDate = new Date(this.generatedLink.expires_at)
     this.updateRemainingTime(expiryDate)

     this.expiryInterval = setInterval(() => {
       this.updateRemainingTime(expiryDate)
     }, 1000)
   },

   updateRemainingTime(expiryDate) {
     const now = new Date()
     const diff = Math.floor((expiryDate - now) / 1000)

     if (diff <= 0) {
       this.remainingTime = 0
       this.linkExpired = true
       clearInterval(this.expiryInterval)
     } else {
       this.remainingTime = diff
     }
   },

   copyToClipboard(text) {
     navigator.clipboard.writeText(text)
     this.copyLink = true
     this.$vs.notify({
       title: 'Copied',
       text: 'Link copied to clipboard',
       color: 'success',
       position: 'top-right'
     })
   }
 },

 beforeDestroy() {
   if (this.expiryInterval) clearInterval(this.expiryInterval)
 }
}
</script>

<style scoped>
.upload-card {
 max-width: 600px;
 margin: 0 auto;
 border-radius: 8px;
 box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.upload-title {
 font-size: 1.5rem;
 font-weight: 600;
 color: #2c3e50;
 text-align: center;
}

.upload-area {
 border: 2px dashed #d3d3d3;
 border-radius: 8px;
 padding: 2rem;
 text-align: center;
 cursor: pointer;
 transition: all 0.3s;
 margin-bottom: 1rem;
}

.upload-area:hover {
 border-color: #7367f0;
 background-color: rgba(115, 103, 240, 0.05);
}

.upload-content {
 display: flex;
 flex-direction: column;
 align-items: center;
}

.upload-icon {
 width: 48px;
 height: 48px;
 color: #7367f0;
 margin-bottom: 1rem;
}

.upload-subtitle {
 font-size: 1.1rem;
 font-weight: 500;
 margin-bottom: 0.5rem;
 color: #2c3e50;
}

.upload-hint {
 color: #6e6b7b;
 font-size: 0.9rem;
}

.selected-file {
 display: flex;
 align-items: center;
 padding: 0.75rem 1rem;
 background-color: #f8f8f8;
 border-radius: 6px;
 margin-bottom: 1.5rem;
}

.file-icon {
 color: #7367f0;
 margin-right: 0.75rem;
}

.file-name {
 font-size: 0.9rem;
 color: #2c3e50;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
}

.divider {
 height: 1px;
 background-color: #e0e0e0;
 margin: 1.5rem 0;
}

.duration-section {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 1.5rem;
}

.duration-title {
 font-size: 1rem;
 font-weight: 500;
 color: #2c3e50;
}

.duration-input {
 width: 100px;
}

.button-group {
 display: flex;
 gap: 0.5rem;
 margin-bottom: 1.5rem;
}

.generate-button {
 flex: 1;
}

.reset-button {
 flex: 1;
}

.link-section {
 border: 1px solid #e0e0e0;
 border-radius: 8px;
 padding: 1rem;
}

.link-item {
 margin-bottom: 1rem;
}

.link-checkbox {
 margin-bottom: 0.5rem;
}

.link-container {
 display: flex;
 gap: 0.5rem;
}

.link-input {
 flex-grow: 1;
}

.copy-button {
 min-width: 100px;
}

.expiry-timer {
 display: flex;
 justify-content: space-between;
 align-items: center;
 color: #6e6b7b;
 font-size: 0.9rem;
}
</style>