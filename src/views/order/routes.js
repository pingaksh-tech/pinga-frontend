export default [
 {
  path: '/order/list',
  name: 'order-list',
  component: () => import('@/views/order/index.vue'),
  meta: {
   allowAnonymous: false,
   pageTitle: 'Orders List',
   breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Order' }, { title: 'Order List', active: true }],
   permissions: ['orders_list']
  }
 }
]
