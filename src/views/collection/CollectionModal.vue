<template>
  <div>
    <!-- collection popup -->
    <vs-popup :title="`${action_name} ${module_name}`" button-accept="false" button-cancel="false" :active.sync="isActive">
      <form method="POST" @submit.prevent="save_changes">
        <div class="vx-row">
          <div class="vx-col w-full px-8">
            <!-- Name -->
            <div class="vx-row mb-2">
              <vs-input icon="icon icon-package" icon-pack="feather" class="w-full" v-validate="'required|min:4'" v-model="form.name" label="Name *" name="name" data-vv-as="Name" id="Name" />
              <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
            </div>
            <!-- Inventory -->
            <div class="vx-row mb-2">
              <label class="vs-input--label">Inventory *</label>
              <customInventory-select-2
                class="w-full category-input"
                name="inventory"
                placeholder="Select Inventory"
                :value="form.inventory_ids"
                @input="(item) => (form.inventory_ids = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="true"
                v-validate="'required'"
                data-vv-as="User"
                action="common/getInventories"
              />
              <!-- :options="UserList" -->

              <span class="text-danger text-sm" v-show="errors.has('inventory')">{{ errors.first('inventory') }}</span>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row pt-5 px-5 text-center">
          <div class="vx-col w-full">
            <div class="items-center">
              <vs-button class="mr-2 vs-con-loading__container" id="create-collection" @click="save_changes" :disabled="!validateForm">{{ action_name }}</vs-button>
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
import CustomInventorySelect2 from '@/components/custom/form-elements/CustomInventorySelect2.vue'

export default {
  /** Page Name */
  name: `Collection`,

  /** components */
  components: {
    Select2,
    CustomInventorySelect2
  },

  /** Props */
  props: {
    showModal: Boolean,
    data: Object,
    module_name: String,
    action_name: String
  },

  /** data */
  data() {
    return {
      form: {
        name: null,
        inventory_ids: []
      },
      zIndex: 0
    }
  },
  /** Mounted */
  mounted() {
    if (this.data) {
      this.form.name = this.data.name ? this.data.name : null
      this.form.inventory_ids = this.data.inventory_ids ? this.data.inventory_ids : []
    }
  },

  /** computed */
  computed: {
    ...mapState('collection', ['createLoading', 'dropDownOpt']),
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
    ...mapActions('collection', {
      createCollection: 'createCollection',
      updateCollection: 'updateCollection'
    }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData()

        let result
        if (!this.data) {
          result = await this.createCollection(this.form)
        } else {
          result = await this.updateCollection({
            collectionId: this.data._id,
            data: this.form
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
