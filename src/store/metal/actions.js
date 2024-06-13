import { getMessageFromError } from "../utils/functions"

export default {
  /* -------------------------------------------------------------------------- */
  /*                                Create Metal                                */
  /* -------------------------------------------------------------------------- */
  async createMetal({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('metal/', data)
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
  /*                               Get Metal List                               */
  /* -------------------------------------------------------------------------- */
  async getMetalList({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('metal/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'MetalRecords',
        data: res.data.data.metal
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
  /*                             Delete Metal Record                            */
  /* -------------------------------------------------------------------------- */
  async deleteMetalRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/metal/${id}`)
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
  /*                              Get Metal Record                              */
  /* -------------------------------------------------------------------------- */
  async getMetalRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`metal/${id}`)
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
  /*                             Update Metal Record                            */
  /* -------------------------------------------------------------------------- */
  async updateMetalRecord({ commit }, {metalId, data} ) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`metal/${metalId}`, data)
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
  /*                             Update Metal Status                            */
  /* -------------------------------------------------------------------------- */
  async publishMetal({ commit }, { id, publish }) {
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
