// axios
import axios from 'axios'

export const baseURL = process.env.VUE_APP_API_END_POINT

const accessToken = localStorage.getItem('accessToken')
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

export default axios.create({
  baseURL
  // You can add your headers here
})
