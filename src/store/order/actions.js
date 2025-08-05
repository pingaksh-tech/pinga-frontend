import { getMessageFromError } from '../utils/functions'

export default {
 /* -------------------------------------------------------------------------- */
 /*                                List Order                         */
 /* -------------------------------------------------------------------------- */
 async getOrderList({ commit }, params) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.get('order', { params })
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   commit('SET_STATE', {
    action: 'OrderRecords',
    data: res.data.data.orders
   })
   commit('SET_STATE', {
    action: 'OrderAnalytics',
    data: res.data.data.orderCounts
   })
   commit('SET_STATE', {
    action: 'total',
    data: res.data.data.totalCount
   })
   commit('SET_STATE', {
    action: 'FilteredCount',
    data: res.data.data.filteredCount
   })
  } catch (error) {
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   const { message } = getMessageFromError(error)
   return Promise.reject({
    message
   })
  }
 },

 /* -------------------------------------------------------------------------- */
 /*                               Update Order                        */
 /* -------------------------------------------------------------------------- */
 async updateOrder({ commit }, { orderId, data }) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.put(`order/${orderId}`, data)
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   return {
    data: res.data.data,
    message: res.data.message
   }
  } catch (error) {
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   const { message } = getMessageFromError(error)
   return Promise.reject({
    message
   })
  }
 },
 /* -------------------------------------------------------------------------- */
 /*                                Order Details                          */
 /* -------------------------------------------------------------------------- */
 async getOrderDetails({ commit }, id) {
    commit('SET_STATE', {
      action: 'orderLoading',
      data: true
    })
    try {
      const res = await this.$http.get(`/order/details/${id}`)
      console.log("Order Details: ", res.data.data);
    //   const formattedManagers = (res.data.data || []).map((manager) => ({
    //     value: manager._id,
    //     label: `${manager.first_name} ${manager.last_name}`
    //   }))
      commit('SET_STATE', {
        action: 'orderLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'orderList',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'orderLoading',
        data: false
      })
    }
  },
}

