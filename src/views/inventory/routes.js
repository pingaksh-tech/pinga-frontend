export default [
  {
    path: '/inventory/list',
    name: 'inventory-list',
    component: () => import('@/views/inventory/Inventory.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Inventories List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Inventories' }, { title: 'Inventory List', active: true }]
    }
  },
  {
    path: '/inventory/add',
    name: 'create-inventory',
    component: () => import('@/views/inventory/AddInventory.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Add Inventory',
      breadcrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Inventories', url: '/inventory/list' },
        { title: 'Add Inventory', active: true }
      ]
    }
  },
  {
    path: '/inventory/:id/edit',
    name: 'edit-inventory',
    component: () => import('@/views/inventory/AddInventory.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Edit Inventory',
      breadcrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Inventories', url: '/inventory/list' },
        { title: 'Edit Inventory', active: true }
      ]
    }
  }
]
