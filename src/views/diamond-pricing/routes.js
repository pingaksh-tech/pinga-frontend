export default [
 {
  path: '/diamond-pricing/list',
  name: 'diamond-pricing-list',
  component: () => import('@/views/diamond-pricing/DiamondPricing.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'Diamond Pricing List',
   breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Diamond Pricing' }, { title: 'Diamond Pricing List', active: true }]
  }
 }
]
