export default [
  {
    path: '/roles-list',
    name: 'roles-list',
    component: () => import('@/views/roles/roleList.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Roles',
      parent: 'RolesList',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },
        { title: 'Roles List', active: true }
      ],
      permissions: ['roles_list']
    }
  },

  {
    path: '/role-permission/:id/edit',
    name: 'edit-role-permission',
    component: () => import('@/views/roles/editRolePermission.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Edit Role Permission',
      parent: 'RolesList',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },
        { title: 'Roles List', url: '/roles-list' },
        { title: 'Edit Role Permission', active: true }
      ],
      permissions: ['roles_edit']
    }
  }
]
