<template>
  <div>
    <!-- Update Category popup -->
    <vs-popup id="update_category_modal" class="vs-con-loading__container" :title="`Update ${module_name}`"
      button-accept="false" button-cancel="false" :active.sync="isActive">
      <!-- Form -->
      <form method="POST" @submit.prevent="save_changes">
        <!-- Form Content -->
        <div class="vx-row">
          <div class="vx-col w-full cursor-pointer">
            <label class="vs-input--label block">Image * (Recommended banner size: 16:7)</label>
            <input type="file" class="border p-2 rounded w-full" ref="files" accept=".jpg, .png , .jpeg,.pdf"
              @change="handleFileUpload" style="border: 1px solid rgba(0, 0, 0, 0.2);" />
            <div class="mt-5">
              <div class="relative" v-if="preview_image">
               <div class="aspect-[16/7] w-full mt-5 rounded-lg overflow-hidden bg-gray-100">
                <img :src="preview_image" alt="Image Preview" class="w-full h-full object-cover" />
              </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" @click="save_changes()" id="add-user-button"
                :disabled="!validateForm">Update</vs-button>
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
      preview_image: this.data.banner_image,
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

    /** Update Category */
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData();
        data.append("banner_image", this.form.banner_image);
        const { message } = await this.updateBannerRecord({
          bannerId: this.data._id,
          data
        });
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
