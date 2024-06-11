// handle api error
import store from '../../store'
import router from '../../router'

export const getMessageFromError = (err) => {
  if (err && err.response  && err.response.data && err.response.data.status === 401) {
    localStorage.removeItem('accessToken')
    localStorage.setItem('IVU', false)
    router.push('/pages/login')
  }

  const message =
    err.response && err.response.data && err.response.data.errors
      ? err.response.data.errors[0].msg
      : err.response && err.response.data.message
        ? err.response.data.message
        : err.message
  return { message }
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
