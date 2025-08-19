<template>
  <div>
    <!-- Tabs for Default and Retailer Price -->
    <div class="vx-card p-6">
      <vs-tabs v-model="activeTab">
        <vs-tab label="Default">
          <div class="tab-content">
            <vs-table
              id="labour_price_list_default"
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
              :data="LabourPriceRecords"
            >
              <template slot="header">
                <div class="mb-2 flex items-center">
                  <div class="flex flex-wrap justify-between items-center">
                    <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                      <vs-dropdown vs-trigger-click class="cursor-pointer filter-font">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
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
                  <div
                    @click="toggleAddLabourPriceModal"
                    class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
                  >
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
                <vs-th v-if="checkPermissionSlug(['labour_Prices_edit', 'labour_Prices_delete'])">Action</vs-th>
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
                  <vs-td v-if="checkPermissionSlug(['labour_Prices_edit', 'labour_Prices_delete'])">
                    <div class="inline-flex">
                      <vx-tooltip :text="`Edit ${module_name}`" v-if="checkPermissionSlug(['labour_Prices_edit'])">
                        <feather-icon @click.stop="toggleEditLabourPriceModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                      </vx-tooltip>
                      <vx-tooltip :text="`Delete ${module_name}`" v-if="checkPermissionSlug(['labour_Prices_delete'])">
                        <feather-icon @click.stop="deleteRecord(tr._id)" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                      </vx-tooltip>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <!-- Custom Pagination -->
            <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8" @onchange="handleChangePage"></vs-pagination>
          </div>
        </vs-tab>
        <vs-tab label="Retailer Price">
          <div class="tab-content">
            <vs-table
              id="labour_price_list_retailer"
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
              :data="LabourPriceRecords"
            >
              <template slot="header">
                <div class="mb-2 flex items-center">
                  <div class="flex flex-wrap justify-between items-center">
                    <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                      <vs-dropdown vs-trigger-click class="cursor-pointer filter-font">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
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
                  <div
                    @click="toggleAddLabourPriceModal"
                    class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
                  >
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add {{ module_name }}</span>
                  </div>
                </div>
              </template>

              <template slot="thead">
                <vs-th>Sr#</vs-th>
                <vs-th>Retailer Code</vs-th>
                <vs-th sort-key="regular_price">Regular Price</vs-th>
                <vs-th sort-key="category_name">Category Name</vs-th>
                <vs-th sort-key="sub_category_name">Sub Category Name</vs-th>
                <vs-th sort-key="collection_name">Collection Name</vs-th>
                <vs-th v-if="checkPermissionSlug(['labour_Prices_edit', 'labour_Prices_delete'])">Action</vs-th>
              </template>

              <template slot-scope="{ data }" ref="tableBody">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td>
                    {{ page * length - (length - i - 1) }}
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.retailer && tr.retailer.length > 0 ? tr.retailer[0].code : '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">{{ tr.regular_price || '-' }} </vs-td>
                  <vs-td class="text-left">{{ tr.category_name || '-' }} </vs-td>
                  <vs-td class="text-left">{{ tr.sub_category_name || '-' }} </vs-td>
                  <vs-td class="text-left">{{ tr.collection_name || '-' }} </vs-td>
                  <vs-td v-if="checkPermissionSlug(['labour_Prices_edit', 'labour_Prices_delete'])">
                    <div class="inline-flex">
                      <vx-tooltip :text="`Edit ${module_name}`" v-if="checkPermissionSlug(['labour_Prices_edit'])">
                        <feather-icon @click.stop="toggleEditLabourPriceModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                      </vx-tooltip>
                      <vx-tooltip :text="`Delete ${module_name}`" v-if="checkPermissionSlug(['labour_Prices_delete'])">
                        <feather-icon @click.stop="deleteRecord(tr._id)" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                      </vx-tooltip>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <!-- Custom Pagination -->
            <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8" @onchange="handleChangePage"></vs-pagination>
          </div>
        </vs-tab>
      </vs-tabs>

      <!-- Add Labour Price modal -->
      <action-modal :module_name="module_name" @update-data="getData" v-if="isAddLabourPriceModalMounted" :showModal.sync="isAddLabourPriceModalShow" :action_name="'Add'" :price_type="priceType" />

      <!-- Edit Labour Price modal -->
      <action-modal
        :module_name="module_name"
        @update-data="getData"
        v-if="isEditLabourPriceModalMounted"
        :showModal.sync="isEditLabourPriceModalShow"
        :data="selectedRecord"
        :action_name="'Update'"
        :price_type="priceType"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import actionModal from '@/views/labour-price/action'
import { mapGetters } from 'vuex'

export default {
  name: 'LabourPriceList',

  /** Components */
  components: {
    actionModal
  },

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Labour Price',
    activeTab: 0, // 0 for Default, 1 for Retailer Price
    isAddLabourPriceModalMounted: false,
    isAddLabourPriceModalShow: false,
    isEditLabourPriceModalMounted: false,
    isEditLabourPriceModalShow: false,
    selectedRecord: null
  }),

  /** Computed */
  computed: {
    ...mapState('labourPrice', ['LabourPriceRecords', 'subtotal', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    },
    priceType() {
      return this.activeTab === 0 ? 'Default' : 'Retailer Price'
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
        limit: this.length,
        page: this.page,
        search: this.search,
        price_type: this.priceType
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
          container: this.activeTab === 0 ? '#labour_price_list_default' : '#labour_price_list_retailer',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close(this.activeTab === 0 ? '#labour_price_list_default > .con-vs-loading' : '#labour_price_list_retailer > .con-vs-loading')
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
    },

    activeTab() {
      this.page = 1
      this.getData()
    }
  },

  /** On Rendering */
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>
.tab-content {
  padding-top: 1rem;
}
</style>