<template>
  <div>
    <!-- DiamondPricing list -->
    <div class="vx-card p-6">
      <vs-table id="diamond-pricing-list" class="vs-con-loading__container" stripe :sst="true" maxHeight="800px"
        @search="updateSearchQuery" @change-page="handleChangePage" @sort="handleSort" :total="FilteredCount"
        :max-items="length" search :data="DiamondPricingRecords">
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
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="diamond_slieve_size">Slieve Size </vs-th>
          <vs-th sort-key="slieve_size_range">Slieve Size Range</vs-th>
          <vs-th sort-key="mm_size">MM Size</vs-th>
          <vs-th sort-key="carat">CT</vs-th>
          <vs-th sort-key="vvs_ef">VVS-EF</vs-th>
          <vs-th sort-key="vs_si_gh">VS-SI-GH</vs-th>
          <vs-th sort-key="vs_si_hi">VS-SI-HI</vs-th>
          <vs-th sort-key="si_hi">SI-HI</vs-th>
          <vs-th>Action</vs-th>
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
              <vs-input v-if="tr.edit" v-model="tr.vvs_ef" type="number" />
              <p v-else class="capitalize">{{ formatPrice(tr.vvs_ef) }}</p>
            </vs-td>
            <vs-td class="text-left">
              <vs-input v-if="tr.edit" v-model="tr.vs_si_gh" type="number" />
              <p v-else class="capitalize">{{ formatPrice(tr.vs_si_gh) }}</p>
            </vs-td>
            <vs-td class="text-left">
              <vs-input v-if="tr.edit" v-model="tr.vs_si_hi" type="number" />
              <p v-else class="capitalize">{{ formatPrice(tr.vs_si_hi) }}</p>
            </vs-td>
            <vs-td class="text-left">
              <vs-input v-if="tr.edit" v-model="tr.si_hi" type="number" />
              <p v-else class="capitalize">{{ formatPrice(tr.si_hi) }}</p>
            </vs-td>
            <vs-td>
              <div class="inline-flex">
                <vx-tooltip :text="tr.edit ? `Save ${module_name}` : `Edit ${module_name}`">
                  <feather-icon @click="tr.edit ? saveEdit(tr) : toggleEdit(tr)"
                    :icon="tr.edit ? 'CheckIcon' : 'EditIcon'"
                    svgClasses="h-5 w-5 mx-2 felx justify-center hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip v-if="tr.edit" text="Remove">
                  <feather-icon @click="closeEdit(tr)" icon="XIcon"
                    svgClasses="h-5 w-5 felx justify-center hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>

            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5"
        class="mt-8"></vs-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DiamondPricing',

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'DiamondPricing',
  }),

  /** computed */
  computed: {
    ...mapState('diamondPricing', ['DiamondPricingRecords', 'total', 'FilteredCount', 'listLoading']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('diamondPricing', {
      getDiamondPricingList: 'getDiamondPricingList',
      updateDiamondPricing: 'updateDiamondPricing',
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

    /** DiamondPricing List API */
    getData() {
      this.getDiamondPricingList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },


    // Edit DiamondPricing modal
    toggleEdit(row) {
      this.$set(row, 'edit', true);
    },
    // Save the edited data

    async saveEdit(row) {
      const data = {
        si_hi: row.si_hi,
        vs_si_gh: row.vs_si_gh,
        vs_si_hi: row.vs_si_hi,
        vvs_ef: row.vvs_ef,
      }
      const diamondPricingId = row._id;
      try {
        const { message } = await this.updateDiamondPricing({ diamondPricingId, data })
        this.$set(row, 'edit', false);
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
    },

    closeEdit(row) {
      this.$set(row, 'edit', false);
    },

    /** FormatPrice */
    formatPrice(value) {
      // Using the numeral library
      return '₹' + new Intl.NumberFormat('en-IN').format(value)
    }
  },

  /** Watchers */
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

  /** On Rendering */
  mounted() {
    this.getData()
  }
}
</script>
