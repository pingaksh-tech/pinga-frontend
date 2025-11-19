export default [
  {
    path: '/banner/list',
    name: 'banner-list',
    component: () => import('@/views/banner/Banner.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Banner List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Banner' }, { title: 'Banner List', active: true }],
      permissions: ['banners_list']
    }
  }
]
