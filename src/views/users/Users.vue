<template>
  <div>
    <!-- User list -->
    <div class="vx-card p-6">
      <vs-table
        id="User_list"
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="800px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCount"
        :max-items="length"
        search
        :data="UserRecords"
      >
        <template slot="header">
          <div class="mb-2 flex items-center">
            <div class="flex flex-wrap justify-between items-center">
              <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer filter-font">
                  <div class="p-4 border border-solid d-theme-border-grey-light rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      {{ page * length - (length - (FilteredCount && 1)) || 0 }}
                      -
                      {{ FilteredCount - page * length > 0 ? page * length : FilteredCount }}
                      of {{ total || 0 }}
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
              </div>
            </div>
            <div
              @click="toggleAddUserModal"
              v-if="checkPermissionSlug(['users_create'])"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add User</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="user.name">First Name</vs-th>
          <vs-th sort-key="user.name">Last Name</vs-th>
          <vs-th sort-key="user.name">Email</vs-th>
          <vs-th sort-key="user.name">Phone</vs-th>
          <vs-th sort-key="user.name">Role</vs-th>
          <vs-th sort-key="user.name">Status</vs-th>
          <vs-th v-if="checkPermissionSlug(['users_edit','users_delete'])">Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td class="text-left">{{ tr.first_name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.last_name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.email || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.phone || '-' }} </vs-td>
            <vs-td class="text-left">{{ (tr.role && tr.role.name) || '-' }} </vs-td>
            <vs-td class="text-left">
              <vs-switch icon-pack="feather" vs-icon-on="icon-check-circle" vs-icon-off="icon-slash" color="primary" :value="tr.status" @click.stop="updateStatus(tr._id,tr.status)">
               <span slot="on"></span>
               <span slot="off"></span>
             </vs-switch>
            </vs-td>
            <vs-td v-if="checkPermissionSlug(['users_edit','users_delete'])">
              <div class="inline-flex">
                <vx-tooltip text="Edit User" v-if="checkPermissionSlug(['users_edit'])">
                  <feather-icon @click="toggleEditUserModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip text="Delete User"  v-if="checkPermissionSlug(['users_delete'])">
                  <feather-icon @click="deleteRecord(tr._id)" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>
            </vs-td>
            <!-- <vs-td>
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                  <div class="p-4 border border-solid d-theme-border-grey-light cursor-pointer flex items-center justify-between font-medium">
                    Actions
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <vs-dropdown-menu class="locations__actions">
                    <vs-dropdown-item @click="sendToEditPage()"> <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /> Edit User </vs-dropdown-item>
                    <vs-dropdown-item @click="deleteRecord()"> <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" /> Delete User </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
                <div>-</div>
              </vs-td> -->
          </vs-tr>
        </template>
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8" @onchange="handleChangePage"></vs-pagination>
    </div>

    <!-- Add User modal -->
    <add-user-modal :module_name="module_name" @update-data="getData" v-if="isAddUserModalMounted" :showModal.sync="isAddUserModalShow" />

    <!-- Edit User modal -->
    <Edit-user-modal :module_name="module_name" @update-data="getData" v-if="isEditUserModalMounted" :data="selectedRecord" :showModal.sync="isEditUserModalShow" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AddUserModal from '@/views/users/AddUserModal'
import EditUserModal from '@/views/users/EditUserModal'

export default {
  name: 'UserList',

  /** Components */
  components: {
    AddUserModal,
    EditUserModal
  },

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'User',

    // add User modal
    isAddUserModalMounted: false,
    isAddUserModalShow: false,

    // Edit User modal
    isEditUserModalMounted: false,
    isEditUserModalShow: false,
    selectedRecord: null
  }),

  /** computed */
  computed: {
    ...mapState('user', ['UserRecords', 'total', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('user', {
      getUserList: 'getUserList',
      deleteUserRecord: 'deleteUserRecord'
    }),

    /** Per Page Limit Change */
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getData()
    },

    /** Page Change */
    handleChangePage(page) {
      this.page = page
      this.getData()
    },

    /** Sorting Table Data */
    handleSort(key, active) {
      if (!key) return
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },

    /** Search Query */
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },

    /** User List API */
    getData() {
      this.getUserList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add User modal
    toggleAddUserModal() {
      this.isAddUserModalMounted = true
      this.isAddUserModalShow = true
    },

    // Edit User modal
    toggleEditUserModal(data) {
      // console.log(data, "data in edit user modal")
      this.isEditUserModalMounted = true
      this.isEditUserModalShow = true
      this.selectedRecord = data
    },

    /** Delete User Confirmation */
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: `Confirm Delete`,
        text: `Are you sure you want to delete this record?`,
        accept: () => this.deleteSingleRecord(id),
        acceptText: 'Delete'
      })
    },

    /** Delete User API */
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteUserRecord(id)
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
          position: 'top-center',
          time: 5000,
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },
    updateStatus(id,status) {
      console.log(status,"status")
      this.$store
        .dispatch('user/updateUserStatus', {
         type:'users',
          id,
          status : !status
        })
        .then((Success) => {
          this.getData()
          const { message } = Success
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'success'
          })
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


  },

  /** Watchers */
  watch: {
    listLoading() {
      if (this.listLoading) {
        this.$vs.loading({
          container: '#User_list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#User_list > .con-vs-loading')
      }
    },

    // add User modal
    isAddUserModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddUserModalMounted = false
          }, 0)
        }
      }
    },

    // edit User modal
    isEditUserModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditUserModalMounted = false
          }, 300)
        }
      }
    },
    page() {
      this.getData()
    }
  },

  /** On Rendering */
  mounted() {
    this.getData()
  }
}
</script>
