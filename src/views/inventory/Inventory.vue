<template>
  <div>
    <!-- Inventory list -->
    <div class="vx-card p-6">
      <div class="vx-row ">
        <div class="vx-col w-1/4 mb-2">
          <input type="file" class="border p-2 rounded w-full" name="inventory_import" ref="files" accept=".xlsx"
            style="border: 1px solid rgba(0, 0, 0, 0.2);" data-vv-as="Inventory Import" @change="handleFileUpload" />
          <span class="text-danger text-xs" v-show="errors.has(`inventory_import`)">{{
            errors.first(`inventory_import`) }}</span>
        </div>
        <div class="vx-col w-1/8 mb-2">
          <vs-button class="mr-2 vs-con-loading__container" @click="inventoryImport">Import</vs-button>
        </div>
        <div class="vx-col w-1/2 mb-2">
        </div>
        <div class="vx-col w-1/8 mb-2 ml-8">
          <vs-button class="mr-2 vs-con-loading__container" @click="downloadPDFSample">Download Sample</vs-button>
        </div>
      </div>

      <vs-divider></vs-divider>
      <vs-table id="inventory-list" class="vs-con-loading__container" stripe :sst="true" maxHeight="800px"
        @search="updateSearchQuery" @change-page="handleChangePage" @sort="handleSort" :total="FilteredCount"
        :max-items="length" search :data="InventoryRecords">
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
            <div @click="toggleAddInventoryModal"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add {{ module_name }}</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="Inventory.name">Inventory Name</vs-th>
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
                  <feather-icon @click="toggleEditInventoryModal(tr._id)" icon="EditIcon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip :text="`Delete ${module_name}`">
                  <feather-icon @click="deleteRecord(tr._id)" icon="Trash2Icon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
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
  name: 'InventoryList',

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Inventory',
    inventory_import: null
  }),

  /** computed */
  computed: {
    ...mapState('inventory', ['InventoryRecords', 'total', 'FilteredCount', 'listLoading']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    },
    validateForm() {
      return !this.errors.any()
    }
  },

  /** Functions */
  methods: {
    ...mapActions('inventory', {
      getInventoryList: 'getInventoryList',
      deleteInventoryRecord: 'deleteInventoryRecord',
      inventoryImportApi: 'inventoryImportApi'
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

    /** Inventory List API */
    getData() {
      this.getInventoryList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add Inventory modal
    toggleAddInventoryModal() {
      this.$router.push(`/inventory/add`);
    },

    // Edit Inventory modal
    toggleEditInventoryModal(id) {
      this.$router.push(`/inventory/${id}/edit`);
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
      const url = "https://pingaksh-storage.s3.ap-south-1.amazonaws.com/import_sample/Inventory_Sample.xlsx"
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', "sample.xlsx")
      document.body.appendChild(link)
      link.click()

    },
    async inventoryImport() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const data = new FormData();
        data.append("inventory_import", this.inventory_import);

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
  },

  /** Watchers */
  watch: {
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
