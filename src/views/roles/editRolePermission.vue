<template>
  <div id="page-add-role">
    <vs-card class="vs-con-loading__container p-4">
      <div>
        <div class="vx-row">
          <div class="vx-col flex items-end mb-5">
            <feather-icon icon="AwardIcon" class="mr-2" svgClasses="w-5 h-5" />
            <span class="leading-none font-medium text-sm lg:text-lg"> Role {{ role }} </span>
          </div>
        </div>
        <div class="vx-row w-full">
          <div class="vx-col w-full">
            <div class="flex items-end justify-between">
              <div>
                <feather-icon icon="KeyIcon" class="mr-2" svgClasses="w-5 h-5" />
                <span class="leading-none font-medium text-sm lg:text-lg">{{ 'Permissions' }}</span>
              </div>
              <div class="">
                <vs-button class="ml-auto mt-2 vs-con-loading__container" id="role-loading" type="filled" @click="save_changes">Update Permissions</vs-button>
                <vs-button @click="navigateList" color="danger" type="filled" class="ml-3 text-gray-500 border border-solid border-gray-500 mt-3">Cancel</vs-button>
              </div>
            </div>

            <vs-table class="flex items-end mt-6" stripe :data="Object.values(permission)">
              <template slot="thead">
                <vs-th>sr</vs-th>
                <vs-th>Module</vs-th>
                <vs-th>Select All</vs-th>
                <vs-th>Permissions</vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :key="i" v-for="(tr, i) in data">
                  <vs-td> {{ i + 1 }} </vs-td>
                  <vs-td>
                    <span class="capitalize">
                      {{ Object.keys(permission)[i] }}
                    </span>
                  </vs-td>

                  <vs-td>
                    <vs-checkbox :checked="selectAll[i]" @input="(e) => changeInput(!selectAll[i], i)">Select All</vs-checkbox>
                  </vs-td>

                  <vs-td>
                    <vs-checkbox class="py-2" :key="x" v-for="(td, x) in tr" v-model="form.permission" :vs-value="td.permission">{{ capitalizeFirstLatter(x) }}</vs-checkbox>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Edit-Permission',
  data: () => ({
    form: {
      permission: []
    },
    breadcrumb: [],
    role: '',
    processing: false
  }),
  async mounted() {
    this.$store
      .dispatch('role/show', this.$route.params.id)
      .then((res) => {
        const data = res.data
        this.role = data.data.name
      })
      .catch((err) => {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
      })

    this.$store
      .dispatch('role/getRoleByPermissionsId', this.$route.params.id)
      .then((res) => {
        const data = res.data
      })
      .catch((err) => {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
      })
  },
  computed: {
    ...mapState('role', ['loading', 'permission']),
    selectAll() {
      return Object.values(this.permission).map((module) => {
        return Object.values(module).filter(({ permission }) => this.form.permission.includes(permission)).length === Object.values(module).length
      })
    },
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('role', {
      getRoleById: 'getRoleById',
      udateRolePermission: 'udateRolePermission',
      getRoleByPermissionsId: 'getRoleByPermissionsId'
    }),
    /** navigate to list */
    navigateList() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: `Confirm Cancel`,
        text: `Are you sure you want to cancel?`,
        accept: () => {
          this.$router.push({ name: 'roles-list' })
        },
        acceptText: 'Yes',
        cancelText: 'No'
      })
    },
    capitalizeFirstLatter(s) {
      if (typeof s !== 'string') return ''
      return s
        .split('_')
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join(' ')
    },
    changeInput(e, i) {
      Object.values(Object.values(this.permission)[i]).forEach((x) => {
        if (e) {
          if (!this.form.permission.includes(x.permission)) {
            this.form.permission.push(x.permission)
          }
        } else {
          const t = this.form.permission.indexOf(x.permission)
          if (t !== -1) {
            this.form.permission.splice(t, 1)
          }
        }
      })
    },
    async save_changes() {
      try {
        const { message } = await this.udateRolePermission({
          data: {
            role: this.$route.params.id,
            ...this.form
          }
        })
        this.$router.push({
          name: 'roles-list'
        })
        this.$vs.notify({
          title: 'Success',
          text: message,
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
    }
  },
  watch: {
    breadcrumb(newvalue) {
      this.$emit('update-breadcrumb', newvalue)
    },
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#role-loading',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#role-loading > .con-vs-loading')
      }
    },
    permission() {
      Object.values(this.permission).forEach((module) => {
        Object.values(Object.values(module)).forEach((x) => {
          if (!this.form.permission.includes(x.permission) && x.status) {
            this.form.permission.push(x.permission)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.vs-card--content {
  padding: 25px;
  font-size: 16px !important;
  // margin-bottom: 15px;
  @media (max-width: 768px) {
    padding: 15px;
  }
}
// .vs-con-table .vs-con-tbody .vs-table--tbody-table {
// 	font-size: 16px !important;
// 	@media (max-width: 768px) {
// 		font-size: 16px !important;
// 	}
// }
.vs-table.vs-table--tbody-table {
  @media (max-width: 768px) {
    min-width: 750px;
  }
}
.vs-checkbox {
  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
}
.vs-con-table .vs-con-tbody .con-vs-checkbox {
  -webkit-box-pack: unset !important;
  justify-content: unset !important;
}

.vs-card--content {
  padding: 0;
  margin-bottom: 0;
}
.vs-con-loading__container {
  overflow: unset;
}
</style>
