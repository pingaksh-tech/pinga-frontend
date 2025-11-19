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
  },
  {
    path: '/order/list/:id',
    name: 'order-list-details',
    component: () => import('@/views/order/OrderDetails.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Orders Details',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Order' }, { title: 'Order List', url: '/order/list' }, { title: 'Order details', active: true }],
      permissions: ['orders_list']
    }
  }
]
