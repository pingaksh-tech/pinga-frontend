import { getMessageFromError } from '../utils/functions'

export default {
 /* -------------------------------------------------------------------------- */
 /*                               Create labourPrice                              */
 /* -------------------------------------------------------------------------- */
 async createLabourPrice({ commit }, data) {
  commit('SET_STATE', {
   action: 'createLoading',
   data: true
  })
  try {
   const res = await this.$http.post('labour-price/', data)
   commit('SET_STATE', {
    action: 'createLoading',
    data: false
   })
   return {
    message: res.data.message
   }
  } catch (error) {
   commit('SET_STATE', {
    action: 'createLoading',
    data: false
   })
   // Manage Error
   const { message } = getMessageFromError(error)
   return Promise.reject({
    message
   })
  }
 },

 /* -------------------------------------------------------------------------- */
 /*                              Get labourPrice List                             */
 /* -------------------------------------------------------------------------- */
 async getLabourPriceList({ commit }, params) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.get('labour-price/list', { params })

   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   commit('SET_STATE', {
    action: 'LabourPriceRecords',
    data: res.data.data.labourPrices
   })
   commit('SET_STATE', {
    action: 'total',
    data: res.data.data.totalCount
   })
   commit('SET_STATE', {
    action: 'FilteredCount',
    data: res.data.data.filteredCount
   })
   return {
    data: res.data.data.labourPrices,
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
 /*                               Delete labourPrice                              */
 /* -------------------------------------------------------------------------- */
 async deleteLabourPriceRecord({ commit }, id) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.delete(`/labour-price/delete/${id}`)
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   return {
    data: res.data,
    message: res.data.message
   }
  } catch (error) {
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   const { message } = getMessageFromError(error)
   return Promise.reject({
    message
   })
  }
 },

 /* -------------------------------------------------------------------------- */
 /*                               Update labourPrice                              */
 /* -------------------------------------------------------------------------- */
 async updateLabourPrice({ commit }, { labourPriceId, data }) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put(`labour-price/update/${labourPriceId}`, data)
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   return {
    data: res.data.data,
    message: res.data.message
   }
  } catch (error) {
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   const { message } = getMessageFromError(error)
   return Promise.reject({
    message
   })
  }
 }
}
