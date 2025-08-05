<template>
  <vs-card>
    <div class="vx-row pt-5 px-5">
      <div class="vx-col w-full px-8">
        <div class="space-y-3">
          <div class="bg-white shadow rounded-lg p-3">
            <!-- Heading -->
            <h5 class="text-2xl font-bold text-gray-800 border-b pb-3">Retailer Details</h5>

            <!-- Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <!-- Business Name -->
              <div class="flex flex-col">
                <label class="text-lg font-semibold text-gray-700">Business Name</label>
                <p class="text-xl font-medium text-gray-900 mt-1">
                  {{ orderList.order.retailer_id.business_name }}
                </p>
              </div>

              <!-- Retailer Name -->
              <div class="flex flex-col">
                <label class="text-lg font-semibold text-gray-700">Retailer Name</label>
                <p class="text-xl font-medium text-gray-900 mt-1">{{ orderList.order.retailer_id.first_name }} {{ orderList.order.retailer_id.last_name }}</p>
              </div>

              <!-- Email -->
              <div class="flex flex-col">
                <label class="text-lg font-semibold text-gray-700">Email</label>
                <p class="text-xl font-medium text-gray-900 mt-1">
                  {{ orderList.order.retailer_id.email }}
                </p>
              </div>

              <!-- Phone -->
              <div class="flex flex-col">
                <label class="text-lg font-semibold text-gray-700">Phone</label>
                <p class="text-xl font-medium text-gray-900 mt-1">
                  {{ orderList.order.retailer_id.phone }}
                </p>
              </div>

              <!-- Address -->
              <div class="flex flex-col">
                <label class="text-lg font-semibold text-gray-700">Address</label>
                <p class="text-xl font-medium text-gray-900 mt-1">
                  {{ orderList.order.retailer_id.address }},{{ orderList.order.retailer_id.city }},{{ orderList.order.retailer_id.state }},{{ orderList.order.retailer_id.country }}
                </p>
              </div>
            </div>
          </div>

          <vs-table :data="orderList.productItems" stripe class="mt-6">
            <!-- Table Header -->
            <template slot="thead">
              <vs-th>Sr#</vs-th>
              <vs-th>Product Image</vs-th>
              <vs-th>Metal Weight(in Gm)</vs-th>
              <vs-th>Metal Per Gm</vs-th>
              <vs-th>Metal Price</vs-th>
              <vs-th>Diamond Weight</vs-th>
              <vs-th>Diamond Price</vs-th>
              <vs-th>Manufacturer Price</vs-th>
              <vs-th>Total Price</vs-th>
            </template>

            <!-- Table Rows -->
            <template slot-scope="{ data }">
              <vs-tr v-for="(tr, i) in data" :key="i">
                <vs-td>{{ i + 1 }}</vs-td>
                <vs-td class="text-left">
                  <img 
                    :src="`https://pingaksh-storage.s3.ap-south-1.amazonaws.com/${tr.inventory_images[0]}`"
                    alt="Product Image" 
                    class="h-5 w-5 object-cover rounded" 
                  />
                </vs-td>
                <vs-td class="text-left">
                  {{tr.price_breaking.metal.metal_weight || '-'}}
                </vs-td>
                <vs-td class="text-left">{{ tr.price_breaking.metal.price_per_gram || '-' }}</vs-td>
                <vs-td class="text-left">{{ tr.price_breaking.metal.metal_price.toFixed(2) || '-' }}</vs-td>
                <vs-td class="text-left">{{ tr.price_breaking.diamond.diamond_weight || '-' }}</vs-td>
                <vs-td class="text-left">{{ tr.price_breaking.diamond.diamond_price.toFixed(2) || '-' }}</vs-td>
                <vs-td class="text-left">{{ tr.price_breaking.other.manufacturing_price.toFixed(2) || '-' }}</vs-td>
                <vs-td class="text-left">{{ tr.price_breaking.total.toFixed(2) || '-' }}</vs-td>
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
    })
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
