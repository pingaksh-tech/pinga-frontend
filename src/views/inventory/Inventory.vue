<template>
  <div>
    <!-- Inventory list -->
    <div class="vx-card p-6">
      <div class="vx-row">
        <div class="vx-col w-1/4 mb-2">
          <label class="vs-input--label block">Inventory Import</label>
          <input
            type="file"
            class="border p-2 rounded w-full"
            name="inventory_import"
            ref="files"
            accept=".xlsx"
            style="border: 1px solid rgba(0, 0, 0, 0.2)"
            data-vv-as="Inventory Import"
            @change="handleFileUpload"
          />
          <span class="text-danger text-xs" v-show="errors.has(`inventory_import`)">{{ errors.first(`inventory_import`) }}</span>
        </div>
        <div class="vx-col w-1/8 mb-2">
          <label class="vs-input--label block">&nbsp;</label>
          <vs-button class="mr-2 vs-con-loading__container" @click="inventoryImport">Import</vs-button>
        </div>
        <!-- <div class="vx-col w-1/2 mb-2"></div> -->
        <div class="vx-col w-1/3 mb-2x">
          <label class="vs-input--label block">&nbsp;</label>
          <vs-button class="mr-2 vs-con-loading__container" @click="downloadPDFSample">Download Sample</vs-button>
        </div>

        <!-- Category -->
        <div class="vx-col w-1/8 mb-2 ml-8">
          <label class="vs-input--label block">&nbsp;</label>
          <select-2
            class="w-full category-input"
            name="Category"
            placeholder="Filter by Category"
            autocomplete
            :ssr="true"
            :multiple="true"
            v-model="categoryFilter"
            :value="categoryFilter"
            action="common/getCategories"
            @input="(item) => (categoryFilter = item && item.value)"
          />
          <span class="text-danger text-sm" v-show="errors.has('Category')">{{ errors.first('Category') }}</span>
        </div>

        <!-- Sub Category -->
        <div class="vx-col w-1/8 mb-2 ml-8">
          <label class="vs-input--label block">&nbsp;</label>
          <select-2
            class="w-full category-input"
            name="Category"
            placeholder="Filter by Sub Category"
            autocomplete
            :ssr="true"
            :multiple="true"
            v-model="subCategoryFilter"
            :value="subCategoryFilter"
            action="common/getSubCategoryByCategoryId"
            @input="(item) => (subCategoryFilter = item && item.value)"
          />
          <span class="text-danger text-sm" v-show="errors.has('Sub Category')">{{ errors.first('Sub Category') }}</span>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-1/4 mb-2">
          <label class="vs-input--label block">Images upload</label>
          <input
            type="file"
            class="border p-2 rounded w-full"
            name="inventory_images"
            ref="files"
            accept=".jpg, .png , .jpeg"
            style="border: 1px solid rgba(0, 0, 0, 0.2)"
            data-vv-as="image upload"
            @change="handleImageUpload"
            multiple
          />
          <span class="text-danger text-xs" v-show="errors.has(`inventory_images`)">{{ errors.first(`inventory_images`) }}</span>
        </div>
        <div class="vx-col w-1/8 mb-2">
          <label class="vs-input--label block">&nbsp;</label>
          <vs-button class="mr-2 vs-con-loading__container" @click="imageImport">Import</vs-button>
        </div>
      </div>
      <vs-divider></vs-divider>
      <vs-table
        id="inventory-list"
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
        :data="InventoryRecords"
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
              @click="toggleAddInventoryModal"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add {{ module_name }}</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="Inventory.name">Inventory Name</vs-th>
          <vs-th sort-key="Inventory.category_id">Category</vs-th>
          <vs-th sort-key="Inventory.sub_category_id">Sub Category</vs-th>
          <vs-th sort-key="Inventory.sku">SKU</vs-th>
          <vs-th sort-key="Inventory.production_name">Production Name</vs-th>
          <vs-th sort-key="Inventory.manufacturing_price">Manufacturing Price</vs-th>
          <vs-th sort-key="Inventory.gender">Gender</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ tr.name || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ tr.category ? tr.category.name : '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ tr.sub_category ? tr.sub_category.name : '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ tr.sku || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ tr.production_name || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ formatPrice(tr.manufacturing_price) || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ tr.gender }}</p>
            </vs-td>
            <vs-td>
              <div class="inline-flex">
                <vx-tooltip :text="`Edit ${module_name}`">
                  <feather-icon @click="toggleEditInventoryModal(tr._id)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
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
      <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8"></vs-pagination>
    </div>
    <vs-popup class="holamundo" title="Import Errors" :active.sync="showErrorModal">
      <div class="p-4">
        <div v-for="(error, index) in errorList" :key="index" class="mb-6">
          <p class="mb-2 font-semibold">{{ error.message }}</p>
          <div class="max-h-64 overflow-y-auto border rounded p-2">
            <ul class="list-disc pl-5">
              <li v-for="(product, pIndex) in error.product" :key="pIndex">{{ product }}</li>
            </ul>
          </div>
        </div>
        <vs-button @click="downloadErrorLog" class="mt-4">Download Error Log</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
export default {
  name: 'InventoryList',

  /** components */
  components: {
    Select2
  },

  /** Data */
  data: () => ({
    categoryFilter: [],
    subCategoryFilter: [],
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Inventory',
    inventory_import: null,
    inventory_images: [],
    showErrorModal: false,
    errorList: [] // Changed from errorMessage/errorProducts to errorList
  }),

  /** computed */
  computed: {
    ...mapState('inventory', ['InventoryRecords', 'total', 'FilteredCount', 'listLoading']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    },
    validateForm() {
      return !this.errors.any()
    },
    categoryErrors() {
      return this.errors.filter((error) => error.message)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('inventory', {
      getInventoryList: 'getInventoryList',
      deleteInventoryRecord: 'deleteInventoryRecord',
      inventoryImportApi: 'inventoryImportApi',
      imageImportApi: 'imageImportApi'
    }),

    // Add this method to handle category filter changes
    // handleCategoryFilter() {
    //   // this.categoryFilterValue = this.categoryFilter ? this.categoryFilter.value : null
    //   this.page = 1 // Reset to first page when filter changes
    //   this.getData()
    // },

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

    /** Inventory List API */
    getData() {
      this.getInventoryList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search,
        categoryId: this.categoryFilter ? this.categoryFilter : null,
        subCategoryId: this.subCategoryFilter ? this.subCategoryFilter : null
      })
    },

    // Add Inventory modal
    toggleAddInventoryModal() {
      this.$router.push(`/inventory/add`)
    },

    // Edit Inventory modal
    toggleEditInventoryModal(id) {
      this.$router.push(`/inventory/${id}/edit`)
    },

    /** Delete Inventory Confirmation */
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

    /** Delete Inventory API */
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteInventoryRecord(id)
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

    /** FormatPrice */
    formatPrice(value) {
      // Using the numeral library
      return '₹' + new Intl.NumberFormat('en-IN').format(value)
    },
    downloadPDFSample() {
      const url = 'https://pingaksh-storage.s3.ap-south-1.amazonaws.com/import_sample/Inventory_Sample.xlsx'
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'sample.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    async inventoryImport() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData()
        data.append('inventory_import', this.inventory_import)

        const { message } = await this.inventoryImportApi(data)
        this.$emit('update-data', true)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
      } catch ({ data }) {
        if (data && data.length > 0) {
          this.errorList = data // Store all error objects
          this.showErrorModal = true
        } else {
          this.$vs.notify({
            title: 'Error',
            text: 'Unknown error occurred during import',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'primary'
          })
        }
      }
    },
    downloadErrorLog() {
      let errorContent = ''
      this.errorList.forEach((error) => {
        errorContent += `Error: ${error.message}\n`
        errorContent += `Affected Products:\n${error.product.join('\n')}\n\n`
      })

      const blob = new Blob([errorContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'inventory_import_errors.txt'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    async imageImport() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData()

        for (const value of this.inventory_images) {
          data.append('inventory_images', value)
        }

        const { message } = await this.imageImportApi(data)
        this.$emit('update-data', true)
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

    handleFileUpload(e) {
      const file = e.target.files[0]

      // Check if a file is selected
      if (!file) {
        this.$vs.notify({
          title: 'Error',
          text: 'No file selected',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
        return
      }
      this.inventory_import = file
    },
    handleImageUpload(e) {
      this.inventory_images = []

      const files = Array.from(e.target.files) // Convert FileList to array
      files.forEach((file) => {
        // Check if a file is selected
        if (!file) {
          this.$vs.notify({
            title: 'Error',
            text: 'No file selected',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'primary'
          })
          return
        }
        this.inventory_images.push(file)
      })
    }
  },

  /** Watchers */
  watch: {
    categoryFilter() {
      this.page = 1 // Reset to first page when filter changes
      this.getData()
    },
    subCategoryFilter() {
      this.page = 1 // Reset to first page when filter changes
      this.getData()
    },
    listLoading() {
      if (this.listLoading) {
        this.$vs.loading({
          container: '#inventory-list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#inventory-list > .con-vs-loading')
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
<style scoped>
/* Optional: Add some spacing between error sections */
.mb-6 {
  margin-bottom: 1.5rem;
}
</style>
