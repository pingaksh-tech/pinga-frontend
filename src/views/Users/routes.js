export default [
  {
    path: '/Users/list',
    name: 'user-list',
    component: () => import('@/views/Users/UserList.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Users List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'User' }, { title: 'Users List', active: true }]
    }
  },
  {
    path: '/Users/create',
    name: 'create-user',
    component: () => import('@/views/Users/AddUser.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Add User',
      breadcrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'User', url: '/users/list' },
        { title: 'Add User', active: true }
      ]
    }
  },
  {
    path: '/Users/:id/edit',
    name: 'edit-user',
    component: () => import('@/views/Users/EditUser.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Edit User',
      breadcrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'User', url: '/Users/list' },
        { title: 'Add User', active: true }
      ]
    }
  },
  {
    path: '/profile',
    name: 'profile',
    // @ts-ignore
    component: () => import('@/views/Users/Profile.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Profile',
      breadcrumb: [{ title: 'Dashboard', url: '/' }]
    }
  },
]
