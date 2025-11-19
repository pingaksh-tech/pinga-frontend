export default {
  // checkPermissionByIds: (state) => (ids) => {
  //   if (!ids) return false
  //   return !!state.permissionIds.find((id) => ids.includes(id))
  // },
  checkPermissionSlug: (state) => (names) => {
    if (!names) return false
    return !!state.permissionSlugs.find((v) => names.includes(v))
  },
  checkRolesByIds: (state) => (ids) => {
    return ids.includes(state.userInfo.role.slug)
  }
}
