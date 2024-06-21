<template>
  <div>
    <!-- Add category popup -->
    <vs-popup :title="`Add ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full cursor-pointer">
            <label class="vs-input--label block">Image</label>
            <input type="file" class="border p-2 rounded w-full" name="Image" ref="files"
              accept=".jpg, .png , .jpeg,.pdf" @change="handleFileUpload" style="border: 1px solid rgba(0, 0, 0, 0.2);"
              v-validate="'required'" />
            <span class="text-danger text-sm" v-show="errors.has('Image')">{{ errors.first('Image')
              }}</span>
            <div class="mt-5">
              <div class="relative" v-if="preview_image">
                <div class="h-64 w-64 mt-5 rounded-lg overflow-hidden">
                  <img height="200px" width="250px" :src="preview_image" alt="Image Preview" class="object-fit" />
                </div>
                <!-- <div class="absolute close_icon bg-white w-8 h-8 flex items-center justify-center rounded-full">
                  <feather-icon icon="Trash2Icon" @click="deleteImage(preview, index)"
                    svgClasses="h-5 w-5 font-semibold text-black hover:text-primary cursor-pointer" />
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-category" @click="save_changes"
                :disabled="!validateForm">Add</vs-button>
              <vs-button color="danger" class="text-left" @click="isActive = false">Cancel</vs-button>
            </div>
          </div>
        </div>
      </form>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  /** Page Name */
  name: 'AddCategory',

  /** components */
  components: {
    Select2
  },

  /** Props */
  props: {
    showModal: Boolean,
    module_name: String
  },

  /** data */
  data() {
    return {
      form: {
        banner_image: '',
      },
      preview_image: null,
      zIndex: 0
    }
  },
  /** Mounted */
  mounted() { },

  /** computed */
  computed: {
    ...mapState('banner', ['createLoading']),
    ...mapState('common', ['createLoading']),
    validateForm() {
      return !this.errors.any()
    },
    isActive: {
      get() {
        return this.showModal
      },
      set(val) {
        this.$emit('update:showModal', val)
      }
    }
  },

  /** methods */
  methods: {
    ...mapActions('banner', {
      createBanner: 'createBanner'
    }),
    deleteImage() {
      this.preview_image = null
    },

    /** file upload  */
    handleFileUpload(e) {
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

      // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
      if (this.form.banner_image.src) {
        URL.revokeObjectURL(this.form.banner_image.src);
      }
      // 2. Create the image link to the file to optimize performance:
      this.preview_image = URL.createObjectURL(file);
      this.form.banner_image = file

    },

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData();
        data.append("banner_image", this.form.banner_image);

        const { message } = await this.createBanner(data)
        console.log(message, 'message Add Category Success');
        this.$emit('update-data', true)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
        this.isActive = false
      } catch ({ message }) {
        console.log(message, 'message catch error Category');
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
    }
  },

  /** watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#create-category',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-category > .con-vs-loading')
      }
    }
  }
}
</script>
