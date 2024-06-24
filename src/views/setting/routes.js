export default [
  {
    path: '/setting/list',
    name: 'setting-list',
    component: () => import('@/views/setting/Setting.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Setting',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Setting' }, { title: 'Setting', active: true }]
    }
  }
]
