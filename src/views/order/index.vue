<template>
  <div>
    <!-- Order list -->
    <div class="vx-card p-6">
      <vs-table 
          id="order-list"
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
          :data="OrderRecords"
        >
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
        <template slot="header">
         <div class="flex flex-wrap mb-4">
           <!-- Total Amount Box -->
           <div class="analytics-box bg-primary text-white mr-4 mb-2 p-4 rounded-lg">
             <div class="box-title">Total Amount</div>
             <div class="box-value">{{ formatPrice(OrderAnalytics.totalAmount) }}</div>
           </div>

           <!-- Total Orders Box -->
           <div class="analytics-box bg-success text-white mr-4 mb-2 p-4 rounded-lg">
             <div class="box-title">Total Orders</div>
             <div class="box-value">{{ OrderAnalytics.totalCount }}</div>
           </div>
         </div>
       </template>
        <template slot="thead">
         <vs-th>Sr#</vs-th>
         <vs-th sort-key="retailer.business_name">Sales Person</vs-th>
          <vs-th sort-key="order_no">Order No</vs-th>
          <vs-th sort-key="order_type">Order Type</vs-th>
          <vs-th sort-key="date">Order Date</vs-th>
          <vs-th sort-key="production_name">Production Name</vs-th>
          <vs-th sort-key="retailer.business_name">Retailer Code</vs-th>
          <vs-th sort-key="production_style_no">Pingaksh Style No.</vs-th>
          <vs-th sort-key="production_style_no">MFG Style No</vs-th>
          <vs-th sort-key="production_style_no">Qty</vs-th>
          <vs-th sort-key="production_style_no">Size</vs-th>
          <vs-th sort-key="production_style_no">Gold Kt</vs-th>
          <vs-th sort-key="production_style_no">Diamond Quality</vs-th>
          <vs-th sort-key="production_style_no">Spl. Remarks</vs-th>
          <vs-th sort-key="production_style_no">Order Delivery date</vs-th>
          <vs-th v-if="checkPermissionSlug(['orders_edit'])">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
           <vs-td>
            {{ page * length - (length - i - 1) }}
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.sales_person ? tr.sales_person : '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
           <vs-input v-if="tr.edit" v-model="tr.order_no" />
           <p v-else >{{ tr.order_no }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.order_type || '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
           <p>{{ formatDate(tr.createdAt) || "-" }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.production_name || '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.retailer ? tr.retailer.code : '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.production_style_no || '-'}}</p>
          </vs-td>
          <vs-td class="text-left">
             <p>{{ tr.manufacturing_number || '-'}}</p>
          </vs-td>
          
          <vs-td class="text-left">
            <p>{{ tr.qty || '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.size || '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.metal_carat || '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.diamond_clarity || '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.remark || '-' }}</p>
          </vs-td>
          <vs-td class="text-left">
            <p>{{ tr.order_delivery || '-' }}</p>
          </vs-td>
           <vs-td v-if="checkPermissionSlug(['orders_edit'])">
              <div class="inline-flex">
                <vx-tooltip text="Order Details" v-if="checkPermissionSlug(['users_edit'])">
                  <feather-icon 
                    @click="handleOrderDetails(tr._id)" 
                    icon="BookIcon" 
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" 
                  />
                </vx-tooltip>
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
      <vs-pagination v-if="FilteredCount" @onchange="handleChangePage" v-model="page" :total="totalPages" :max="totalPages / length > 7 ? 7 : 5"class="mt-8"></vs-pagination>

      <order-details-modal 
        :showModal="isEditUserModalShow"
        :data="selectedRecord"
        :module_name="module_name"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import OrderDetailsModal from "./OrderDetailsModal.vue"

export default {
  name: 'Order',
  components: {
    OrderDetailsModal
  },
  /** Data */
  data: () => ({
    order: [],
    records: [1, 2, 3],
    length: 10,
    page: 1,
    search: '',
    module_name: 'Order',

    // Order Details modal
    isOrderDetailsModalMounted: false,
    selectedRecord : null,
    isEditUserModalShow: false,
  }),

  /** computed */
  computed: {
     ...mapState('user', ['createLoading', 'managers']),
    ...mapState('order', ['OrderRecords', 'total', 'FilteredCount', 'listLoading','OrderAnalytics','orderList','orderLoading']),
    ...mapGetters('auth', ['checkPermissionSlug']),
    totalPages() {
      return Math.ceil(this.FilteredCount / this.length)
    }
  },

  /** Functions */
  methods: {
    ...mapActions('order', {
      getOrderList: 'getOrderList',
      updateOrder: 'updateOrder',
      getOrderDetails:"getOrderDetails",
    }),
   async handleOrderDetails(id) {
      this.$router.push(`/order/list/${id}`)
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

    /** Order List API */
    getData() {
      this.getOrderList({
        // order: this.order,
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },


    // Edit Order modal
    toggleEdit(row) {
      this.$set(row, 'edit', true);
    },
    // Save the edited data

    async saveEdit(row) {
      const data = {
        order_no: row.order_no,
      }
      const orderId = row._id;
      try {
        const { message } = await this.updateOrder({ orderId, data })
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
    },

    formatDate(dateString) {
     if (!dateString) return '-';
     const date = new Date(dateString);

     const options = {
       day: '2-digit',
       month: '2-digit',
       year: 'numeric',
       hour: '2-digit',
       minute: '2-digit',
       second: '2-digit',
       hour12: false
     };

     // Format as DD-MM-YYYY HH:mm:ss
     return date.toLocaleString('en-IN', options)
       .replace(/\//g, '-') // Replace slashes with dashes
       .replace(',', '');   // Remove comma between date and time
   }

  },

  /** Watchers */
  watch: {
    listLoading() {
      if (this.listLoading) {
        this.$vs.loading({
          container: '#order-list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#order-list > .con-vs-loading')
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

.analytics-box {
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  min-width: 200px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.box-title {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.box-value {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>