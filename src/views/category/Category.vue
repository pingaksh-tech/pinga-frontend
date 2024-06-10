<template>
  <div id="documents-category-list">
    <!-- batch list -->
    <div class="vx-card p-6">
      <vs-table
        id="Documents-Category"
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        FilteredCount
        pagination
        :max-items="length"
        search
        :data="[]"
      >
        <template slot="header">
          <!-- add category modal -->
          <div
            @click="toggleAddCategoryModal"
            class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Add Category</span>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th>Category Name</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td>{{ 1234 }} </vs-td>
            <vs-td>
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
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <!-- add category modal -->
    <add-category-modal v-if="isAddCategoryModalMounted" :showModal.sync="isAddCategoryModalShow" />

    <!-- Edit category modal -->
    <Edit-category-modal v-if="isEditCategoryModalMounted" :showModal.sync="isEditCategoryModalShow" />
  </div>
</template>

<script>
import AddCategoryModal from '@/views/category/AddCategoryModal'
import EditCategoryModal from '@/views/category/EditCategoryModal'

export default {
  name: 'CategoryList',

  components: {
    AddCategoryModal,
    EditCategoryModal
  },

  data: () => ({
    order: [],
    length: 10,
    page: 1,
    search: '',

    // add category modal
    isAddCategoryModalMounted: false,
    isAddCategoryModalShow: false,

    // Edit category modal
    isEditCategoryModalMounted: false,
    isEditCategoryModalShow: false
  }),

  mounted() {},

  methods: {
    handleChangeLength(length) {
      this.page = 1
      this.length = length
    },

    handleChangePage(page) {
      this.page = page
    },

    handleSort(key, active) {
      if (!key) return
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
    },

    updateSearchQuery(val) {
      this.page = 1
      this.search = val
    },

    // toggle category modal
    toggleAddCategoryModal() {
      this.isAddCategoryModalMounted = true
      this.isAddCategoryModalShow = true
    },

    // toggle category modal
    toggleEditCategoryModal() {
      this.isEditCategoryModalMounted = true
      this.isEditCategoryModalShow = true
    },

    // edit category
    sendToEditPage() {},

    // delele category
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: 'Are you sure, you want to delete this record?',
        accept: async () => {
          try {
            this.$vs.notify({
              title: 'Success',
              text: 'message',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success'
            })
          } catch ({ message }) {
            this.$vs.notify({
              title: 'Error',
              text: message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
        },
        acceptText: 'Delete'
      })
    }
  },

  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#Documents-Category',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#Documents-Category > .con-vs-loading')
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
  }
}
</script>