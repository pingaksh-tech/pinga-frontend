import { getMessageFromError } from '../utils/functions'

export default {
 /* -------------------------------------------------------------------------- */
 /*                               Create Category                              */
 /* -------------------------------------------------------------------------- */
 async createCategory({ commit }, data) {
  commit('SET_STATE', {
   action: 'createLoading',
   data: true
  })
  try {
   const res = await this.$http.post('category/', data)
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
 /*                              Get Category List                             */
 /* -------------------------------------------------------------------------- */
 async getCategoryList({ commit }, params) {
  commit('SET_STATE', {
   action: 'listLoading2',
   data: true
  })
  try {
   console.log("=============1==============")
   const res = await this.$http.get('category/', { params })
   console.log(res.data.data.categories, 'res.data.data.categories');

   commit('SET_STATE', {
    action: 'listLoading2',
    data: false
   })
   console.log("==========2=================")

   commit('SET_STATE', {
    action: 'CategoryRecords',
    data: res.data.data.categories
   })
   commit('SET_STATE', {
    action: 'dropDownOpt',
    data: res.data.data.categories.map((c) => ({
     value: c._id,
     label: c.name
    }))
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
    data: res.data.data.categories.map((c) => ({
     value: c._id,
     label: c.name
    })),
    message: res.data.message
   }
  } catch (error) {
   commit('SET_STATE', {
    action: 'listLoading2',
    data: false
   })
   console.log(error, 'error');
   const { message } = getMessageFromError(error)
   // return Promise.reject({
   //   message
   // })
  }
 },

 /* -------------------------------------------------------------------------- */
 /*                               Delete Category                              */
 /* -------------------------------------------------------------------------- */
 async deleteCategoryRecord({ commit }, id) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.delete(`/category/${id}`)
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
 /*                              Get Category Info                             */
 /* -------------------------------------------------------------------------- */
 async getCategoryRecord({ commit }, id) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.get(`announcement/${id}`)
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   commit('SET_STATE', {
    action: 'AnnouncementInformation',
    data: res.data.data
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
 /*                               Update Category                              */
 /* -------------------------------------------------------------------------- */
 async updateCategoryRecord({ commit }, { categoryId, data }) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put(`category/${categoryId}`, data)
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
 },

 /* -------------------------------------------------------------------------- */
 /*                       update Category status action.                       */
 /* -------------------------------------------------------------------------- */
 async publishCategory({ commit }, { id, publish }) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put(`/announcement/publish-announcement/${id}`, {
    publish
   })
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
 },

 /* -------------------------------------------------------------------------- */
 /*                           Sub Category Module API                          */
 /* -------------------------------------------------------------------------- */
 async getSubCategoryList({ commit }, params) {
  commit('SET_STATE', {
   action: 'listLoading',
   data: true
  })
  try {
   const res = await this.$http.get('sub-category/', {  params: { ...params, status: true } })
   commit('SET_STATE', {
    action: 'listLoading',
    data: false
   })
   commit('SET_STATE', {
    action: 'subCategoryRecords',
    data: res.data.data.sub_categories
   })
   commit('SET_STATE', {
    action: 'subtotal',
    data: res.data.data.totalCount
   })
   commit('SET_STATE', {
    action: 'subFilteredCount',
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
 /*                             Create Sub Category                            */
 /* -------------------------------------------------------------------------- */
 async createSubCategory({ commit }, data) {
  commit('SET_STATE', {
   action: 'createLoading',
   data: true
  })
  try {
   const res = await this.$http.post('sub-category/', data)
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
 /*                         Update Sub Category Record                         */
 /* -------------------------------------------------------------------------- */
 async updateSubCategoryRecord({ commit }, { subCategoryId, data }) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put(`sub-category/${subCategoryId}`, data)
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
 },

 /* -------------------------------------------------------------------------- */
 /*                         Delete Sub Category Record                         */
 /* -------------------------------------------------------------------------- */
 async deleteSubCategoryRecord({ commit }, id) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.delete(`/sub-category/${id}`)
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
 /*                               Update Status                               */
 /* -------------------------------------------------------------------------- */
 async updateStatus({ commit }, { type, id }) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put(`${type}/status/${id}`)
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
 },

 /* -------------------------------------------------------------------------- */
 /*                             Manage Index Number                            */
 /* -------------------------------------------------------------------------- */
 async manageIndexNumber({ commit }, { type, id, index }) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put(`${type}/index/${id}`, { index })
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   return {
    data: res.data.data,
    message: res.data.message
   }
  } catch (error) {
   console.error(error)
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
}
