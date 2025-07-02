<template>
  <div>
    <!-- Sub Category list -->
    <div class="vx-card p-6">
      <vs-table id="sub_category_list" class="vs-con-loading__container" stripe :sst="true" maxHeight="800px"
        @search="updateSearchQuery" @change-page="handleChangePage" @sort="handleSort" :total="subFilteredCount"
        :max-items="length" search :data="subCategoryRecords">
        <template slot="header">
          <div class="mb-2 flex items-center">
            <div class="flex flex-wrap justify-between items-center">
              <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer filter-font">
                  <div
                    class="p-4 border border-solid d-theme-border-grey-light rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      {{ page * length - (length - (subFilteredCount && 1)) }}
                      -
                      {{ subFilteredCount - page * length > 0 ? page * length : subFilteredCount }}
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
            <div @click="toggleAddSubCategoryModal"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add {{ module_name }}</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="category.name">Category Name</vs-th>
          <vs-th sort-key="category.name">Index</vs-th>
          <vs-th sort-key="category.status">Status</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td class="text-left">{{ tr.name || '-' }} </vs-td>
            <vs-td class="text-left w-1/6">
             <vs-input
               v-model="tr.index"
               v-validate="'required'"
               type="number"
               class="w-1/2"
               @click.stop
               @keydown.enter="updateIndexPosition(tr._id, tr.index)"
             />
           </vs-td>
            <vs-td>
             <vs-switch icon-pack="feather" vs-icon-on="icon-check-circle" vs-icon-off="icon-slash" color="primary" :value="tr.status" @click.stop="updateStatus(tr._id)">
               <span slot="on"></span>
               <span slot="off"></span>
             </vs-switch>
           </vs-td>
            <vs-td>
              <div class="inline-flex">
                <vx-tooltip :text="`Edit ${module_name}`">
                  <feather-icon @click.stop="toggleEditSubCategoryModal(tr)" icon="EditIcon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip :text="`Delete ${module_name}`">
                  <feather-icon @click.stop="deleteRecord(tr._id)" icon="Trash2Icon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>
            </vs-td>
            <template class="expand-user" slot="expand">
              <div class="con-expand-users w-full">
                <div class="con-btns-user flex items-center justify-between">
                  <div class="con-userx flex items-center justify-start">
                    <vs-table :data="tr.categories">
                      <template slot="thead">
                        <vs-th>Sr#</vs-th>
                        <vs-th sort-key="category.name">Sub Category Name</vs-th>
                      </template>
                      <vs-tr :data="str" :key="i" v-for="(str, i) in tr.categories">
                        <vs-td>
                          {{ page * length - (length - i - 1) }}
                        </vs-td>
                        <vs-td>
                          <p class="capitalize">{{ str.name }}</p>
                        </vs-td>
                      </vs-tr>
                    </vs-table>
                    <!-- <vs-avatar :badge="tr.id" size="45px" :src="`https://randomuser.me/api/portraits/women/${indextr}.jpg`" /> -->
                    <!-- <span>{{ tr.name }}</span> -->
                  </div>
                </div>
              </div>
            </template>
          </vs-tr>
        </template>
      </vs-table>
      <!-- Custom Pagination -->
      <vs-pagination v-if="subFilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5"
        class="mt-8" @onchange="handleChangePage"></vs-pagination>
    </div>

    <!-- Add category modal -->
    <add-sub-category-modal :module_name="module_name" @update-data="getData" v-if="isAddSubCategoryModalMounted"
      :showModal.sync="isAddSubCategoryModalShow" />

    <!-- Edit category modal -->
    <Edit-sub-category-modal :module_name="module_name" @update-data="getData" v-if="isEditSubCategoryModalMounted"
      :data="selectedRecord" :showModal.sync="isEditSubCategoryModalShow" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddSubCategoryModal from '@/views/category/subCategory/AddSubCategoryModal'
import EditSubCategoryModal from '@/views/category/subCategory/EditSubCategoryModal'

export default {
  name: 'CategoryList',

  /** Components */
  components: {
    AddSubCategoryModal,
    EditSubCategoryModal
  },

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Sub Category',

    // add category modal
    isAddSubCategoryModalMounted: false,
    isAddSubCategoryModalShow: false,

    // Edit category modal
    isEditSubCategoryModalMounted: false,
    isEditSubCategoryModalShow: false,
    selectedRecord: null
  }),

  /** computed */
  computed: {
    ...mapState('category', ['subCategoryRecords', 'subtotal', 'subFilteredCount', 'listLoading']),
    totalPages() {
      return Math.ceil(this.subFilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('category', {
      getSubCategoryList: 'getSubCategoryList',
      deleteSubCategoryRecord: 'deleteSubCategoryRecord'
    }),

    updateIndexPosition(id, index) {
      if (index > 0) {
        this.$store
          .dispatch('category/manageIndexNumber', { type:'sub-category',id, index })
          .then((Success) => {
            const { message } = Success
            this.getData()
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
      }
    },

    /** Per Page Limit Change */
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getData()
    },


    /** updateStatus API */
    updateStatus(id) {
      this.$store
        .dispatch('category/updateStatus', {
         type:'sub-category',
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
      this.getSubCategoryList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add category modal
    toggleAddSubCategoryModal() {
      this.isAddSubCategoryModalMounted = true
      this.isAddSubCategoryModalShow = true
    },

    // Edit Sub-category modal
    toggleEditSubCategoryModal(data) {
      this.isEditSubCategoryModalMounted = true
      this.isEditSubCategoryModalShow = true
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
        const { message } = await this.deleteSubCategoryRecord(id)
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
          container: '#sub_category_list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#sub_category_list > .con-vs-loading')
      }
    },

    // add category modal
    isAddSubCategoryModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddSubCategoryModalMounted = false
          }, 0)
        }
      }
    },

    // edit category modal
    isEditSubCategoryModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditSubCategoryModalMounted = false
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
