import { getMessageFromError } from '../utils/functions'

export default {
  /* -------------------------------------------------------------------------- */
  /*                               Create Banner                                */
  /* -------------------------------------------------------------------------- */
  async createBanner({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('banner/', data)
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
      // Extract the error message using the getMessageFromError function
      const { message } = await getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  /* -------------------------------------------------------------------------- */
  /*                              Get Banner   List                             */
  /* -------------------------------------------------------------------------- */
  async getBannerList({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('banner/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'BannerRecords',
        data: res.data.data
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
  /*                               Delete Banner                                */
  /* -------------------------------------------------------------------------- */
  async deleteBannerRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/banner/${id}`)
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
  /*                              Get Banner   Info                             */
  /* -------------------------------------------------------------------------- */
  async getBannerRecord({ commit }, id) {
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
  /*                               Update Banner                                */
  /* -------------------------------------------------------------------------- */
  async updateBannerRecord({ commit }, { bannerId, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`banner/${bannerId}`, data)
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
  /*                       update Banner   status action.                       */
  /* -------------------------------------------------------------------------- */
  async publishBanner({ commit }, { id, publish }) {
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
