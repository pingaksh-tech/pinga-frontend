import axios from '@/axios'
import { getMessageFromError } from '../utils/functions'

export default {
 // login action
 async login({ commit, root }, data) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.post('/auth/login', data)
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   console.log(res.data.data.user, 'res.data.data.user')
   // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.tokens.access_token}`
   // localStorage.setItem('accessToken', res.data.data.tokens.access_token)
   // localStorage.setItem('refreshToken', res.data.data.tokens.refresh_token)
   // localStorage.setItem('userName', `${res.data.data.user.first_name} ${res.data.data.user.last_name}`)
   // localStorage.setItem('email', res.data.data.user.email)
   // commit('SET_USER_INFO', res.data.data.user)
   // commit('SET_STATE', {
   //   action: 'user',
   //   data: res.data.data.user
   // })
   // commit('SET_STATE', {
   //   action: 'userInfo',
   //   data: res.data.data.user
   // })

   return {
    data: res.data.data,
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

 // resend otp
 async resendOtp({ commit, root }, data) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.post('/auth/resend-otp', data)
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   return {
    success: res.data.success,
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

 // Verify Otp
 async verifyOtp({ commit }, data) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.post('/auth/verify-otp', data)
   const loginResponse = res.data.data
   console.log(loginResponse.user, "=loginResponse.user")
   commit('SET_STATE', {
    action: 'userInfo',
    data: loginResponse.user
   })
   axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.tokens.access_token}`
   localStorage.setItem('accessToken', loginResponse.tokens.access_token)
   localStorage.setItem('refreshToken', loginResponse.tokens.refresh_token)
   localStorage.setItem('userName', `${loginResponse.user.first_name} ${loginResponse.user.last_name}`)
   localStorage.setItem('email', loginResponse.user.email)
   commit('SET_BEARER', loginResponse.tokens.access_token)
   commit('SET_PERMISSIONS', loginResponse.access_permissions)
   commit('SET_USER_INFO', loginResponse.user)
   commit('SET_STATE', {
    action: 'user',
    data: loginResponse.user
   })
   commit('SET_STATE', {
    action: 'userInfo',
    data: loginResponse.user
   })

   return {
    data: loginResponse,
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

 // change password action.
 async changePassword({ commit }, data) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.post('user/password/reset-password', data)
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   return {
    message: res.data.msg
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

 // logout action
 async logoutUser({ commit }, data) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.post('user/logout', data)
   localStorage.removeItem('accessToken')
   commit('SET_STATE', {
    action: 'loading',
    data: false
   })
   return {
    message: res.data.msg
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

 // update profile action.
 async updateProfile({ commit }, data) {
  commit('SET_STATE', {
   action: 'loading',
   data: true
  })
  try {
   const res = await this.$http.put('/user/update-user', data)
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

 // get admin profile action.
 // async getUserProfile({ commit }) {
 //  commit('SET_STATE', {
 //   action: 'loading',
 //   data: true
 //  })
 //  try {
 //   const res = await this.$http.get('/auth/verify-token')

 //   commit('SET_PERMISSIONS', res.data.data.permission)
 //   commit('SET_COMPANY_INFO', res.data.data.company._id)
 //   // commit('SET_COMPANY_ID', res.data.data.company._id)
 //   // localStorage.setItem('companyName', res.data.data.company.name)
 //   commit('SET_STATE', {
 //    action: 'loading',
 //    data: false
 //   })
 //   commit('SET_STATE', {
 //    action: 'userInfo',
 //    data: res.data.data.user
 //   })
 //   commit('SET_USER_ROLE', res.data.data.user.role.role_name)
 //   return {
 //    data: res.data.data.user,
 //    message: res.data.message
 //   }
 //  } catch (error) {
 //   commit('SET_STATE', {
 //    action: 'loading',
 //    data: false
 //   })
 //   const { message } = getMessageFromError(error)
 //   return Promise.reject({
 //    message
 //   })
 //  }
 // }
}
