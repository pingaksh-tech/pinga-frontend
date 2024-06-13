import { getMessageFromError } from '../utils/functions'

export default {
  /* -------------------------------------------------------------------------- */
  /*                               Create Diamond                               */
  /* -------------------------------------------------------------------------- */
  async createDiamond({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('diamond/', data)
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
  /*                                List Diamonds                               */
  /* -------------------------------------------------------------------------- */
  async getDiamondList({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('diamond', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'DiamondRecords',
        data: res.data.data.diamonds
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
  /*                               Delete Diamond                               */
  /* -------------------------------------------------------------------------- */
  async deleteDiamondRecord({ commit }, id) {
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
  /*                               Update Diamond                               */
  /* -------------------------------------------------------------------------- */
  async updateDiamondRecord({ commit }, { diamondId, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`category/${diamondId}`, data)
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
}
