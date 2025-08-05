<template>
  <div class="p-4">
    <!-- Add Retailer popup -->
    <vs-popup :title="`Order details of ${data.order.order_no} `" button-accept="false" button-cancel="false" :active.sync="showModal" class="custom-popup large-popup">
      <div class="retailer details">
        <h5>Retailer Details</h5>
        <div class="details-grid">
           <div class="detail-item">
            <label>Business Name</label>
            <p>{{ data.order.retailer_id.business_name }}</p>
          </div>

           <div class="detail-item">
            <label>Retailer Name</label>
            <p>{{data.order.retailer_id.first_name}} {{data.order.retailer_id.last_name}}</p>
          </div>

         <div class="detail-item">
            <label>Email</label>
            <p>{{data.order.retailer_id.email}}</p>
          </div>

           <div class="detail-item">
            <label>Phone</label>
            <p>{{data.order.retailer_id.phone}}</p>
          </div>

          <div class="detail-item address-item">
            <label>Address</label>
            <p>{{ data.order.retailer_id.phone}}</p>
          </div> 
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'OrderDetailsModal',
  components: {
    Select2,
    Datepicker
  },
  props: {
    showModal: Boolean,
    module_name: String,
    data: Object,
  },
  mounted() {
    console.log(this.data, "data");
  },
  data() {
    return {
      dropDownManagers: []
    }
  },
}
</script>

<style scoped>
.vs-component.custom-popup.large-popup > .vs-popup {
  width: 80% !important;
  max-width: 1000px !important;
  min-width: unset !important;
}

/* Target the inner content div height */
.vs-component.custom-popup.large-popup .vs-popup--content > .large-popup {
  min-height: 400px !important;
}

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

