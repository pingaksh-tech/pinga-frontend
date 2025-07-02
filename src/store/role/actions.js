import { getMessageFromError } from '../utils/functions'

const PREFIX = 'admin/role'
export default {
 /* -------------------------------------------------------------------------- */
 /*                                 create role                                */
 /* -------------------------------------------------------------------------- */
 async create({ commit }, data) {
  commit('SET_STATE', {
   action: 'createLoading',
   data: true
  })
  try {
   const res = await this.$http.post(`${PREFIX}/create`, data)
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
 /*                                  get role                                  */
 /* -------------------------------------------------------------------------- */
 async get({ commit }, params) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.get(`roles`, { params })
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   commit('SET_STATE', {
    action: 'records',
    data: res.data.data
   })
   commit('SET_STATE', {
    action: 'total',
    data: res.data.data.totalResults
   })
   commit('SET_STATE', {
    action: 'FilteredCount',
    data: res.data.data.totalResults
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
 /*                                 Delete Role                                */
 /* -------------------------------------------------------------------------- */
 async delete({ commit }, id) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.delete(`/${PREFIX}/delete/${id}`)
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   return {
    data: res.data,
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
 /*                                 Update Role                                */
 /* -------------------------------------------------------------------------- */
 async update({ commit }, { id, data }) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.put(`${PREFIX}/update/${id}`, data)
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
 /*                                  Show Role                                 */
 /* -------------------------------------------------------------------------- */
 async show({ commit }, id) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.get(`roles/${id}`)
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   commit('SET_STATE', {
    action: 'record',
    data: res.data.data
   })
   return {
    data: res.data,
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
 /*                                Update Status                               */
 /* -------------------------------------------------------------------------- */
 async updateStatus({ commit }, { id, data }) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put(`${PREFIX}/manage-status/${id}`, data)
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   commit('SET_STATUS', { id, status: res.data.data.is_active })
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
 },

 /* -------------------------------------------------------------------------- */
 /*                             get role permission                            */
 /* -------------------------------------------------------------------------- */
 async getRoleByPermissionsId({ commit }, id) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.get(`/access-permission/get-permissions/${id}`)
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   commit('SET_STATE', {
    action: 'permission',
    data: res.data.data
   })
   return {
    data: res.data,
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
 /*                         update Permission for role                         */
 /* -------------------------------------------------------------------------- */
 async udateRolePermission({ commit }, { data }) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put(`access-permission/update`, data)
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
