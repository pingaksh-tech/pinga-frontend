<template>
  <div>
    <!-- Daimond list -->
    <div class="vx-card p-6">
      <vs-table
        id="diamond-list"
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
        :data="DaimondRecords"
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
              @click="toggleAddDiamondModal"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add {{  module_name }}</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="Diamond.name">Diamond Name</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td class="text-left">{{ tr.name || '-' }} </vs-td>
            <vs-td>
              <div class="inline-flex">
                <vx-tooltip :text="`Edit ${module_name}`">
                  <feather-icon @click="toggleEditDiamondModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip :text="`Delete ${module_name}`">
                  <feather-icon @click="deleteRecord(tr._id)" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination
      v-if="FilteredCount"
        v-model="page"
        :total="totalPages"
        :max="totalPages / length > 7 ? 7 : 5"
        class="mt-8"
        @change="handleChangePage"
      ></vs-pagination>
    </div>

    <!-- Add Diamond modal -->
    <add-Diamond-modal :module_name="module_name" @update-data="getData" v-if="isAddDiamondModalMounted" :showModal.sync="isAddDiamondModalShow" />

    <!-- Edit Diamond modal -->
    <Edit-Diamond-modal :module_name="module_name" @update-data="getData" v-if="isEditDiamondModalMounted" :data="selectedRecord" :showModal.sync="isEditDiamondModalShow" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddDiamondModal from '@/views/diamond/AddDiamondModal'
import EditDiamondModal from '@/views/diamond/EditDiamondModal'

export default {
  name: 'DiamondList',

  /** Components */
  components: {
    AddDiamondModal,
    EditDiamondModal
  },

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name:'Diamond',

    // add Diamond modal
    isAddDiamondModalMounted: false,
    isAddDiamondModalShow: false,

    // Edit Diamond modal
    isEditDiamondModalMounted: false,
    isEditDiamondModalShow: false,
    selectedRecord: null
  }),

  /** computed */
  computed: {
    ...mapState('diamond', ['DiamondRecords', 'total', 'FilteredCount', 'listLoading']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('diamond', {
      getDiamondList: 'getDiamondList',
      deleteDiamondRecord: 'deleteDiamondRecord'
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

    /** Diamond List API */
    getData() {
      this.getDiamondList({
        order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add Diamond modal
    toggleAddDiamondModal() {
      this.isAddDiamondModalMounted = true
      this.isAddDiamondModalShow = true
    },

    // Edit Diamond modal
    toggleEditDiamondModal(data) {
      this.isEditDiamondModalMounted = true
      this.isEditDiamondModalShow = true
      this.selectedRecord = data
    },

    /** Delete Diamond Confirmation */
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

    /** Delete Diamond API */
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteDiamondRecord(id)
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
          container: '#diamond-list"',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#diamond-list" > .con-vs-loading')
      }
    },

    // add Diamond modal
    isAddDiamondModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddDiamondModalMounted = false
          }, 0)
        }
      }
    },

    // edit Diamond modal
    isEditDiamondModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditDiamondModalMounted = false
          }, 0)
        }
      }
    }
  },

  /** On Rendering */
  mounted() {
    this.getData()
  }
}
</script>
