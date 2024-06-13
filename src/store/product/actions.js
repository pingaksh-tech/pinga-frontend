import { getMessageFromError } from '../utils/functions'

export default {
  /* -------------------------------------------------------------------------- */
  /*                               Create Tag                              */
  /* -------------------------------------------------------------------------- */
  async createTag({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('product-tag/', data)
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
  /*                              Get Tag List                             */
  /* -------------------------------------------------------------------------- */
  async getTagList({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('product-tag/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'TagRecords',
        data: res.data.data.productTags
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
  /*                               Delete Tag                              */
  /* -------------------------------------------------------------------------- */
  async deleteTagRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/product-tag/${id}`)
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
  /*                               Update Tag                              */
  /* -------------------------------------------------------------------------- */
  async updateTagRecord({ commit }, { productTagId, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`product-tag/${productTagId}`, data)
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
