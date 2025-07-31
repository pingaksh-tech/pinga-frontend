<template>
  <div>
    <!-- Inventory list -->
    <div class="vx-card p-6">
      <div class="vx-row">
        <div class="flex align-center items-center justify-items-center pl-4 gap-8">
          <div class="vx-col w-1/7">
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

          <vs-button :disabled="createLoading" class="mr-2 mt-5 vs-con-loading__container" @click="imageImport">Import</vs-button>
          <vs-button :disabled='importLoading' id="import-loading" class="mr-2 mt-5 vs-con-loading__container" @click="downloadPDFSample">Download Sample</vs-button>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-1/7 pt-2">
          <label class="vs-input--label block">Inventory Import *</label>
          <div class="w-[269px] p-1">
            <input
              type="file"
              class="border p-2 rounded w-full"
              name="inventory_import"
              ref="files"
              accept=".xlsx"
              style="border: 1px solid rgba(0, 0, 0, 0.2)"
              data-vv-as="Inventory Import"
              v-validate="'required'"
              @change="handleFileUpload"
            />
          </div>
          <span class="text-danger text-sm" v-show="errors.has('inventory_import')">{{ errors.first('inventory_import') }}</span>
        </div>

        <div class="vx-col w-1/7 pt-2">
          <label class="vs-input--label">Category </label>
          <select-2
            class="w-full category-input"
            name="Category"
            placeholder="Select Category"
            :value="form.categoryId"
            @input="(item) => (form.categoryId = item && item.value)"
            autocomplete
            :ssr="true"
            :multiple="false"
            v-model="categoryID"
            action="common/getCategories"
            data-vv-as="Category"
          />
          <!-- <span class="text-danger text-sm" v-show="errors.has('Category')">{{ errors.first('Category') }}</span> -->
        </div>

        <!-- Sub Category -->
        <div class="vx-col w-1/7 pt-2">
          <label class="vs-input--label">Sub Category </label>
          <select-2
            class="w-full category-input"
            name="Sub Category"
            placeholder="Select Sub Category"
            :value="form.subCategoryId"
            @input="(item) => (form.subCategoryId = item && item.value)"
            :options="SubCategoryList"
            action="common/getSubCategoryByCategoryId"
            :actionCallRemove="false"
            autocomplete
            :ssr="true"
            :multiple="false"
            data-vv-as="Sub Category"
          />
          <!-- <span class="text-danger text-sm" v-show="errors.has('Sub Category')">{{ errors.first('Sub Category') }}</span> -->
        </div>

        <!-- Collection List -->

        <div class="vx-col w-1/7 pt-2">
          <label class="vs-input--label">Collection</label>
          <!-- Removed * -->
          <select-2
            class="w-full category-input"
            name="Collection"
            placeholder="Select Collection"
            :value="form.collectionId"
            @input="(item) => (form.collectionId = item && item.value)"
            autocomplete
            :ssr="true"
            :multiple="false"
            :options="collectionOption"
            data-vv-as="Inventory Type"
          />
          <!-- Removed validation error display since field is optional -->
        </div>

        <div class="vx-col w-1/7 pt-2">
          <label class="vs-input--label block">&nbsp;</label>
          <vs-button class="mr-2 vs-con-loading__container" @click="inventoryImport">Import</vs-button>
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
        :total="FilteredCountInventory"
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
                      {{ page * length - (length - (FilteredCountInventory && 1)) || 0 }}
                      -
                      {{ FilteredCountInventory - page * length > 0 ? page * length : FilteredCountInventory }}
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
              v-if="checkPermissionSlug(['inventories_create'])"
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
          <vs-th sort-key="Inventory.category_id" class="relative">
            <div class="flex items-start cursor-pointer" @click.stop="toggleCategoryFilter">
              <span>Category</span>
              <feather-icon icon="FilterIcon" svgClasses="h-4 w-4 ml-1" />
              <vs-dropdown vs-custom-content class="filter-dropdown" :class="{ active: showCategoryFilter }" v-model="showCategoryFilter">
                <div style="padding: 0.5rem; width: 200px">
                  <div class="flex flex-col" @click.stop>
                    <vs-checkbox v-for="(option, index) in categoryOptions" :key="index" v-model="categoryFilter" :vs-value="option.value" class="mb-1 flex" @click.native.stop>
                      {{ option.label }}
                    </vs-checkbox>
                    <div class="flex justify-between mt-2">
                      <vs-button size="small" @click="applyCategoryFilter" class="mr-1"> Apply </vs-button>
                      <vs-button size="small" type="flat" @click="clearCategoryFilter"> Clear </vs-button>
                    </div>
                  </div>
                </div>
              </vs-dropdown>
            </div>
          </vs-th>
          <vs-th sort-key="Inventory.sub_category_id" class="relative">
            <div class="flex items-start cursor-pointer" @click.stop="toggleSubCategoryFilter">
              <span>Sub Category</span>
              <feather-icon icon="FilterIcon" svgClasses="h-4 w-4 ml-1" />
              <vs-dropdown vs-custom-content class="filter-dropdown" :class="{ active: showSubCategoryFilter }" v-model="showSubCategoryFilter">
                <div style="padding: 0.5rem; width: 200px">
                  <div class="flex flex-col" @click.stop>
                    <vs-checkbox v-for="(option, index) in subCategoryOptionList" :key="index" v-model="subCategoryFilter" :vs-value="option.value" class="mb-1 flex" @click.native.stop>
                      {{ option.label }}
                    </vs-checkbox>
                    <div class="flex justify-between mt-2">
                      <vs-button size="small" @click="applySubCategoryFilter" class="mr-1"> Apply </vs-button>
                      <vs-button size="small" type="flat" @click="clearSubCategoryFilter"> Clear </vs-button>
                    </div>
                  </div>
                </div>
              </vs-dropdown>
            </div>
          </vs-th>
          <vs-th sort-key="Inventory.production_name">Production Name</vs-th>
          <vs-th sort-key="Inventory.manufacturing_price">Manufacturing Price</vs-th>
          <vs-th sort-key="Inventory.gender" class="relative">
            <div class="flex items-start cursor-pointer" @click.stop="toggleGenderFilter">
              <span>Gender </span>
              <feather-icon icon="FilterIcon" svgClasses="h-4 w-4 ml-1" />
              <vs-dropdown vs-custom-content class="gender-filter-dropdown" :class="{ active: showGenderFilter }" v-model="showGenderFilter">
                <div style="padding: 0.5rem; width: 150px">
                  <div class="flex flex-col" @click.stop>
                    <vs-checkbox v-for="(option, index) in genderOptions" :key="index" v-model="genderFilter" :vs-value="option.value" class="mb-1 flex" @click.native.stop>
                      {{ option.label }}
                    </vs-checkbox>
                    <div class="flex justify-between mt-2">
                      <vs-button size="small" @click="applyGenderFilter" class="mr-1"> Apply </vs-button>
                      <vs-button size="small" type="flat" @click="clearGenderFilter"> Clear </vs-button>
                    </div>
                  </div>
                </div>
              </vs-dropdown>
            </div>
          </vs-th>
          <vs-th v-if="checkPermissionSlug(['inventories_edit', 'inventories_delete'])">Action</vs-th>
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
              <p class="capitalize">{{ tr.production_name || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ formatPrice(tr.manufacturing_price) || '-' }}</p>
            </vs-td>
            <vs-td class="text-left">
              <p class="capitalize">{{ tr.gender }}</p>
            </vs-td>
            <vs-td v-if="checkPermissionSlug(['inventories_edit', 'inventories_delete'])">
              <div class="inline-flex">
                <vx-tooltip :text="`Edit ${module_name}`" v-if="checkPermissionSlug(['inventories_edit'])">
                  <feather-icon @click="toggleEditInventoryModal(tr._id)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip :text="`Delete ${module_name}`" v-if="checkPermissionSlug(['inventories_delete'])">
                  <feather-icon @click="deleteRecord(tr._id)" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
        <!-- <template v-slot:noData>
          <div class="text-center p-4">
            <p>No data available</p>
          </div>
        </template> -->
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination v-if="FilteredCountInventory" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8" @onchange="handleChangePage"></vs-pagination>
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
import { mapActions, mapState, mapGetters } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
export default {
  name: 'InventoryList',
  inject: ['$validator'],

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
    errorList: [], // Changed from errorMessage/errorProducts to errorList
    genderFilter: [], // Changed from null to array for multiple selections
    genderOptions: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Unisex', value: 'unisex' }
    ],
    showGenderFilter: false,
    showCategoryFilter: false,
    showSubCategoryFilter: false,
    categoryOptions: [],
    collectionOption: [],
    subCategoryOptions: [],
    categoryID: null,
    subCategoryID: null,
    SubCategoryList: [],
    subCategoryOptionList:[],
    form: {
      categoryId: null,
      subCategoryId: null,
      collectionId: null
    }
  }),

  /** computed */
  computed: {
    ...mapState('inventory', ['InventoryRecords', 'total', 'FilteredCountInventory', 'listLoading','createLoading','importLoading']),
    ...mapState('collection', ['CollectionRecords', 'subtotal', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCountInventory / this.length)
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
    ...mapActions('collection', {
      getCollectionList: 'getCollectionList'
      // deleteCollectionRecord: 'deleteCollectionRecord'
    }),
    toggleCategoryFilter() {
      this.showCategoryFilter = !this.showCategoryFilter
      if (this.showCategoryFilter && this.categoryOptions.length === 0) {
        this.fetchCategories()
      }
    },

    toggleSubCategoryFilter() {
      this.showSubCategoryFilter = !this.showSubCategoryFilter
      if (this.showSubCategoryFilter && this.subCategoryOptions.length === 0) {
        this.fetchSubCategories()
      }
    },
   resetImportForm() {
      this.form = {
        categoryId: null,
        subCategoryId: null,
        collectionId: null
      }
      this.categoryID = null
      this.subCategoryID = null
      this.inventoryType = null
      this.SubCategoryList = []
      this.inventory_import = null

      if (this.$refs.files) {
        this.$refs.files.value = ''
      }

      this.$validator.reset('inventory_import')
    },
    applyCategoryFilter() {
      this.showCategoryFilter = false
      this.page = 1
      this.getData()
    },

    clearCategoryFilter() {
      this.categoryFilter = []
      this.showCategoryFilter = false
      this.page = 1
      this.getData()
    },

    applySubCategoryFilter() {
      this.showSubCategoryFilter = false
      this.page = 1
      this.getData()
    },

    clearSubCategoryFilter() {
      this.subCategoryFilter = []
      this.showSubCategoryFilter = false
      this.page = 1
      this.getData()
    },

    async fetchCategories() {
      try {
        // Replace with your actual API call to get categories
        const response = await this.$store.dispatch('common/getCategories', {
          page: 1,
          limit: 1000
        })
        this.categoryOptions = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    async fetchCollection() {
      try {
        // Replace with your actual API call to get categories
        const response = await this.$store.dispatch('common/getCollections', {
          page: 1,
          limit: 1000,
          type: 'dropdown'
        })
        this.collectionOption = response.data
      } catch (error) {
        console.error('Error fetching collections:', error)
      }
    },
    async fetchSubCategory() {
      try {
        // Replace with your actual API call to get categories
        const response = await this.$store.dispatch('common/getSubCategoryByCategoryId', {
          page: 1,
          limit: 1000,
          type: 'dropdown'
        })
        this.subCategoryOptionList = response.data
      } catch (error) {
        console.error('Error fetching collections:', error)
      }
    },

    async fetchSubCategories() {
      try {
        // Replace with your actual API call to get subcategories
        const response = await this.$store.dispatch('common/getSubCategoryByCategoryId', {
          page: 1,
          limit: 1000
        })
        this.subCategoryOptions = response.data
      } catch (error) {
        console.error('Error fetching subcategories:', error)
      }
    },

    toggleGenderFilter() {
      this.showGenderFilter = !this.showGenderFilter
    },
    applyGenderFilter() {
      this.showGenderFilter = false
      this.page = 1
      this.getData()
    },

    clearGenderFilter() {
      this.genderFilter = []
      this.showGenderFilter = false
      this.page = 1
      this.getData()
    },

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
        categoryId: this.categoryFilter.length ? this.categoryFilter : null,
        subCategoryId: this.subCategoryFilter.length ? this.subCategoryFilter : null,
        gender: this.genderFilter.length ? this.genderFilter : null
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
      // First validate the form fields
      const isValid = await this.$validator.validate('inventory_import')
      if (!isValid) {
        this.$vs.notify({
          title: 'Error',
          text: 'Please fill all required fields correctly',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'danger'
        })
        return false
      }

      // Then check if file is selected
      if (!this.inventory_import) {
        this.$vs.notify({
          title: 'Error',
          text: 'Please select a file to import',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'danger'
        })
        return false
      }

      try {
        const data = new FormData()
        data.append('inventory_import', this.inventory_import)

        // Add category and subcategory to the form data
        if (this.form.categoryId) {
          data.append('categoryId', this.form.categoryId)
        }
        if (this.form.subCategoryId) {
          data.append('subCategoryId', this.form.subCategoryId)
        }

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

        // Reset form after successful import
        this.form.categoryId = null
        this.form.subCategoryId = null
        this.categoryID = null
        this.subCategoryID = null
        this.SubCategoryList = []
        this.inventory_import = null
        // Clear file input
        this.$refs.files.value = ''
      } catch ({ data }) {

        this.form.categoryId = null
        this.form.subCategoryId = null
        this.categoryID = null
        this.subCategoryID = null
        this.SubCategoryList = []
        this.inventory_import = null

        if (data && data.length > 0) {
          this.errorList = data
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
      } finally {
          this.resetImportForm() //  Always reset form...
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
      // if (!(await this.$validator.validate())) {
      //   return false
      // }
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
      this.$validator.validate('inventory_import')
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
    },
    async fetchSubCategories() {
      if (this.categoryID && this.categoryID.value) {
        const sub_category = await this.$store.dispatch('common/getSubCategoryByCategoryId', {
          categoryId: this.categoryID.value,
          page: 1,
          limit: 25,
          type: 'dropdown'
        })
        this.SubCategoryList = sub_category.data
      } else {
        this.SubCategoryList = []
        this.form.subCategoryId = null
        this.subCategoryID = null
      }
    },

    // Modify your existing inventoryImport method to include category/subcategory
    // async inventoryImport() {
    //   const isValid = await this.$validator.validate(['inventory_import', 'Category', 'Sub Category'])
    //   if (!isValid) {
    //     this.$vs.notify({
    //       title: 'Error',
    //       text: 'Please fill all required fields correctly',
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       position: 'top-center',
    //       time: 5000,
    //       color: 'danger'
    //     })
    //     return false
    //   }
    //   try {
    //     const data = new FormData()
    //     data.append('inventory_import', this.inventory_import)

    //     // Add category and subcategory to the form data
    //     if (this.form.categoryId) {
    //       data.append('categoryId', this.form.categoryId)
    //     }
    //     if (this.form.subCategoryId) {
    //       data.append('subCategoryId', this.form.subCategoryId)
    //     }

    //     if (this.form.collectionId) {
    //       data.append('collectionId', this.form.collectionId)
    //     }

    //     const { message } = await this.inventoryImportApi(data)
    //     this.$emit('update-data', true)
    //     this.$vs.notify({
    //       title: 'Success',
    //       text: message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       position: 'top-center',
    //       time: 5000,
    //       color: 'success'
    //     })
    //     // Reset form
    //     this.form = {
    //       categoryId: null,
    //       subCategoryId: null,
    //       collectionId: null
    //     }
    //   } catch ({ data }) {
    //     if (data && data.length > 0) {
    //       this.errorList = data
    //       this.showErrorModal = true
    //     } else {
    //       this.$vs.notify({
    //         title: 'Error',
    //         text: 'Unknown error occurred during import',
    //         iconPack: 'feather',
    //         icon: 'icon-alert-circle',
    //         position: 'top-center',
    //         time: 5000,
    //         color: 'primary'
    //       })
    //     }
    //   }
    // }
  },

  /** Watchers */
  watch: {
    // categoryFilter() {
    //  this.page = 1 // Reset to first page when filter changes
    //  this.getData()
    // },
    // subCategoryFilter() {
    //  this.page = 1 // Reset to first page when filter changes
    //  this.getData()
    // },
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
    importLoading(){
      if (this.importLoading) {
        this.$vs.loading({
          container: '#import-loading',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#import-loading > .con-vs-loading')
      }
    },
    createLoading(){
      if (this.createLoading) {
        this.$vs.loading({
          container: '#image-loading',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#image-loading > .con-vs-loading')
      }
    },
    page() {
      this.getData()
    },
    categoryID(newValue) {
      this.SubCategoryList = []
      this.form.sub_category_id = null
      this.subCategoryID = null
      if (newValue && newValue.value) {
        this.fetchSubCategories()
      }
    },

    subCategoryID(newValue) {
      this.form.sub_category_id = newValue ? newValue.value : null
    }
  },

  /** On Rendering */
  mounted() {
    this.getData()
    this.fetchCollection()
    this.fetchSubCategory()
  }
}
</script>
<style scoped>
/* Optional: Add some spacing between error sections */
#inventory-list .vs-con-tbody {
  min-height: 240px; /* 48px per row * 5 rows */
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.gender-filter-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 100;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: none;
}

.gender-filter-dropdown.active {
  display: block;
}

.vs-th {
  position: relative;
}

.vs-checkbox-con {
  padding: 4px 0;
}

/* Prevent clicks inside dropdown from closing it */
.gender-filter-dropdown >>> * {
  pointer-events: auto;
}
.vs-con-table .vs-con-tbody .con-vs-checkbox {
  justify-content: start !important;
}
.filter-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 100;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: none;
}

.filter-dropdown.active {
  display: block;
}

.vs-checkbox-con {
  padding: 4px 0;
  justify-content: start !important;
}

/* Prevent clicks inside dropdown from closing it */
.filter-dropdown >>> * {
  pointer-events: auto;
}
</style>
