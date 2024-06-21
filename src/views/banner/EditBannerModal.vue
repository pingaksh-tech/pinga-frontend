<template>
  <div>
    <!-- Update Category popup -->
    <vs-popup id="update_category_modal" class="vs-con-loading__container" :title="`Update ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <!-- Form -->
      <form method="POST" @submit.prevent="save_changes">
        <!-- Form Content -->
        <div class="vx-row">
          <div class="vx-col w-full px-8 mt-5">
            <input class="cursor-pointer" type="file" ref="files" accept=".jpg, .png , .jpeg, .webp" @change="handleFileUpload" />
            <div class="mt-5">
              <div class="relative" v-if="preview_image">
                <div class="h-64 w-64 mt-5 rounded-lg overflow-hidden">
                  <img height="200px" width="250px" :src="preview_image" alt="Image Preview" class="object-fit" />
                </div>
              </div>
              <div class="relative" v-if="this.form.banner_image">
                <div class="h-64 w-64 mt-5 rounded-lg overflow-hidden">
                  <img height="200px" width="250px" :src="this.form.banner_image" alt="Image Preview" class="object-fit" />
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
              <vs-button class="mr-2 vs-con-loading__container" @click="save_changes()" id="add-user-button" :disabled="!validateForm">Update</vs-button>
              <vs-button color="danger" class="text-left" @click="isActive = false">Cancel</vs-button>
            </div>
          </div>
        </div>
        <!-- End Form Content -->
      </form>
      <!-- End Form -->
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions } from 'vuex'

export default {
  name: 'AddCategory',

  /** Components */
  components: {
    Select2
  },

  /** Props */
  props: {
    showModal: Boolean,
    data: Object,
    module_name: String
  },

  /** Init Data */
  data() {
    return {
      loading: false,
      form: {
        banner_image: this.data.banner_image,
      },
      preview_image: null,
      zIndex: 0
    }
  },

  /** Page Render */
  mounted() {
    console.log(this.data._id);
  },

  /** Computed */
  computed: {
    /** Form Validation Manage */
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
    ...mapActions("banner", {
      updateBannerRecord: "updateBannerRecord",
    }),
    ...mapActions('common', {
      storeSingleFile: 'storeSingleFile'
    }),
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

      // Create a preview URL for the image
      this.preview_image = URL.createObjectURL(file)

      // Create a new FormData object and append the file to it
      const data = new FormData()
      data.append('file', file)

      // Log the contents of FormData to check if the file is appended correctly
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1])
      }

      try {
        const response = await this.storeSingleFile(data)
        this.form.banner_image =  response.data
        this.$vs.notify({
          title: 'Success',
          text: response.message,
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
    // reset form data
    resetForm() {
      this.form = {
        CategoryName: '',
        type: null
      }

      this.$nextTick(() => {
        this.errors.clear()
        this.$validator.reset()
      })
    },

    /** Update Category */
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.updateBannerRecord({
          bannerId: this.data._id,
          data : this.form
        } );
        this.$emit('update-data', true);
        this.$vs.notify({
          title: "Success",
          text: message,
          iconPack: "feather",
          icon: "icon-alert-circle",
          position: "top-center",
          time: 5000,
          color: "success",
        });
        this.isActive = false
      } catch ({ message }) {
        this.$vs.notify({
          title: "Error",
          text: message,
          iconPack: "feather",
          icon: "icon-alert-circle",
          position: "top-center",
          time: 5000,
          color: "primary",
        });
      }
    },
  },

  /** watch Loading Manage */
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#update_category_modal .vs-popup .vs-popup--content',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#update_category_modal .vs-popup .vs-popup--content > .con-vs-loading')
      }
    }
  }
}
</script>
