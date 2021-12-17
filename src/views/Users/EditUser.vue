<template>
  <div id="add_user">
    <vs-card id="add-user">
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-1/2 px-8">
          <!-- User Name -->
          <div class="vx-row mb-1">
            <vs-input icon="icon icon-package" icon-pack="feather" class="w-full mb-1 mr-10" label="User Name" name="User Name" placeholder="Select User name" />
          </div>

          <!-- Email -->
          <div class="vx-row mb-1">
            <label for="username">Email</label>
            <vs-input icon="icon icon-package" icon-pack="feather" class="w-full mb-1 mr-10" name="Email" placeholder="Select Email" />
          </div>

          <!-- Mobile number -->
          <div class="vx-row mb-1">
            <label for="mobilenumber">Mobile Number</label>
            <vs-input icon="icon icon-package" icon-pack="feather" class="w-full mb-1 mr-10" name="Mobile Number" type="number" placeholder="Select Mobile Number" />
          </div>

          <!-- Password  -->
          <div class="vx-row mb-1">
            <label for="sourcePlant">Password</label>
            <vs-input icon="icon icon-package" icon-pack="feather" class="w-full mb-1 mr-10" name="Password" placeholder="Select Password" />
          </div>

          <!-- Active -->
          <div class="vx-row mb-1">
            <label for="">Active</label>
            <select-2
              id="active"
              class="w-full mb-1 mr-10"
              @input="
                (item) => {
                  item && item.value
                }
              "
              name="Active"
              placeholder="Select Active"
              autocomplete
              :ssr="true"
            />
          </div>

          <!-- Role -->
          <div class="vx-row mb-1">
            <label for="">Role</label>
            <vs-input icon="icon icon-file-text" type="number" icon-pack="feather" class="w-full mb-1 mr-10" name="Role" />
          </div>

          <div class="vx-row mb-1">
            <label for="">Warehouse Access :</label>
            <vs-checkbox />
          </div>
        </div>
      </div>

      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-4 items-center">
            <vs-button class="mt-2 mr-2" id="add-batch-button" type="relief" @click="UpdateUser">Edit User</vs-button>
            <vs-button to="/Users/list" color="danger" type="relief" class="text-left">Cancel</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'Edituser',

  components: {
    Select2
  },
  data: () => ({
    loading: false
  }),

  mounted() {},

  computed: {},

  methods: {
    // update user
    async UpdateUser() {
      if (!(await this.$validator.validate())) {
        return false
      }

      this.loading = true
      this.$store
        .dispatch('/')
        .then(() => {
          this.$vs.notify({
            title: 'Success',
            text: 'Strain Update successfully!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })

          this.resetForm()
          this.$emit('updateList')
        })
        .catch((err) => {
          const { message } = err
          this.$vs.notify({
            title: 'Error',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
        .finally(() => {
          this.loading = false
          this.isActive = false
        })
    }
  },

  watch: {}
}
</script>