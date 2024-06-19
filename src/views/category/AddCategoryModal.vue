<template>
  <div>
    <!-- Add category popup -->
    <vs-popup :title="`Add ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Category name -->
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|min:4'"
                v-model="form.name"
                label="Category Name"
                name="Category Name"
                id="Category Name"
              />
              <span class="text-danger text-sm" v-show="errors.has('Category Name')">{{ errors.first('Category Name') }}</span>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container"
                id="create-category" @click="save_changes" :disabled="!validateForm">Add</vs-button>
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
        name: '',
        type: null
      },
      zIndex: 0
    }
  },
  /** Mounted */
  mounted() {},

  /** computed */
  computed: {
    ...mapState('category', ['createLoading']),
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
    ...mapActions("category", {
      createCategory: "createCategory",
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.createCategory(this.form);
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

  /** watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: "#create-category",
          scale: 0.45,
        });
      } else {
        this.$vs.loading.close("#create-category > .con-vs-loading");
      }
    },
  }
}
</script>

