export default [
  {
    path: '/products/list',
    name: 'products-list',
    component: () => import('@/views/products/Products.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Products List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Products' }, { title: 'Products List', active: true }]
    }
  },
  {
    path: '/products/add',
    name: 'create-products',
    component: () => import('@/views/products/AddProduct.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Add Product',
      breadcrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Products', url: '/products/add' },
        { title: 'Add product', active: true }
      ]
    }
  },
  {
    path: '/tag/list',
    name: 'tag-list',
    component: () => import('@/views/products/tag/Tag.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Tag List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'tag' }, { title: 'Tag List', active: true }]
    }
  }
]
