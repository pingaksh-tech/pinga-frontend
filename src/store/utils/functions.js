import axios from '@/axios'
import router from '../../router'

export const getMessageFromError = (err) => {
  if (err && err.response && err.response.data && err.response.data.status === 426) {
    delete axios.defaults.headers.common['Authorization']
    const url = `${process.env.VUE_APP_API_END_POINT}auth/refresh-token`
    const refresh_token = localStorage.getItem('refreshToken')

    // Axios request configuration for refreshing token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refresh_token}`
      }
    }

    return axios
      .post(url, {}, config)
      .then((response) => {
        const data = response.data.data

        if (response.status === 200) {
          console.log(response.status,'Token Refresh and set completed response.status');
          // Update tokens
          localStorage.setItem('accessToken', data.access_token)
          localStorage.setItem('refreshToken', data.refresh_token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`

          // Retry the original request
          const originalRequestConfig = err.config
          originalRequestConfig.headers['Authorization'] = `Bearer ${data.access_token}`
          return axios(originalRequestConfig)
        } else if (response.status === 401) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          router.push('/pages/login')
        }
      })
      .catch((error) => {
        console.error('Error refreshing token:', error)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        router.push('/pages/login')
      })
  } else {
    if (err && err.response && err.response.data && err.response.data.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/pages/login')
    }
  }

  // Determine error message to return
  const message =
    err.response && err.response.data && err.response.data.errors
      ? err.response.data.errors[0].msg
      : err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : err.message

  return Promise.resolve({ message })
}

export const handleFormError = (err) => {
  if (err.response.data && err.response.data.errors) {
    const messages = err.response.data.errors.reduce((acc, item) => {
      acc[item.param] = item.msg
      return acc
    }, {})

    return messages
  }
}
