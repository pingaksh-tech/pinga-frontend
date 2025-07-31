import { getMessageFromError } from '../utils/functions'

export default {
  /* -------------------------------------------------------------------------- */
  /*                               Create Inventory                               */
  /* -------------------------------------------------------------------------- */
  async createInventory({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('inventory/', data)
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
  /*                                List Inventories                               */
  /* -------------------------------------------------------------------------- */
  async getInventoryList({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('inventory', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'InventoryRecords',
        data: res.data.data.inventories
      })
      commit('SET_STATE', {
        action: 'total',
        data: res.data.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountInventory',
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
  /*                               Delete Inventory                               */
  /* -------------------------------------------------------------------------- */
  async deleteInventoryRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/inventory/${id}`)
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      return {
        data: res.data,
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
  /*                               Update Inventory                               */
  /* -------------------------------------------------------------------------- */
  async updateInventoryRecord({ commit }, { inventoryId, data }) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.put(`inventory/${inventoryId}`, data)
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      return {
        data: res.data.data,
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
  /*                                                  get invantory by id action.                                                 */
  /* ---------------------------------------------------------------------------------------------------------------------------- */
  async getInvantoryById({ commit }, id) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get(`inventory/admin/${id}`)
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'inventoryRecord',
        data: res.data.data
      })
      return {
        data: res.data,
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
  /*                                                  import inventory api                                                        */
  /* ---------------------------------------------------------------------------------------------------------------------------- */

  async inventoryImportApi({ commit }, data) {
    commit('SET_STATE', {
      action: 'importLoading',
      data: true
    })
    try {
      const res = await this.$http.post('inventory/import-excel', data)
      commit('SET_STATE', {
        action: 'importLoading',
        data: true
      })
      return {
        message: res.data.message
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'importLoading',
        data: true
      })
      const errData = error.response.data.data.errorData

      // Return the error data in a consistent format
      return Promise.reject({
        data: errData || [
          {
            message: error.response.data.message || 'Import failed',
            product: []
          }
        ]
      })
    }
  },

  /* ---------------------------------------------------------------------------------------------------------------------------- */
  /*                                                  import inventory api                                                        */
  /* ---------------------------------------------------------------------------------------------------------------------------- */

  async imageImportApi({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('inventory/image-upload', data)
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
