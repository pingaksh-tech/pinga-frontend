<template>
  <div>
    <!-- Tabs for Default and Retailer Price -->
    <div class="vx-card p-6">
      <vs-tabs v-model="activeTab">
        <vs-tab label="Default">
          <div class="tab-content">
            <vs-table
              id="diamond-pricing-list"
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
              :data="DiamondPricingRecords"
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
                    @click="toggleAddDiamondModal('Default')"
                    v-if="checkPermissionSlug(['latest_Products_create'])"
                    class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
                  >
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add diamond</span>
                  </div>
                </div>
              </template>

              <template slot="thead">
                <vs-th>Sr#</vs-th>
                <vs-th sort-key="diamond_slieve_size">Slieve Size</vs-th>
                <vs-th sort-key="slieve_size_range">Slieve Size Range</vs-th>
                <vs-th sort-key="mm_size">MM Size</vs-th>
                <vs-th sort-key="carat">CT</vs-th>
                <vs-th>Shape</vs-th>
                <vs-th>Weight Range</vs-th>
                <!-- Dynamically render clarity headers. -->
                <vs-th v-for="(header, index) in DiamondClarityRecords" :key="index"> {{ header.name }} </vs-th>
                <vs-th v-if="checkPermissionSlug(['diamond_Pricings_edit'])">Action</vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td>
                    {{ page * length - (length - i - 1) }}
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.diamond_slieve_size || '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.slieve_size_range || '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.mm_size || '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.carat || '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.shape && tr.shape.length ? tr.shape.join(', ') : '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">
                      {{ tr.weight_range ? tr.weight_range.min : '' }}
                      -
                      {{ tr.weight_range ? tr.weight_range.max : '' }}
                    </p>
                  </vs-td>
                  <!-- Dynamically render clarity prices -->
                  <vs-td v-for="(header, index) in DiamondClarityRecords" :key="index" class="text-left">
                    <p class="capitalize">
                      {{ formatPrice(getClarityPrice(tr.clarity, header.name)) || '-' }}
                    </p>
                  </vs-td>
                  <vs-td v-if="checkPermissionSlug(['diamond_Pricings_edit'])">
                    <div class="inline-flex">
                      <vx-tooltip text="Edit Diamond Pricing">
                        <feather-icon @click="toggleEditDiamondModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mx-2 flex justify-center hover:text-primary cursor-pointer" />
                      </vx-tooltip>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <!-- Custom Pagination -->
            <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8"></vs-pagination>
          </div>
        </vs-tab>
        <vs-tab label="Retailer Price">
          <div class="tab-content">
            <vs-table
              id="diamond-pricing-list-retailer"
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
              :data="DiamondPricingRecords"
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
                    @click="toggleAddDiamondModal('Retailer Price')"
                    v-if="checkPermissionSlug(['latest_Products_create'])"
                    class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
                  >
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add diamond</span>
                  </div>
                </div>
              </template>

              <template slot="thead">
                <vs-th>Sr# </vs-th>
                <vs-th>Retailer Code</vs-th>
                <vs-th sort-key="diamond_slieve_size">Slieve Size</vs-th>
                <vs-th sort-key="slieve_size_range">Slieve Size Range</vs-th>
                <vs-th sort-key="mm_size">MM Size</vs-th>
                <vs-th sort-key="carat">CT</vs-th>
                <vs-th>SHAPE</vs-th>
                <vs-th>WEIGHT RANGE</vs-th>
                <!-- Dynamically render clarity headers. -->
                <vs-th v-for="(header, index) in DiamondClarityRecords" :key="index"> {{ header.name }} </vs-th>
                <vs-th v-if="checkPermissionSlug(['diamond_Pricings_edit'])">Action</vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td>
                    {{ page * length - (length - i - 1) }}
                  </vs-td>
                  <vs-td>
                    <p class="capitalize">
                      {{ tr.retailer && tr.retailer.length > 0 && tr.retailer[0].code ? tr.retailer[0].code : '-' }}
                    </p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.diamond_slieve_size || '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.slieve_size_range || '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.mm_size || '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.carat || '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">{{ tr.shape && tr.shape.length ? tr.shape.join(', ') : '-' }}</p>
                  </vs-td>
                  <vs-td class="text-left">
                    <p class="capitalize">
                      {{ tr.weight_range ? tr.weight_range.min : '' }}
                      -
                      {{ tr.weight_range ? tr.weight_range.max : '' }}
                    </p>
                  </vs-td>
                  <!-- Dynamically render clarity prices -->
                  <vs-td v-for="(header, index) in DiamondClarityRecords" :key="index" class="text-left">
                    <p class="capitalize">
                      {{ formatPrice(getClarityPrice(tr.clarity, header.name)) || '-' }}
                    </p>
                  </vs-td>
                  <vs-td v-if="checkPermissionSlug(['diamond_Pricings_edit'])">
                    <div class="inline-flex">
                      <vx-tooltip text="Edit Diamond Pricing">
                        <feather-icon @click="toggleEditDiamondModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mx-2 flex justify-center hover:text-primary cursor-pointer" />
                      </vx-tooltip>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <!-- Custom Pagination -->
            <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8"></vs-pagination>
          </div>
        </vs-tab>
      </vs-tabs>
      <diamond-modal
        :module_name="module_name"
        @update-data="getData"
        v-if="isDiamondModalMounted"
        :showModal.sync="isDiamondModalShow"
        :action_name="modalAction"
        :editData="selectedDiamond"
        :tabConfig="tabConfig"
        :clarityData="DiamondClarityRecords"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DiamondModal from './DiamondModal.vue'

export default {
  name: 'DiamondPricing',
  components: {
    DiamondModal
  },
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Diamond',
    isDiamondModalMounted: false,
    isDiamondModalShow: false,
    modalAction: 'Add',
    selectedDiamond: null,
    activeTab: 0, // 0 for Default, 1 for Retailer Price
    tabConfig: '',
    clarity: []
  }),
  computed: {
    ...mapState('diamondClarity', ['DiamondClarityRecords', 'FilteredCount', 'listLoading']),
    ...mapState('diamondPricing', ['DiamondPricingRecords', 'total', 'FilteredCount', 'listLoading']),
    // ...mapState('common', ['DiamondClarityList']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    },
    priceType() {
      return this.activeTab === 0 ? 'Default' : 'Retailer Price'
    }
  },
  methods: {
    ...mapActions('diamondClarity', {
      getDiamondClarityList: 'getDiamondClarityList'
    }),
    ...mapActions('diamondPricing', {
      getDiamondPricingList: 'getDiamondPricingList',
      updateDiamondPricing: 'updateDiamondPricing'
    }),
    ...mapActions('common', {
      getDiamondClarityDropdown: 'getDiamondClarityDropdown'
    }),
    getDiamondClarity() {
      this.getDiamondClarityList({
        type: 'dropdown'
      })
    },
    getClarityPrice(clarityArray, clarityName) {
      if (!clarityArray || !Array.isArray(clarityArray)) return null
      const clarity = clarityArray.find((item) => item.name === clarityName)
      return clarity ? clarity.price : null
    },
    toggleAddDiamondModal(config) {
      this.modalAction = 'Add'
      this.selectedDiamond = null
      this.isDiamondModalMounted = true
      this.isDiamondModalShow = true
      this.tabConfig = config
    },
    toggleEditDiamondModal(row) {
      console.log(row, 'toggleEditDiamondModal >>>>>>>>> ......')
      this.modalAction = 'Edit'
      this.selectedDiamond = { ...row }
      this.isDiamondModalMounted = true
      this.isDiamondModalShow = true
      this.tabConfig = row.price_type
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
      this.getDiamondPricingList({
        limit: this.length,
        page: this.page,
        search: this.search,
        price_type: this.priceType
      })
    },
    getClarityData() {
      this.getDiamondClarityDropdown()
    },
    formatPrice(value) {
      if (typeof value !== 'number' || isNaN(value)) {
        return '-'
      }
      return '₹' + new Intl.NumberFormat('en-IN').format(value)
    }
  },
  watch: {
    listLoading() {
      if (this.listLoading) {
        this.$vs.loading({
          container: this.activeTab === 0 ? '#diamond-pricing-list' : '#diamond-pricing-list-retailer',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close(this.activeTab === 0 ? '#diamond-pricing-list > .con-vs-loading' : '#diamond-pricing-list-retailer > .con-vs-loading')
      }
    },
    page() {
      this.getData()
    },
    activeTab() {
      this.page = 1
      this.getData()
    },
    DiamondClarityRecords: {
      handler(newVal) {
        // console.log('DiamondClarityRecords updated:', newVal)
      },
      immediate: true, // if you also want to log the initial value
      deep: true // if you want to track nested changes
    }
  },
  mounted() {
    this.getData()
    this.getDiamondClarity()
  }
}
</script>

<style scoped>
.tab-content {
  padding-top: 1rem;
}
</style>
