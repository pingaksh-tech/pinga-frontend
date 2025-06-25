import { getMessageFromError } from '../utils/functions'

export default {
 async createPdfLink({ commit }, formData) {
  commit('SET_STATE', {
   action: 'createLoading',
   data: true
  })

  try {
   const response = await this.$http.post('pdf-link/create-link', formData, {
    headers: {
     'Content-Type': 'multipart/form-data'
    }
   })

   commit('SET_STATE', {
    action: 'createLoading',
    data: false
   })

   return {
    data: response.data.data,
    message: response.data.message
   }
  } catch (error) {
   commit('SET_STATE', {
    action: 'createLoading',
    data: false
   })
   let message = 'Failed to generate PDF link'
   if (error.response && error.response.data && error.response.data.message) {
    message = error.response.data.message
   }

   throw new Error(message)
  } finally {
   commit('SET_STATE', {
    action: 'createLoading',
    data: false
   })
  }
 }
}
