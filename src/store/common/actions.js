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
  /*                      Metal Options For Dropdown API                     */
  /* -------------------------------------------------------------------------- */
  async getMetals({ commit }, params) {
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
      return {
        data: res.data.data.metal.map((c) => ({
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
  /*                      Diamond Options For Dropdown API                     */
  /* -------------------------------------------------------------------------- */
  async getDiamonds({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('diamond/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      return {
        data: res.data.data.diamonds.map((c) => ({
          value: c._id,
          label: c.diamond_clarity
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
  /*                      Product Tags Options For Dropdown API                     */
  /* -------------------------------------------------------------------------- */
  async getProductTags({ commit }, params) {
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
      return {
        data: res.data.data.productTags.map((c) => ({
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

  /* ---------------------------------------------------------------------------------------------------------------------------- */
  /*                                               Get Sub Category For Dropdown API                                              */
  /* ---------------------------------------------------------------------------------------------------------------------------- */

  async getSubCategoryByCategoryId({ commit }, categoryId) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    commit('SET_STATE', {
      action: 'SubCategoryList',
      data: []
    })
    try {
      const res = await this.$http.get(`/sub-category?categoryId=${categoryId}&page=1&limit=100`)
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })

      commit('SET_STATE', {
        action: 'SubCategoryList',
        data: res.data.data.sub_categories.map((c) => ({
          value: c._id,
          label: c.name
        }))
      })

      return {
        data: res.data.data.sub_categories.map((c) => ({
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
      commit('SET_STATE', {
        action: 'SubCategoryList',
        data: []
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
      console.log(res)
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
  }
}
