<template>
  <div>
    <!-- Category list -->
    <div class="vx-card p-6">
      <vs-table
        id="category_list"
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
        :data="MetalRecords"
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
                      of {{ total }}
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
            <div class="flex items-center mr-4">
              <vs-input v-model="pricePerGram" type="number" placeholder="Enter Price Per Gram" class="mr-2" />
              <vs-button @click="updateMetalPrice" :disabled="!pricePerGram">Update Price</vs-button>
            </div>
            <div
              @click="toggleAddMetalModal"
              v-if="checkPermissionSlug(['metals_create'])"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add Metal</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="category.name">Metal Name</vs-th>
          <vs-th sort-key="category.sort_name">Short Name</vs-th>
          <vs-th sort-key="category.price_per_gram">Price Per Gram</vs-th>
          <vs-th sort-key="category.name">Metal Carat</vs-th>
          <vs-th sort-key="category.name">Metal Color</vs-th>
          <vs-th v-if="checkPermissionSlug(['metals_edit', 'metals_delete'])">Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td class="text-left">{{ tr.name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.sort_name || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.price_per_gram || '-' }} </vs-td>
            <vs-td class="text-left">{{ tr.metal_carat || '-' }} </vs-td>
            <!-- <vs-td class="text-left">{{ tr.metal_color || '-' }}÷ </vs-td> -->
            <vs-td class="text-left"
              ><vs-chip :color="getChipColor(tr.metal_color)" class="mx-auto font-semibold text-sm">
                <p class="fn12 p-2 font-semibold capitalize">{{ tr.metal_color }}</p>
              </vs-chip>
            </vs-td>
            <vs-td v-if="checkPermissionSlug(['metals_edit', 'metals_delete'])">
              <div class="inline-flex">
                <vx-tooltip :text="`Edit ${module_name}`" v-if="checkPermissionSlug(['metals_edit'])">
                  <feather-icon @click="toggleEditMetalModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip :text="`Delete ${module_name}`" v-if="checkPermissionSlug(['metals_delete'])">
                  <feather-icon @click="deleteRecord(tr._id)" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination @onchange="handleChangePage" v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8"></vs-pagination>
    </div>

    <!-- Add metal modal -->
    <AddMetalModal :module_name="module_name" @update-data="getData" v-if="isAddMetalModalMounted" :showModal.sync="isAddMetalModalShow" />

    <!-- Edit metal modal -->
    <EditMetalModal :module_name="module_name" @update-data="getData" v-if="isEditMetalModalMounted" :data="selectedRecord" :showModal.sync="isEditMetalModalShow" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import EditMetalModal from './EditMetalModal.vue'
import AddMetalModal from './AddMetalModal.vue'

export default {
  name: 'CategoryList',

  /** Components */
  components: {
    AddMetalModal,
    EditMetalModal
  },

  /** Data */
  data() {
    return {
      pricePerGram: '',
      order: [],
      records: [1, 2, 3],
      length: 10,
      page: 1,
      search: '',
      module_name: 'Metal',

      // add category modal
      isAddMetalModalMounted: false,
      isAddMetalModalShow: false,

      // Edit category modal
      isEditMetalModalMounted: false,
      isEditMetalModalShow: false,
      selectedRecord: null
    }
  },

  /** computed */
  computed: {
    ...mapState('metal', ['MetalRecords', 'total', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('metal', {
      getMetalList: 'getMetalList',
      deleteMetalRecord: 'deleteMetalRecord',
      updateMetalRecordPrice: 'updateMetalRecordPrice'
    }),

    getChipColor(metalColor) {
      // Define your color mapping logic here
      const colorMap = {
        yellow: 'warning', // assuming 'warning' is a predefined color in your system
        pink: 'pink',
        blue: 'primary', // example
        red: 'danger', // example
        green: 'success' // example
        // add more color mappings as needed
      }
      return colorMap[metalColor] || 'primary' // default color if metalColor is not in the map
    },

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

    /** Category List API */
    getData() {
      this.getMetalList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add category modal
    toggleAddMetalModal() {
      this.isAddMetalModalMounted = true
      this.isAddMetalModalShow = true
    },

    // Edit category modal
    toggleEditMetalModal(data) {
      this.isEditMetalModalMounted = true
      this.isEditMetalModalShow = true
      this.selectedRecord = data
    },

    /** Delete category Confirmation */
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

    /** Update Metal Price */
    async updateMetalPrice() {
      if (!this.pricePerGram) return

      try {
        const { message } = await this.updateMetalRecordPrice({
          data: {
            price_per_gram: this.pricePerGram
          }
        })

        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })

        this.pricePerGram = ''
        this.getData()
      } catch (error) {
        this.$vs.notify({
          title: 'Error',
          text: error.message || 'Failed to update price',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'danger'
        })
      }
    },

    /** Delete category API */
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteMetalRecord(id)
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
          container: '#category_list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#category_list > .con-vs-loading')
      }
    },

    // add category modal
    isAddMetalModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddMetalModalMounted = false
          }, 0)
        }
      }
    },

    // edit category modal
    isEditMetalModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditMetalModalMounted = false
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
