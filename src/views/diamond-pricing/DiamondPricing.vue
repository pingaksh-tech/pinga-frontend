<template>
  <div>
    <!-- DiamondPricing list -->
    <div class="vx-card p-6">
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
              @click="toggleAddDiamondModal"
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
          <vs-th sort-key="vvs_ef">VVS-EF</vs-th>
          <vs-th sort-key="vs_si_gh">VS-SI-GH</vs-th>
          <vs-th sort-key="si2_i1_gh">VI2-I1-GH</vs-th>
          <vs-th sort-key="vs_si_hi">VS-SI-HI</vs-th>
          <vs-th sort-key="si_hi">SI-HI</vs-th>
          <vs-th sort-key="si_hi">SI-GH</vs-th>
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
              <p class="capitalize">{{ formatPrice(tr.vvs_ef) || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ formatPrice(tr.vs_si_gh) || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ formatPrice(tr.vvs_si_hi) || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ formatPrice(tr.si2_i1_gh) || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ formatPrice(tr.si_hi) || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ formatPrice(tr.si_gh) || '-' }}</p>
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
    <diamond-modal :module_name="module_name" @update-data="getData" v-if="isDiamondModalMounted" :showModal.sync="isDiamondModalShow" :action_name="modalAction" :editData="selectedDiamond" />
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
    selectedDiamond: null
  }),
  computed: {
    ...mapState('diamondPricing', ['DiamondPricingRecords', 'total', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },
  methods: {
    ...mapActions('diamondPricing', {
      getDiamondPricingList: 'getDiamondPricingList',
      updateDiamondPricing: 'updateDiamondPricing'
    }),
    toggleAddDiamondModal() {
      this.modalAction = 'Add'
      this.selectedDiamond = null
      this.isDiamondModalMounted = true
      this.isDiamondModalShow = true
    },
    toggleEditDiamondModal(row) {
      this.modalAction = 'Edit'
      this.selectedDiamond = { ...row }
      this.isDiamondModalMounted = true
      this.isDiamondModalShow = true
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
        search: this.search
      })
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
          container: '#diamond-pricing-list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#diamond-pricing-list > .con-vs-loading')
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