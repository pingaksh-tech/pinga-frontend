export default [
  {
    path: '/retailer/list',
    name: 'retailer-list',
    component: () => import('@/views/retailers/Retailers.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Retailer List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Retailer' }, { title: 'Retailer List', active: true }],
      permissions: ['retailers_list']
    }
  }
]
