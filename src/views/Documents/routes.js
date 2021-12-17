export default [
  {
    path: '/Documents/list',
    name: 'document-category-list',
    component: () => import('@/views/Documents/DocumentsCategoryList.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Documents Categorys List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Documents' }, { title: 'Document category List', active: true }]
    }
  },
  {
    path: '/Category/add',
    name: 'create-category',
    component: () => import('@/views/Documents/AddCategoryModal.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Add Category',
      breadcrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Documents', url: '/category/create' },
        { title: 'Add Category', active: true }
      ]
    }
  }
]
