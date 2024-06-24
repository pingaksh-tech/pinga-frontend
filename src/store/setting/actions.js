import { getMessageFromError } from '../utils/functions'

export default {
  /* -------------------------------------------------------------------------- */
  /*                               Create Category                              */
  /* -------------------------------------------------------------------------- */
  async createPolicy({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('latest-product/', data)
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
  async getPolicyList({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading2',
      data: true
    })
    try {
      const res = await this.$http.get('latest-product/', { params })

      commit('SET_STATE', {
        action: 'listLoading2',
        data: false
      })

      commit('SET_STATE', {
        action: 'PolicyRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'dropDownOpt',
        data: res.data.data.map((c) => ({
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
        data: res.data.data.map((c) => ({
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
      const { message } = getMessageFromError(error)
      // return Promise.reject({
      //   message
      // })
    }
  },

  /* -------------------------------------------------------------------------- */
  /*                               Delete Category                              */
  /* -------------------------------------------------------------------------- */
  async deletePolicyRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/latest-product/${id}`)
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
  /*                               Update Category                              */
  /* -------------------------------------------------------------------------- */
  async updatePolicy({ commit }, { data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`latest-product`, data)
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
