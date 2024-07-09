import { getMessageFromError } from '../utils/functions'

export default {
  /* -------------------------------------------------------------------------- */
  /*                              Find Setting                             */
  /* -------------------------------------------------------------------------- */
  async getSetting({ commit }, { setting_name }) {
    commit('SET_STATE', {
      action: 'listLoading',
      data: true
    })
    try {
      const res = await this.$http.get(`mobile/setting/${setting_name}`)

      commit('SET_STATE', {
        action: 'listLoading',
        data: false
      })

      commit('SET_STATE', {
        action: 'settingRecord.' + setting_name,
        data: res.data.data.setting
      })
      commit('SET_STATE', {
        action: 's3Path',
        data: res.data.data.s3Path
      })
      return {
        data: res.data.data.setting,
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
  /*                               Update Policy                              */
  /* -------------------------------------------------------------------------- */
  async updatePolicy({ commit }, { data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.patch(`mobile/setting/policies`, data)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'settingRecord.' + res.data.data.setting_name,
        data: res.data.data
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
  /*                               Update Customer Support                              */
  /* -------------------------------------------------------------------------- */
  async updateCustomerSuppport({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.patch(`mobile/setting/customer-support`, data)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'settingRecord.' + res.data.data.setting_name,
        data: res.data.data
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
  /*                               Update Profile Banner                              */
  /* -------------------------------------------------------------------------- */
  async updateProfileBanner({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`mobile/setting/profile-banner`, data)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      console.log(res.data.data.setting_name)
      commit('SET_STATE', {
        action: 'settingRecord.' + res.data.data.setting_name,
        data: res.data.data
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
