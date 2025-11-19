<template>
  <div>
    <!-- Diamond clarity List -->
    <div class="vx-card p-6">
      <vs-table
        id="product_list"
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
        :data="DiamondClarityRecords"
      >
        <template slot="header">
          <div class="mb-2 flex items-center">
            <div class="flex flex-wrap justify-between items-center"></div>
            <div
              @click="toggleAddCollectionModal"
              v-if="checkPermissionSlug(['collections_create'])"
              class="btn-add-new p-2 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add {{ module_name }}</span>
            </div>
          </div>
        </template>

        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th sort-key="name">Name</vs-th>
          <vs-th sort-key="name">Status</vs-th>
          <vs-th v-if="checkPermissionSlug(['collections_edit', 'collections_delete'])">Action</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td class="text-left">{{ tr.name || '-' }}</vs-td>
            <vs-td class="text-left">
              <vs-switch icon-pack="feather" vs-icon-on="icon-check-circle" vs-icon-off="icon-slash" color="primary" :value="tr.status" @click.stop="updateStatus(tr._id)">
                <span slot="on"></span>
                <span slot="off"></span>
              </vs-switch>
            </vs-td>
            <vs-td v-if="checkPermissionSlug(['collections_edit', 'collections_delete'])">
              <div class="inline-flex">
                <vx-tooltip :text="`Edit ${module_name}`" v-if="checkPermissionSlug(['collections_edit'])">
                  <feather-icon @click.stop="toggleEditCollectionModal(tr)" icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
                <vx-tooltip :text="`Delete ${module_name}`" v-if="checkPermissionSlug(['collections_delete'])">
                  <feather-icon @click.stop="deleteRecord(tr._id)" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-pagination v-if="FilteredCount" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5" class="mt-8" @onchange="handleChangePage"></vs-pagination>
    </div>

    <collection-modal :module_name="module_name" @update-data="getData" v-if="isAddCollectionMounted" :showModal.sync="isAddCollectionShow" :action_name="'Add'" />
    <collection-modal :module_name="module_name" @update-data="getData" v-if="isEditCollectionMounted" :showModal.sync="isEditCollectionShow" :data="selectedRecord" :action_name="'Update'" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CollectionModal from '@/views/diamond-clarity/DiamondModal.vue'

export default {
  name: 'DiamondClarity',

  components: {
    CollectionModal
  },

  data: () => ({
    order: [],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Diamond Clarity',
    isAddCollectionMounted: false,
    isAddCollectionShow: false,
    isEditCollectionMounted: false,
    isEditCollectionShow: false,
    selectedRecord: null
  }),

  computed: {
    ...mapState('diamondClarity', ['DiamondClarityRecords', 'FilteredCount', 'listLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  methods: {
    ...mapActions('diamondClarity', {
      getDiamondClarityList: 'getDiamondClarityList',
      deleteDiamondClarity: 'deleteDiamondClarity'
    }),

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
      this.getDiamondClarityList({
        search: this.search
      })
    },

    toggleAddCollectionModal() {
      this.isAddCollectionMounted = true
      this.isAddCollectionShow = true
    },

    toggleEditCollectionModal(data) {
      this.isEditCollectionMounted = true
      this.isEditCollectionShow = true
      this.selectedRecord = data
    },

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

    async deleteSingleRecord(id) {
      try {
        const { message } = await this.deleteDiamondClarity(id)
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
          color: 'danger'
        })
      }
    },
    updateStatus(id) {
      this.$store
        .dispatch('diamondClarity/updateDiamondClarityStatus', {
          type: 'users',
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
    }
  },

  watch: {
    listLoading(val) {
      if (val) {
        this.$vs.loading({
          container: '#product_list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#product_list > .con-vs-loading')
      }
    },

    isAddCollectionShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddCollectionMounted = false
          }, 0)
        }
      }
    },

    isEditCollectionShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditCollectionMounted = false
          }, 0)
        }
      }
    }
  },

  mounted() {
    console.log('Component mounted, fetching data...')
    this.getData()
  }
}
</script>
