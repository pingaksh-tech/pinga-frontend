export default [
  {
    path: '/category/list',
    name: 'document-category-list',
    component: () => import('@/views/category/Category.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Categorys List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Category' }, { title: 'Category List', active: true }]
    }
  },
  {
    path: '/category/add',
    name: 'create-category',
    component: () => import('@/views/category/AddCategoryModal.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Add Category',
      breadcrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Category', url: '/category/create' },
        { title: 'Add Category', active: true }
      ]
    }
  }
]
