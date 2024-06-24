<template>
  <form method="POST" @submit.prevent="save_changes">
    <div class="vx-row">
      <div class="vx-col w-full cursor-pointer">
        <label class="vs-input--label block">Email</label>
        <input type="file" class="border p-2 rounded w-full" name="email" ref="files" accept=".jpg, .png , .jpeg,.pdf"
          @change="handleFileUpload" style="border: 1px solid rgba(0, 0, 0, 0.2);" data-vv-as="Email" />
        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email')
          }}</span>
      </div>
      <div class="vx-col w-full cursor-pointer">
        <label class="vs-input--label block">Phone Number</label>
        <input type="file" class="border p-2 rounded w-full" name="phone" ref="files" accept=".jpg, .png , .jpeg,.pdf"
          @change="handleFileUpload" style="border: 1px solid rgba(0, 0, 0, 0.2);" data-vv-as="Phone Number" />
        <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone')
          }}</span>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row pt-5 px-5 text-center">
      <div class="vx-col w-full">
        <div class="items-center">
          <vs-button class="mr-2 vs-con-loading__container" id="create-policy" @click="save_changes"
            :disabled="!validateForm">Save</vs-button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  /** Page Name */
  name: `Policy`,

  /** Props */
  props: {
    data: Object
  },

  /** data */
  data() {
    return {
      form: {
        categoryId: null,
        product_name: null,
        inventory_ids: [],
        product_image: null
      },
      preview_image: null,
      zIndex: 0
    }
  },
  /** Mounted */
  mounted() {
    if (this.data) {
      this.form.categoryId = this.data.category_id ? this.data.category_id : null;
      this.form.product_name = this.data.product_name ? this.data.product_name : null;
      this.form.inventory_ids = this.data.inventory ? this.data.inventory.map((v) => v._id) : []
      this.preview_image = this.data.product_image ? this.data.product_image : null;
    }
  },

  /** computed */
  computed: {
    ...mapState('latestProduct', ['createLoading', 'dropDownOpt']),
    validateForm() {
      return !this.errors.any()
    },
  },

  /** methods */
  methods: {
    ...mapActions('latestProduct', {
      createLatestProduct: 'createLatestProduct',
      updateLatestProduct: 'updateLatestProduct'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData();
        data.append("product_image", this.form.product_image);
        data.append("categoryId", this.form.categoryId);
        data.append("product_name", this.form.product_name);
        let result;
        if (!this.data) {
          result = await this.createLatestProduct(data)
        } else {
          data.append("latestProductId", this.data._id);
          result = await this.updateLatestProduct({
            data: data
          });
        }
        const message = result.message
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
      if (this.form.product_image && this.form.product_image.src) {
        URL.revokeObjectURL(this.form.product_image.src);
      }
      // 2. Create the image link to the file to optimize performance:
      this.preview_image = URL.createObjectURL(file);
      this.form.product_image = file

    },
  },

  /** watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#create-policy',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-policy > .con-vs-loading')
      }
    }
  }
}
</script>
