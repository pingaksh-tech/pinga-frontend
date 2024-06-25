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
      const data = res.data.data
      let categories = data.categories.map((c) => ({
        value: c._id,
        label: c.name
      }))
      if (data.dropdownCategory) {
        categories.unshift({
          value: data.dropdownCategory._id,
          label: data.dropdownCategory.name
        })
      }

      return {
        data: categories,
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
    commit('SET_STATE', {
      action: 'DiamondList',
      data: []
    })

    try {
      const res = await this.$http.get('diamond/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })

      const data = res.data.data.diamonds.map((c) => ({
        value: c._id,
        label: c.diamond_clarity
      }))
      commit('SET_STATE', {
        action: 'DiamondList',
        data
      })

      return {
        data,
        message: res.data.message
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })

      commit('SET_STATE', {
        action: 'DiamondList',
        data: []
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

  async getSubCategoryByCategoryId({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    commit('SET_STATE', {
      action: 'SubCategoryList',
      data: []
    })
    try {
      const res = await this.$http.get(`/sub-category/`, { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })

      const data = res.data.data
      let sub_categories = data.sub_categories.map((c) => ({
        value: c._id,
        label: c.name
      }))
      if (data.dropdownSubCategory) {
        sub_categories.unshift({
          value: data.dropdownSubCategory._id,
          label: data.dropdownSubCategory.name
        })
      }

      commit('SET_STATE', {
        action: 'SubCategoryList',
        data: sub_categories
      })

      return {
        data: sub_categories,
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

  /* ---------------------------------------------------------------------------------------------------------------------------- */
  /*                                               Get Size For Dropdown API                                              */
  /* ---------------------------------------------------------------------------------------------------------------------------- */

  async getSizeBySubCategoryId({ commit }, subCategoryId) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    commit('SET_STATE', {
      action: 'SizeList',
      data: []
    })
    try {
      const res = await this.$http.get(`/sub-category/sizes/${subCategoryId}`)
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })

      commit('SET_STATE', {
        action: 'SizeList',
        data: res.data.data.map((c) => ({
          value: c._id,
          label: c.name
        }))
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
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'SizeList',
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
  /*                             Upload Single File                             */
  /* -------------------------------------------------------------------------- */
  // async storeSingleFile({ commit }, data) {
  //   commit('SET_STATE', {
  //     action: 'createLoading',
  //     data: true
  //   })
  //   try {
  //     const res = await this.$http.post('file/singleUpload/', data)
  //     commit('SET_STATE', {
  //       action: 'createLoading',
  //       data: false
  //     })
  //     return {
  //       data: res.data.data,
  //       message: res.data.message
  //     }
  //   } catch (error) {
  //     commit('SET_STATE', {
  //       action: 'createLoading',
  //       data: false
  //     })
  //     // Manage Error
  //     const { message } = getMessageFromError(error)
  //     return Promise.reject({
  //       message
  //     })
  //   }
  // },

  /* -------------------------------------------------------------------------- */
  /*                               Forget Password                              */
  /* -------------------------------------------------------------------------- */
  async forgetPassword({ commit }, data) {
    console.log(data)
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('auth/send-pass-reset-link', data)
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
      const messages = getMessageFromError(error)
      return Promise.reject(messages)
    }
  },

  /* ---------------------------------------------------------------------------------------------------------------------------- */
  /*                                               Get Diamond constant For Dropdown API                                          */
  /* ---------------------------------------------------------------------------------------------------------------------------- */

  async diamondConstant({ commit }) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    commit('SET_STATE', {
      action: 'diamondConstantList',
      data: []
    })
    try {
      const res = await this.$http.get(`/inventory/diamond/constant`)
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })

      const finalData = res.data.data
      commit('SET_STATE', {
        action: 'diamondConstantList',
        data: finalData
      })

      return {
        data: finalData,
        message: res.data.message
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'SizeList',
        data: []
      })
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  /* -------------------------------------------------------------------------- */
  /*                      Inventory For Dropdown API                     */
  /* -------------------------------------------------------------------------- */
  async getInventories({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('inventory/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      return {
        data: res.data.data.inventories.map((c) => ({
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
  /*                      Family Products Options For Dropdown API                     */
  /* -------------------------------------------------------------------------- */
  async getFamilyProducts({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('inventory/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      return {
        data: res.data.data.inventories.map((c) => ({
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
