export default [
 {
  path: '/upload/pdf',
  name: 'upload-pdf-list',
  component: () => import('@/views/upload-pdf/action.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'Upload PDF',
   breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Upload PDF' }, { title: 'Upload PDF List', active: true }]
  }
 }
]
