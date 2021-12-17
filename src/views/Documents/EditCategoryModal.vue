<template>
  <div>
    <!-- add location popup -->
    <vs-popup id="add_category_modal" class="vs-con-loading__container" title="Add Category" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- strain name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-model="form.CategoryName" label="Category Name" name="Category Name" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Category Name')">{{ errors.first('Category Name') }}</span> -->
            </div>

            <!-- location type -->
            <div class="vx-row mb-2">
              <label>Has Sub-Folders </label>
              <vs-checkbox class="py-2" />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Location Type')">{{ errors.first('Location Type') }}</span> -->
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="add-user-button" type="relief">Edit Category</vs-button>
              <vs-button color="danger" type="relief" class="text-left" @click="isActive = false">Cancel</vs-button>
            </div>
          </div>
        </div>
      </form>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'AddCategory',

  components: {
    Select2
  },

  props: {
    showModal: Boolean
  },

  data() {
    return {
      loading: false,
      form: {
        CategoryName: '',
        type: null
      },
      zIndex: 0
    }
  },

  mounted() {},

  // computed
  computed: {
    isActive: {
      get() {
        return this.showModal
      },
      set(val) {
        this.$emit('update:showModal', val)
      }
    }
  },

  // methods
  methods: {
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
    }
  },

  // watch
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#add_category_modal .vs-popup .vs-popup--content',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#add_category_modal .vs-popup .vs-popup--content > .con-vs-loading')
      }
    }
  }
}
</script>

<style lang="scss">
#add_category_modal {
  .vs-popup {
    width: calc(100% - 80%) !important;
    position: relative;

    .con-vs-loading {
      position: absolute;
    }
  }
}
</style>
