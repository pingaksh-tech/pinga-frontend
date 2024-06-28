export default [
  {
    path: '/collection/list',
    name: 'collection-list',
    component: () => import('@/views/collection/Collection.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Collection List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Collection List' }, { title: 'Collection List', active: true }]
    }
  }
]
