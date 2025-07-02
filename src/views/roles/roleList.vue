<template>
  <div id="role-loading" class="vs-con-loading__container" style="overflow: unset">
   <div class="vx-card p-6">
      <div>
        <vs-table
          class="text-center"
          stripe
          :sst="true"
          maxHeight="800px"
          @search="updateSearchQuery"
          @change-page="handleChangePage"
          :max-items="length"
          search
          :data="records"
        >
        <!-- :total="FilteredCount" -->

          <template slot="thead">
            <vs-th> <p class="w-full text-center">Sr#</p></vs-th>
            <vs-th> <p class="w-full">Role</p></vs-th>
            <vs-th v-if="checkPermissionSlug(['roles_edit'])"> <p class="w-full text-center">Action</p></vs-th>
          </template>

          <template slot-scope="{ data }" ref="tableBody" stripe :sst="true" maxHeight="800px">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
              <vs-td class="text-left">
                <span class="cursor-pointer" >{{ tr.name || '-' }}</span>
              </vs-td>
              <vs-td v-if="checkPermissionSlug(['roles_edit'])">
                <div class="inline-flex">
                  <vx-tooltip text="Give Permission">
                    <feather-icon icon="LockIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click.stop="sendToEditRole(tr._id)" />
                  </vx-tooltip>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Announcement-List',

  // Form Data
  data() {
    return {
      order: [],
      length: 100,
      page: 1
    }
  },

  computed: {
    ...mapState('role', ['records', 'total', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    // set total pages for pagination
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /* API Calling Function */
  methods: {
    ...mapActions('role', {
      get: 'get',
      delete: 'delete'
    }),

    sendToEditRole(id) {
      this.$router.push(`/role-permission/${id}/edit`)
    },
    sendToEdit(id) {
      this.$router.push(`/role/${id}/edit`)
    },
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getData()
    },
    handleChangePage(page) {
      this.page = page
      this.getData()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    getData() {
      this.get({
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },
    deleteRecord(id, roleName) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: `Confirm Delete Role Name : ${roleName}`,
        text: `Are you sure you want to delete ${roleName} this record?`,
        accept: () => this.deleteSingleRecord(id),
        acceptText: 'Delete'
      })
    },
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.delete(id)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
        this.getData()
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

  /* API Calling Loading */
  watch: {
    listLoading() {
      if (this.listLoading) {
        this.$vs.loading({
          container: '#role-loading',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#role-loading > .con-vs-loading')
      }
    },
    page() {
      this.getData()
    }
  },

  mounted() {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.text-wrapper {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
