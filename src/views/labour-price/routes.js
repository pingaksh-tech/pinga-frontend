export default [
 {
  path: '/labour-price/list',
  name: 'labour-price-list',
  component: () => import('@/views/labour-price/index.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'Labour Price List',
   breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Labour Price' }, { title: 'Labour Price List', active: true }],
   permissions: ['labour_Prices_list']
  }
 }
]
