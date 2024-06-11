<template>
  <div>
    <!-- add category popup -->
    <vs-popup id="add_category_modal" class="vs-con-loading__container" title="Add Category" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- strain name -->
            <div class="vx-row mb-2">
              <vs-input
                icon="icon icon-package"
                icon-pack="feather"
                class="w-full"
                v-validate="'required|min:4'"
                v-model="form.CategoryName"
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
              <vs-button class="mr-2 vs-con-loading__container" id="add_category_modal" @click="save_changes" :disabled="!validateForm">Add Category</vs-button>
              <vs-button color="danger" class="text-left" @click="isActive = false">Cancel</vs-button>
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

  // methods
  methods: {
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
    },
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
