export default [
  {
    path: '/last-login/list',
    name: 'last-login-list',
    component: () => import('@/views/last-login/LastLogin.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Last Login List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Last Login' }, { title: 'Last Login List', active: true }],
      permissions: ['last_login_list']
    }
  }
]
