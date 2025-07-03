export default [
 {
  path: '/metal/list',
  name: 'metal-list',
  component: () => import('@/views/metal/Metal.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'Metal List',
   breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Metal' }, { title: 'Metal List', active: true }],
   permissions: ['metals_list']
  }
 },
 {
  path: '/metal/create',
  name: 'create-metal',
  component: () => import('@/views/metal/AddMetalModal.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'Add Metal',
   breadcrumb: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Category', url: '/metal/create' },
    { title: 'Create Metal', active: true }
   ],
   permissions: ['metals_create']
  }
 }
]
