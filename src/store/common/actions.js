import { getMessageFromError } from '../utils/functions'

export default {
  /* -------------------------------------------------------------------------- */
  /*                      Category Options For Dropdown API                     */
  /* -------------------------------------------------------------------------- */
  async getCategories({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('category/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
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
  /*                            Upgrade Refresh Token                           */
  /* -------------------------------------------------------------------------- */
  async upgradeRefreshToken({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('refresh-token/', data)
      console.log(res);
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
}
