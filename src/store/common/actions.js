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
  }
}
