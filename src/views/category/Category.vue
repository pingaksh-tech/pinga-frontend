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
        @sort="handleSort"
        :total="FilteredCount"
        :max-items="length"
        search
        :data="CategoryRecords"
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
            <div
              @click="toggleAddCategoryModal"
              v-if="checkPermissionSlug(['categories_create'])"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add Category</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="category.name">Category Name</vs-th>
          <vs-th sort-key="category.status">Status</vs-th>
          <!-- <vs-th>Action</vs-th> -->
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td class="text-left">{{ tr.name || '-' }} </vs-td>
           <vs-td>
             <vs-switch icon-pack="feather" vs-icon-on="icon-check-circle" vs-icon-off="icon-slash" color="primary" :value="tr.status" @click.stop="updateStatus(tr._id)">
               <span slot="on"></span>
               <span slot="off"></span>
             </vs-switch>
           </vs-td>
            <!-- <vs-td>
              <div class="inline-flex">
                <vx-tooltip text="Edit Category">
                  <feather-icon @click="toggleEditCategoryModal(tr)" icon="EditIcon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip text="Delete Category">
                  <feather-icon @click="deleteRecord(tr._id)" icon="Trash2Icon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>
            </vs-td> -->
            <!-- <vs-td>
              <vs-dropdown vs-trigger-click class="cursor-pointer">
                <div class="p-4 border border-solid d-theme-border-grey-light cursor-pointer flex items-center justify-between font-medium">
                  Actions
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu class="locations__actions">
                  <vs-dropdown-item @click="sendToEditPage()"> <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /> Edit Category </vs-dropdown-item>
                  <vs-dropdown-item @click="deleteRecord()"> <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" /> Delete Category </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
              <div>-</div>
            </vs-td> -->
          </vs-tr>
        </template>
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8"></vs-pagination>
    </div>

    <!-- Add category modal -->
    <add-category-modal :module_name="module_name" @update-data="getData" v-if="isAddCategoryModalMounted" :showModal.sync="isAddCategoryModalShow" />

    <!-- Edit category modal -->
    <Edit-category-modal :module_name="module_name" @update-data="getData" v-if="isEditCategoryModalMounted" :data="selectedRecord" :showModal.sync="isEditCategoryModalShow" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AddCategoryModal from '@/views/category/AddCategoryModal'
import EditCategoryModal from '@/views/category/EditCategoryModal'

export default {
  name: 'CategoryList',

  /** Components */
  components: {
    AddCategoryModal,
    EditCategoryModal
  },

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Category',

    // add category modal
    isAddCategoryModalMounted: false,
    isAddCategoryModalShow: false,

    // Edit category modal
    isEditCategoryModalMounted: false,
    isEditCategoryModalShow: false,
    selectedRecord: null
  }),

  /** computed */
  computed: {
    ...mapState('category', ['CategoryRecords', 'total', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('category', {
      getCategoryList: 'getCategoryList',
      deleteCategoryRecord: 'deleteCategoryRecord'
    }),

    /** updateStatus API */
    updateStatus(id) {
      this.$store
        .dispatch('category/updateStatus', {
         type:'category',
          id
        })
        .then((Success) => {
          this.getData()
          const { message } = Success
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'success'
          })
        })
        .catch((err) => {
          const { message } = err
          this.$vs.notify({
            title: 'Error',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'primary'
          })
        })
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
      this.getCategoryList({
        // // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add category modal
    toggleAddCategoryModal() {
      this.isAddCategoryModalMounted = true
      this.isAddCategoryModalShow = true
    },

    // Edit category modal
    toggleEditCategoryModal(data) {
      this.isEditCategoryModalMounted = true
      this.isEditCategoryModalShow = true
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

    /** Delete category API */
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteCategoryRecord(id)
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
    // On pagination change
    page() {
      this.getData()
    },

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
    isAddCategoryModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddCategoryModalMounted = false
          }, 0)
        }
      }
    },

    // edit category modal
    isEditCategoryModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditCategoryModalMounted = false
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
