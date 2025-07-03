import Axios from 'axios'
import _ from 'lodash'

export default {
 SET_STATE: (state, payload) => {
  _.set(state, payload.action, payload.data)
 },
 SET_BEARER(state, accessToken) {
  Axios.defaults.headers.common['x-access-token'] = accessToken
 },
 SET_USER_INFO(state, user) {
  state.userInfo = user
 },
 SET_USER_ROLE(state, data) {
  state.userRole = data
 },
 SET_PERMISSIONS(state, permissions) {
  // state.permissions = permissions
  // state.permissionIds = Object.values(permissions).reduce((per, module) => {
  //   const ids = Object.values(module)
  //     .filter((per) => {
  //       return !!per.status
  //     })
  //     .map((per) => per.permission)
  //   per.push(...ids)
  //   return per
  // }, [])

  // state.permissionSlugs = permissions.map((value) => value.slug)
  // console.log('✨✨✨✨✨✨ state.permissionSlugs ✨✨✨✨✨✨', state.permissionSlugs);

  state.permissionSlugs = Object.values(permissions).reduce((per, module) => {
   const ids = Object.values(module)
    .filter((per) => {
     return !!per.status
    })
    .map((per) => per.slug)
   per.push(...ids)
   return per
  }, [])
 },

 SET_ROLE(state, roles) {
  // state.roles = roles.reduce((acc, role) => {
  //   acc[role.slug] = role.slug // Set the slug as the key and _id as the value
  //   return acc
  // }, {})
 },

 SET_ALL_PERMISSIONS(state, permissions) {
  // Transform the permissions array into an object
  // state.allPermissions = permissions.reduce((acc, permission) => {
  //   acc[permission.slug] = permission._id // Set the slug as the key and _id as the value
  //   return acc
  // }, {})
  // Store permission IDs for easier access if needed
  // state.allPermissionIds = permissions.map((permission) => permission._id)
 }
}
