export default [
 {
  path: '/users/list',
  name: 'users-list',
  component: () => import('@/views/users/Users.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'User List',
   breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'User' }, { title: 'User List', active: true }],
   permissions: ['users_list']
  }
 }
]
