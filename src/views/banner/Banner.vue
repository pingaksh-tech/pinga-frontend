<template>
  <div>
    <!-- banner list -->
    <div class="vx-card p-6">
      <vs-table id="banner_list" class="vs-con-loading__container" stripe :sst="true" maxHeight="800px" :data="BannerRecords">
        <template slot="header">
          <div class="mb-2 flex items-center">
            <div
              @click="toggleAddBannerModal"
              v-if="checkPermissionSlug(['banners_create'])"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add {{ module_name }}</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="category.name">{{ module_name }} Name</vs-th>
          <vs-th v-if="checkPermissionSlug(['banners_edit', 'banners_delete'])">Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ page * length - (length - i - 1) }}
            </vs-td>
            <vs-td>
              <div style="aspect-ratio: 16 / 7; width: 200px; max-width: 100%; overflow: hidden; border-radius: 6px; background: #f3f3f3">
                <img :src="tr.banner_image" alt="Banner" class="w-full h-full object-cover" />
              </div>
            </vs-td>
            <vs-td v-if="checkPermissionSlug(['banners_edit', 'banners_delete'])">
              <div class="inline-flex">
                <vx-tooltip :text="`Edit ${module_name}`" v-if="checkPermissionSlug(['banners_edit'])">
                  <feather-icon @click="toggleEditBannerModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip :text="`Delete ${module_name}`" v-if="checkPermissionSlug(['banners_delete'])">
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

    <!-- Add banner modal -->
    <add-banner-modal :module_name="module_name" @update-data="getData" v-if="isAddBannerModalMounted" :showModal.sync="isAddBannerModalShow" />

    <!-- Edit banner modal -->
    <Edit-banner-modal :module_name="module_name" @update-data="getData" v-if="isEditBannerModalMounted" :data="selectedRecord" :showModal.sync="isEditBannerModalShow" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AddBannerModal from '@/views/banner/AddBannerModal'
import EditBannerModal from '@/views/banner/EditBannerModal'

export default {
  name: 'Banner-List',

  /** Components */
  components: {
    AddBannerModal,
    EditBannerModal
  },

  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Banner',

    // add banner modal
    isAddBannerModalMounted: false,
    isAddBannerModalShow: false,

    // Edit banner modal
    isEditBannerModalMounted: false,
    isEditBannerModalShow: false,
    selectedRecord: null
  }),

  /** computed */
  computed: {
    ...mapState('banner', ['BannerRecords', 'total', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('banner', {
      getBannerList: 'getBannerList',
      deleteBannerRecord: 'deleteBannerRecord'
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

    /** banner List API */
    getData() {
      this.getBannerList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },

    // Add banner modal
    toggleAddBannerModal() {
      this.isAddBannerModalMounted = true
      this.isAddBannerModalShow = true
    },

    // Edit banner modal
    toggleEditBannerModal(data) {
      this.isEditBannerModalMounted = true
      this.isEditBannerModalShow = true
      this.selectedRecord = data
    },

    /** Delete banner Confirmation */
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

    /** Delete banner API */
    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteBannerRecord(id)
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
          container: '#banner_list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#banner_list > .con-vs-loading')
      }
    },

    // add banner modal
    isAddBannerModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddBannerModalMounted = false
          }, 0)
        }
      }
    },

    // edit banner modal
    isEditBannerModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditBannerModalMounted = false
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
