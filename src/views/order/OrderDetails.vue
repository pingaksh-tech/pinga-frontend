<template>
  <vs-card>
    <div class="vx-row pt-5 px-5">
      <div class="vx-col w-full px-8">
        <div class="space-y-3">
          <div class="bg-white shadow rounded-lg p-3">
            <!-- Details Grid -->
            <div class="grid grid-cols-2 gap-5 md:grid-cols-3">
              <div class="col-span-1 bg-white shadow-md rounded-lg p-4" style="max-height: 300px; overflow-y: auto">
                <!-- Heading -->
                <h5 class="text-2xl font-bold text-gray-800 border-b pb-3">Retailer Details</h5>
                <!-- Business Name -->
                <div class="flex flex-col gap-2">
                  <div class="flex flex-row w-full gap-1">
                    <label class="text-lg font-semibold text-gray-700">Legal Name : </label>
                    <p class="text-lg font-medium text-gray-900 capitalize" style="overflow-wrap: break-word; max-width: 100%">
                      {{ orderList.order.retailer_id.legal_name || '-' }}
                    </p>
                  </div>

                  <div class="flex flex-row w-full gap-1">
                    <label class="text-lg font-semibold text-gray-700">Retailer Name : </label>
                    <p class="text-lg font-medium text-gray-900 capitalize" style="overflow-wrap: break-word; max-width: 100%">
                      {{ orderList.order.retailer_id.first_name || '' }} {{ orderList.order.retailer_id.last_name || '-' }}
                    </p>
                  </div>

                  <div class="flex flex-row w-full gap-1">
                    <label class="text-lg font-semibold text-gray-700">Phone : </label>
                    <p class="text-lg font-medium text-gray-900" style="overflow-wrap: break-word; max-width: 100%">
                      {{ orderList.order.retailer_id.phone || '-' }}
                    </p>
                  </div>

                  <div class="flex flex-row w-full gap-1">
                    <label class="text-lg font-semibold text-gray-700">Email : </label>
                    <p class="text-lg font-medium text-gray-900" style="overflow-wrap: break-word; max-width: 100%">
                      {{ orderList.order.retailer_id.email || '-' }}
                    </p>
                  </div>

                  <div class="flex flex-row w-full gap-1">
                    <label class="text-lg font-semibold text-gray-700 capitalize">Address : </label>
                    <p class="text-lg font-medium text-gray-900" style="overflow-wrap: break-word; max-width: 100%">
                      {{ orderList.order.retailer_id.address || '' }},{{ orderList.order.retailer_id.city || '' }},{{ orderList.order.retailer_id.state || '' }},{{
                        orderList.order.retailer_id.country || ''
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-span-1 bg-white shadow-md rounded-lg p-4">
                <!-- Heading -->
                <h5 class="text-2xl font-bold text-gray-800 border-b pb-3">Order Details</h5>
                <!-- Business Name -->
                <div class="flex flex-col gap-2">
                  <div class="flex flex-row w-1/3 md:w-1/3 gap-1">
                    <label class="text-lg font-semibold text-gray-700">Order No : </label>
                    <p class="text-lg font-medium text-gray-900">
                      {{ orderList.order.order_no }}
                    </p>
                  </div>

                  <!-- Retailer Name -->
                  <!-- <div class="flex flex-col w-full md:w-1/3">
                    <label class="text-lg font-semibold text-gray-700">Retailer Date</label>
                    <p class="text-xl font-medium text-gray-900 mt-1">{{formatDate(orderList.order.createdAt)}}</p>
                  </div> -->

                  <div class="flex flex-row w-full gap-1">
                    <label class="text-lg font-semibold text-gray-700">Order Date : </label>
                    <p class="text-lg font-medium text-gray-900">
                      {{ formatDate(orderList.order.createdAt) }}
                    </p>
                  </div>

                  <div class="flex flex-row w-full gap-1">
                    <label class="text-lg font-semibold text-gray-700">Order Type : </label>
                    <p class="text-lg font-medium text-gray-900">
                      {{ orderList.order.order_type }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <vs-table :data="orderList.orderItems" stripe class="mt-6">
            <!-- Table Header -->
            <template slot="thead">
              <vs-th>Sr#</vs-th>
              <vs-th>Product Image </vs-th>
              <vs-th>Pingaksh Style Name</vs-th>
              <vs-th>Mfg Style No.</vs-th>
              <vs-th>Product Name</vs-th>
              <vs-th>Qty</vs-th>
              <vs-th>Size</vs-th>
              <vs-th>Metal</vs-th>
              <vs-th>Diamond Clarity</vs-th>
              <vs-th>Remarks</vs-th>
              <vs-th>Delivery Days</vs-th>
            </template>

            <!-- Table Rows -->
            <template slot-scope="{ data }">
              <vs-tr v-for="(tr, i) in data" :key="i">
                <vs-td>{{ i + 1 }}</vs-td>

                <vs-td class="text-left">
                  <img :src="tr.product && tr.product.inventory_images ? tr.product.inventory_images[0] : ''" alt="Product Image" class="h-12 w-12 object-cover rounded" />
                </vs-td>
                <vs-td>{{ tr.product && tr.product.name ? tr.product.name : '-' }}</vs-td>
                <vs-td>{{ tr.product && tr.product.manufacturing_number ? tr.product.manufacturing_number : '-' }}</vs-td>
                <vs-td>{{ tr.product && tr.product.name ? tr.product.name : '-' }}</vs-td>
                <vs-td>{{ tr.qty || '-' }}</vs-td>
                <vs-td>{{ tr.product && tr.product.size ? tr.product.size.name : '-' }}</vs-td>
                <vs-td>{{ tr.product && tr.product.metal ? tr.product.metal.name : '-' }}</vs-td>
                <vs-td>{{ tr.product && tr.product.diamond_clarity ? tr.product.diamond_clarity : '-' }}</vs-td>
                <vs-td>{{ tr.product && tr.product.remark ? tr.product.remark : '-' }}</vs-td>
                <vs-td>{{ tr.product && tr.product.delivery ? tr.product.delivery : '-' }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </div>
  </vs-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  /** Page Name */
  name: 'AddInventory',

  /** components */
  components: {
    Select2
  },

  /** data */
  data() {
    return {
      inventoryId: null
    }
  },
  /** Mounted */
  async mounted() {
    const id = this.$route.params.id
    this.inventoryId = id
    await this.getOrderDetails(id)
  },

  /** computed */
  computed: {
    ...mapState('order', ['OrderRecords', 'total', 'FilteredCount', 'listLoading', 'OrderAnalytics', 'orderList', 'orderLoading'])
  },
  methods: {
    ...mapActions('order', {
      getOrderList: 'getOrderList',
      updateOrder: 'updateOrder',
      getOrderDetails: 'getOrderDetails'
    }),
    formatDate(dateString) {
      if (!dateString) return '-'
      const date = new Date(dateString)

      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }

      // Format as DD-MM-YYYY HH:mm:ss
      return date
        .toLocaleString('en-IN', options)
        .replace(/\//g, '-') // Replace slashes with dashes
        .replace(',', '') // Remove comma between date and time
    }
  },

  /** created */

  /** methods */

  /** watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#create-inventory',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-inventory > .con-vs-loading')
      }
    },
    categoryID(newValue) {
      this.SubCategoryList = []
      this.form.sub_category_id = null
      this.subCategoryID = null
      if (newValue && newValue.value) {
        this.fetchSubCategories()
      }
    },
    subCategoryID(newValue, oldValue) {
      this.form.size_id = null
      this.sizeID = null
      if (newValue && newValue.value) {
        this.fetchSizes()
      }
    }
  }
}
</script>


<style scoped>
.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

/* Grid layout */
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* Individual item styling */
.detail-item label {
  font-weight: 500;
  color: #555;
  font-size: 14px;
}

.detail-item p {
  font-size: 15px;
  font-weight: 600;
  margin: 4px 0 0;
  color: #222;
}

/* Make address full width */
.address-item {
  grid-column: span 2;
}
</style>
