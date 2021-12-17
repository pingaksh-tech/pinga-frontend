import axios from '@/axios'
import { getMessageFromError } from '@/utils/functions'

export default {
  //get user
  getUsers: async ({ commit }, payload) => {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await axios.get('/', {
        params: payload
      })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'users',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'total',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCount',
        data: res.data.FilteredCount
      })
      return {
        data: res.data.data,
        FilteredCount: res.data.FilteredCount,
        total: res.data.totalCount
      }
    } catch (err) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      const { message } = getMessageFromError(err)
      return Promise.reject({
        message
      })
    }
  },

  //  active status
  updateActiveStatus: async ({ commit }, { id, status }) => {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })

    try {
      const res = await axios.put('/', {
        status
      })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        data: res.data.data,
        message: res.data.message
      }
    } catch (err) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      const { message } = getMessageFromError(err)
      return Promise.reject({ message })
    }
  },

  // add user
  insert: async (_, payload) => {
    try {
      const res = await axios.post('/', payload)
      return {
        data: res.data.user,
        message: res.data.message
      }
    } catch (err) {
      const { message } = getMessageFromError(err)
      return Promise.reject({
        message
      })
    }
  },

  // update user
  updateUserById: async (_, { id, data }) => {
    try {
      const res = await axios.put('', data)

      return {
        data: res.data.data,
        message: res.data.message
      }
    } catch (err) {
      const { message } = getMessageFromError(err)
      return Promise.reject({
        message
      })
    }
  }
}
