<template>
  <div>
    <!-- Collection Popup -->
    <vs-popup :title="`${action_name} ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required'" v-model="form.name" label="Name *" name="name" data-vv-as="Name" id="Name" />
              <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-collection" @click="save_changes" :disabled="!validateForm">
                {{ action_name }}
              </vs-button>
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

export default {
  /** Page Name */
  name: `Collection`,

  /** Props */
  props: {
    showModal: Boolean,
    data: Object,
    module_name: String,
    action_name: String
  },

  /** Data */
  data() {
    return {
      form: {
        name: null
      },
      zIndex: 0
    }
  },

  /** Mounted */
  mounted() {
    if (this.data) {
      this.form.name = this.data.name ? this.data.name : null
    }
  },

  /** Computed */
  computed: {
    ...mapState('collection', ['createLoading']),
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

  /** Methods */
  methods: {
    ...mapActions('diamondClarity', {
      createDiamondClarity: 'createDiamondClarity',
      updateDiamondClarity: 'updateDiamondClarity'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        // Send form data as a plain object
        const payload = { name: this.form.name }
        let result
        if (!this.data) {
          result = await this.createDiamondClarity(payload)
        } else {
          result = await this.updateDiamondClarity({
            collectionId: this.data._id,
            data: payload
          })
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
          color: 'danger'
        })
      }
    }
  },

  /** Watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#create-collection',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-collection > .con-vs-loading')
      }
    }
  }
}
</script>