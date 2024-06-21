export default [
  {
    path: '/inventory/list',
    name: 'inventory-list',
    component: () => import('@/views/inventory/Inventory.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Categories List',
      breadcrumb: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Category' }, { title: 'Category List', active: true }]
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
        { title: 'Inventorys', url: '/inventory/list' },
        { title: 'Add Category', active: true }
      ]
    }
  },
  {
    path: '/inventory/:id/edit',
    name: 'edit-inventory',
    component: () => import('@/views/inventory/EditInventory.vue'),
    meta: {
      allowAnonymous: false,
      pageTitle: 'Edit Inventory',
      breadcrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Inventorys', url: '/inventory/list' },
        { title: 'Edit Category', active: true }
      ]
    }
  }
]
