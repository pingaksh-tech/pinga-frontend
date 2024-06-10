<template>
  <div id="user-list">
    <!-- user filter -->
    <div class="vx-card p-6 mb-5 filter_card">
      <div class="filter_lists flex items-end">
        <div class="role_filter mt-5">
          <select-2 id="role" class="w-full mb-1" name="Sort By Role" placeholder="Sort By Role" autocomplete label="name" :ssr="true" />
        </div>

        <div class="active_filter mt-5 ml-5">
          <select-2 id="active" class="w-full mb-1" name="Sort By Active" placeholder="Sort By Active" autocomplete label="Sort By Active" :ssr="true" />
        </div>

        <div class="uactive_filter mt-5 ml-5">
          <select-2 id="location" class="w-full mb-1" name="Update Active" placeholder="Update Active" autocomplete label="Update Active" :ssr="true" />
        </div>

        <div class="filter_reset mt-5 ml-5 mb-1">
          <vs-button class="mt-2 mr-2" color="danger" type="relief" @click="clearFilter">Clear Filter</vs-button>
        </div>
      </div>
    </div>

    <!-- user list -->
    <div class="vx-card p-6">
      <vs-table
        id="batch_list__table"
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        FilteredCount
        pagination
        :max-items="length"
        search
        :data="new Array(5)"
      >
        <template slot="header">
          <div class="flex flex-wrap justify-between items-center">
            <!-- ITEMS PER PAGE -->
            <!-- <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
              <vs-dropdown vs-trigger-click class="cursor-pointer">
                <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (FilteredCount && 1)) }}
                    -
                    {{ FilteredCount - page * length > 0 ? page * length : FilteredCount }}
                    of {{ FilteredCount }} (filtered from {{ total }} total entries)
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item @click="handleChangeLength(10)">
                    <span>10</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(20)">
                    <span>20</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(50)">
                    <span>50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(100)">
                    <span>100</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div> -->
          </div>

          <div
            @click="$router.push('/Users/create')"
            class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">New User</span>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th>Full Name</vs-th>
          <vs-th>Email</vs-th>
          <vs-th> Role</vs-th>
          <vs-th>Mobile Number</vs-th>
          <vs-th>Active</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td></vs-td>
            <vs-td></vs-td>
            <vs-td></vs-td>
            <vs-td></vs-td>
            <vs-td>
              <vs-switch color="primary" :value="tr" @input="updateStatus()">
                <span slot="on">Active</span>
                <span slot="off">Inactive</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip text="Edit User">
                  <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="sendToEditPage()" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <!-- Edit user modal -->
    <Edit-user-modal v-if="isEditUserModalMounted" :showModal.sync="isEditUserModalShow" />
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import EditUser from '@/views/Users/EditUser.vue'

export default {
  name: 'UserList',

  components: {
    Select2,
    EditUser
  },

  data: () => ({
    order: [],
    length: 10,
    page: 1,
    search: '',

    // Edit User modal
    isEditUserModalMounted: false,
    isEditUserModalShow: false
  }),

  mounted() {},

  methods: {
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getData()
    },

    handleChangePage(page) {
      this.page = page
      this.getData()
    },

    handleSort(key, active) {
      if (!key) return
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },

    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },

    getData() {
      const { page, length, order, search } = this

      this.$store
        .dispatch('', {
          page,
          limit: length,
          order,
          search
        })
        .then(() => {})
        .catch(() => {})
    },

    // update active  status
    updateStatus(id, status) {
      this.$store
        .dispatch('', {
          id,
          status
        })
        .then(() => {
          this.$vs.notify({
            title: 'Success',
            text: 'Strain status updated successfully!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.getData()
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
    },

    // clear filter batch list
    clearFilter() {
      this.filters = {}
    },

    sendToEditPage() {
      this.$router.push({ name: 'edit-user' })
    },

    // toggle User modal
    toggleEditUserModal() {
      this.isEditUserModalMounted = true
      this.isEditUserModalShow = true
    }
  },

  computed: {},

  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#user-list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#user-list > .con-vs-loading')
      }
    },

    // edit User modal
    isEditUserModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditUserModalMounted = false
          }, 0)
        }
      }
    }
  }
}
</script>

