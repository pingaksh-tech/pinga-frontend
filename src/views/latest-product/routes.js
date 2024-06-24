export default [
  {
    path: '/latest-product/list',
    name: 'latest-product-list',
    component: () => import('@/views/latest-product/LatestProduct.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Latest Product List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Latest Product List' }, { title: 'Latest Product List', active: true }]
    }
  }
]
