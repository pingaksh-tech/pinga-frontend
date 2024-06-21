<template>
  <div>
    <!-- Retailer list -->
    <div class="vx-card p-6">
      <vs-table id="Retailer_list" class="vs-con-loading__container" stripe :sst="true" maxHeight="800px"
        @search="updateSearchQuery" @change-page="handleChangePage" @sort="handleSort" :total="FilteredCount"
        :max-items="length" search :data="RetailerRecords">
        <template slot="header">
          <div class="mb-2 flex items-center">
            <div class="flex flex-wrap justify-between items-center">
              <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer filter-font">
                  <div
                    class="p-4 border border-solid d-theme-border-grey-light rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
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
            <div @click="toggleAddRetailerModal"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add Retailer</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="Retailer.name">First Name</vs-th>
          <vs-th sort-key="Retailer.name">Last Name</vs-th>
          <vs-th sort-key="Retailer.name">Business Name</vs-th>
          <vs-th sort-key="Retailer.name">Email</vs-th>
          <vs-th sort-key="Retailer.name">Phone</vs-th>
          <vs-th sort-key="Retailer.name">Landline</vs-th>
          <vs-th sort-key="Retailer.name">Address</vs-th>
          <vs-th sort-key="Retailer.name">City</vs-th>
          <vs-th sort-key="Retailer.name">State</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td class="text-left">{{ tr.first_name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.last_name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.business_name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.email || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.phone || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.landline || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.address || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.city || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.state || '-' }} </vs-td>
            <vs-td>
              <div class="inline-flex">
                <vx-tooltip text="Edit Retailer">
                  <feather-icon @click="toggleEditRetailerModal(tr)" icon="EditIcon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip text="Delete Retailer">
                  <feather-icon @click="deleteRecord(tr._id)" icon="Trash2Icon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
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
                    <vs-dropdown-item @click="sendToEditPage()"> <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /> Edit Retailer </vs-dropdown-item>
                    <vs-dropdown-item @click="deleteRecord()"> <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" /> Delete Retailer </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
                <div>-</div>
              </vs-td> -->
          </vs-tr>
        </template>
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5"
        class="mt-8" @onchange="handleChangePage"></vs-pagination>
    </div>

    <!-- Add Retailer modal -->
    <add-retailer-modal :module_name="module_name" @update-data="getData" v-if="isAddRetailerModalMounted"
      :showModal.sync="isAddRetailerModalShow" />

    <!-- Edit Retailer modal -->
    <Edit-retailer-modal :module_name="module_name" @update-data="getData" v-if="isEditRetailerModalMounted"
      :data="selectedRecord" :showModal.sync="isEditRetailerModalShow" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddRetailerModal from '@/views/retailers/AddRetailerModal'
import EditRetailerModal from '@/views/retailers/EditRetailerModal'

export default {
  name: 'RetailerList',

  /** Components */
  components: {
    AddRetailerModal,
    EditRetailerModal
  },

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Retailer',

    // add Retailer modal
    isAddRetailerModalMounted: false,
    isAddRetailerModalShow: false,

    // Edit Retailer modal
    isEditRetailerModalMounted: false,
    isEditRetailerModalShow: false,
    selectedRecord: null
  }),

  /** computed */
  computed: {
    ...mapState('retailer', ['RetailerRecords', 'total', 'FilteredCount', 'listLoading']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('retailer', {
      getRetailerList: 'getRetailerList',
      deleteRetailerRecord: 'deleteRetailerRecord'
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

    /** Retailer List API */
    getData() {
      this.getRetailerList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add Retailer modal
    toggleAddRetailerModal() {
      this.isAddRetailerModalMounted = true
      this.isAddRetailerModalShow = true
    },

    // Edit Retailer modal
    toggleEditRetailerModal(data) {
      this.isEditRetailerModalMounted = true
      this.isEditRetailerModalShow = true
      this.selectedRecord = data
    },

    /** Delete Retailer Confirmation */
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

    /** Delete Retailer API */
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteRetailerRecord(id)
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
    }
  },

  /** Watchers */
  watch: {
    listLoading() {
      if (this.listLoading) {
        this.$vs.loading({
          container: '#Retailer_list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#Retailer_list > .con-vs-loading')
      }
    },

    // add Retailer modal
    isAddRetailerModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddRetailerModalMounted = false
          }, 0)
        }
      }
    },

    // edit Retailer modal
    isEditRetailerModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditRetailerModalMounted = false
          }, 0)
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
