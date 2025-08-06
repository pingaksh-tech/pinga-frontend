import { getMessageFromError } from '../utils/functions'

export default {
  /* -------------------------------------------------------------------------- */
  /*                                Create User                                */
  /* -------------------------------------------------------------------------- */
  async createUser({ commit }, data) {
    commit('SET_STATE', {
      action: 'createLoading',
      data: true
    })
    try {
      const res = await this.$http.post('users/', data)
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
  /*                               Get User List                               */
  /* -------------------------------------------------------------------------- */
  async getUserList({ commit }, params) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get('users/', { params })
      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'UserRecords',
        data: res.data.data.users
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
  /*                             Delete User Record                            */
  /* -------------------------------------------------------------------------- */
  async deleteUserRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/users/${id}`)
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
  /*                              Get User Record                              */
  /* -------------------------------------------------------------------------- */
  async getUserRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`users/${id}`)
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
  /*                             Update User Record                            */
  /* -------------------------------------------------------------------------- */
  async updateUserRecord({ commit }, { UserId, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`users/${UserId}`, data)
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
  /*                             Update User Status                            */
  /* -------------------------------------------------------------------------- */
  async publishUser({ commit }, { id, publish }) {
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
  },
  async getManagers({ commit }, roleId) {
    commit('SET_STATE', {
      action: 'managersLoading',
      data: true
    })
    try {
      const res = await this.$http.get('/users/role-wise-users', { params: { role: roleId,type:"Retailer" } })
      const formattedManagers = (res.data.data || []).map((manager) => ({
        value: manager._id,
        label: `${manager.first_name} ${manager.last_name}`
      }))
      commit('SET_STATE', {
        action: 'managersLoading',
        data: false
      })
      commit('SET_STATE', {
        action: 'managers',
        data: formattedManagers
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'managersLoading',
        data: false
      })
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                             Update User Status                            */
  /* -------------------------------------------------------------------------- */

  async updateUserStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/users/status/${id}`, { status })
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
