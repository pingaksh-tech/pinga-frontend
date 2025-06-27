<template>
  <div>
    <!-- Labour Price list -->
    <div class="vx-card p-6">
      <vs-table id="labour_price_list" class="vs-con-loading__container" stripe :sst="true" maxHeight="800px"
        @search="updateSearchQuery" @change-page="handleChangePage" @sort="handleSort" :total="FilteredCount"
        :max-items="length" search :data="LabourPriceRecords">
        <template slot="header">
          <div class="mb-2 flex items-center">
            <div class="flex flex-wrap justify-between items-center">
              <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer filter-font">
                  <div
                    class="p-4 border border-solid d-theme-border-grey-light rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      {{ page * length - (length - (FilteredCount && 1)) }}
                      -
                      {{ FilteredCount - page * length > 0 ? page * length : FilteredCount }}
                      of {{ subtotal }}
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
            <div @click="toggleAddLabourPriceModal"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add {{ module_name }}</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="regular_price">Regular Price</vs-th>
          <vs-th sort-key="category_name">Category Name</vs-th>
          <vs-th sort-key="sub_category_name">Sub Category Name</vs-th>
          <vs-th sort-key="collection_name">Collection Name</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td class="text-left">{{ tr.regular_price || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.category_name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.sub_category_name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.collection_name || '-' }} </vs-td>
            <vs-td>
              <div class="inline-flex">
                <vx-tooltip :text="`Edit ${module_name}`">
                  <feather-icon @click.stop="toggleEditLabourPriceModal(tr)" icon="EditIcon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip :text="`Delete ${module_name}`">
                  <feather-icon @click.stop="deleteRecord(tr._id)" icon="Trash2Icon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5"
        class="mt-8" @onchange="handleChangePage"></vs-pagination>
    </div>

    <!-- Add Labour Price modal -->
    <action-modal :module_name="module_name" @update-data="getData" v-if="isAddLabourPriceModalMounted"
      :showModal.sync="isAddLabourPriceModalShow" :action_name="'Add'" />

    <!-- Edit Labour Price modal -->
    <action-modal :module_name="module_name" @update-data="getData" v-if="isEditLabourPriceModalMounted"
      :showModal.sync="isEditLabourPriceModalShow" :data="selectedRecord" :action_name="'Update'" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import actionModal from '@/views/labour-price/action'

export default {
  name: 'LabourPriceList',

  /** Components */
  components: {
   actionModal,
  },

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Labour Price',

    // add Latest price modal
    isAddLabourPriceModalMounted: false,
    isAddLabourPriceModalShow: false,

    // Edit Latest price modal
    isEditLabourPriceModalMounted: false,
    isEditLabourPriceModalShow: false,
    selectedRecord: null
  }),

  /** computed */
  computed: {
    ...mapState('labourPrice', ['LabourPriceRecords', 'subtotal', 'FilteredCount', 'listLoading']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('labourPrice', {
      getLabourPriceList: 'getLabourPriceList',
      deleteLabourPriceRecord: 'deleteLabourPriceRecord'
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

    /** Labour Price List API */
    getData() {
      this.getLabourPriceList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add Labour Price modal
    toggleAddLabourPriceModal() {
      this.isAddLabourPriceModalMounted = true
      this.isAddLabourPriceModalShow = true
    },

    // Edit Labour Price modal
    toggleEditLabourPriceModal(data) {
      this.isEditLabourPriceModalMounted = true
      this.isEditLabourPriceModalShow = true
      this.selectedRecord = data
    },

    /** Delete Labour Price Confirmation */
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

    /** Delete Labour Price API */
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteLabourPriceRecord(id)
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
          container: '#labour_price_list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#labour_price_list > .con-vs-loading')
      }
    },

    // add Labour Price modal
    isAddLabourPriceModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddLabourPriceModalMounted = false
          }, 0)
        }
      }
    },

    // edit Labour Price modal
    isEditLabourPriceModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditLabourPriceModalMounted = false
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
