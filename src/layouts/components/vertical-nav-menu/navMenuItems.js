import * as permissions from '@/utils/permissions'
import * as roles from '@/utils/roles'

const { ADMIN } = roles

const ALLPERMISSIONS = [...Object.values(permissions)]
const ALLROLES = [...Object.values(roles)]

export default [
  // dashboard
  {
    url: '/',
    name: 'Dashboard',
    slug: 'Dashboard',
    icon: 'HomeIcon',
    permissions: ALLPERMISSIONS,
    roles: ALLROLES
  },
  // Users
  {
    url: null,
    name: 'Users',
    slug: 'Users',
    icon: 'UsersIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/Users/create',
        name: 'Add Users',
        slug: 'AddUsers',
        icon: 'PlusIcon',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/Users/list',
        name: 'Users List',
        slug: 'UserList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },

  // Cutsomers
  {
    url: null,
    name: 'Category',
    slug: 'Category',
    icon: 'SlidersIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/category/list',
        name: 'List',
        slug: 'categoryList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/customers/import',
        name: 'Sub Category',
        slug: 'sub-category',
        icon: 'ListIcon',
        tag: 'sub',
        tagColor: 'success',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },

  /** Products Routes */
  {
    url: null,
    name: 'Products',
    slug: 'Products',
    icon: 'LayersIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/products/list',
        name: 'List',
        slug: 'productsList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/products/add',
        name: 'Add Product',
        slug: 'ImportCsv',
        icon: 'PlusIcon',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/products/add',
        name: 'Collection',
        slug: 'collection',
        icon: 'ShoppingBagIcon',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/products/add',
        name: 'Add Variant',
        slug: 'ImportCsv',
        icon: 'BarChartIcon',
        tag: 'variant',
        tagColor: 'success',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/products/add',
        name: 'Tags Mgmt',
        slug: 'ImportCsv',
        icon: 'BarChartIcon',
        tag: 'Tag',
        tagColor: 'warning',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },

  /** Admin Size Setting */
  {
    url: null,
    name: 'Size',
    slug: 'Size',
    icon: 'PocketIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/products/list',
        name: 'List',
        slug: 'productsList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },

  /** Admin Color Setting */
  {
    url: null,
    name: 'Colors',
    slug: 'colors',
    icon: 'LifeBuoyIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/products/list',
        name: 'List',
        slug: 'productsList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },
  /** Admin Daimond Setting */
  {
    url: null,
    name: 'Diamond',
    slug: 'diamond',
    icon: 'CpuIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/products/list',
        name: 'List',
        slug: 'productsList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },
  /** Admin Metal Setting */
  {
    url: null,
    name: 'Metal',
    slug: 'metal',
    icon: 'ServerIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/products/list',
        name: 'List',
        slug: 'productsList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },
  /** Admin Inventory Setting */
  {
    url: null,
    name: 'Inventory',
    slug: 'inventory',
    icon: 'DatabaseIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/products/list',
        name: 'List',
        slug: 'productsList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      }
    ]
  }
]
