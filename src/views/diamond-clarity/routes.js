export default [
  {
    path: '/diamond-clarity/list',
    name: 'diamond-clarity-list',
    component: () => import('@/views/diamond-clarity/DiamondClarity.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Diamond Clarity List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Diamond Clarity ' }, { title: 'Diamond Clarity List', active: true }],
      permissions: ['collections_list']
    }
  }
]
