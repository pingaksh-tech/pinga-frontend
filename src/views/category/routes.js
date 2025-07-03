export default [
 {
  path: '/category/list',
  name: 'document-category-list',
  component: () => import('@/views/category/Category.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'Categories List',
   breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Category' }, { title: 'Category List', active: true }],
   permissions: ['categories_list']

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
   ],
   permissions: ['categories_create']
  }
 },
 /* -------------------------------------------------------------------------- */
 /*                             Sub Category Routes                            */
 /* -------------------------------------------------------------------------- */
 {
  path: '/category/subcategory/list',
  name: 'Sub Category List',
  component: () => import('@/views/category/subCategory/SubCategory.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'Sub Category',
   breadcrumb: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Category List', url: '/category/list' },
    { title: 'Sub Category List', active: true }
   ],
   permissions: ['subcategories_list']
  }
 }
]
