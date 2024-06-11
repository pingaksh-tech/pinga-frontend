import { getMessageFromError } from "../utils/functions"

export default {
  // Create Category.
  async createCategory({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/announcement', data)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        message: res.data.message
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      // Manage Error
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  // Get Category List
  async getCategoryList({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('category/', { params })
      console.log(res.data.data,'res.data.data');
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'CategoryRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'total',
        data: res.data.data.announcement.totalDocs
      })
      commit('SET_STATE', {
        action: 'FilteredCount',
        data: res.data.data.announcement.totalDocs
      })
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

  // Delete Category
  async deleteCategoryRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/announcement/${id}`)
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

  // Get Category Info
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

  // Update Category
  async updateCategoryRecord({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`announcement/${id}`, data)
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

  // update Category status action.
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
  }
}
