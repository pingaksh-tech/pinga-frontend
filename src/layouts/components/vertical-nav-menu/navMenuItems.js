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
      }
      // {
      //   url: '/customers/import',
      //   name: 'Import',
      //   slug: 'ImportCsv',
      //   icon: 'ListIcon',
      //   tag: 'new',
      //   tagColor: 'success',
      //   permissions: [ALLPERMISSIONS]
      // }
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
        name: 'Add Variant',
        slug: 'ImportCsv',
        icon: 'BarChartIcon',
        tag: 'new',
        tagColor: 'success',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },

  /** Admin Setting */
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
        name: 'Add Variant',
        slug: 'ImportCsv',
        icon: 'BarChartIcon',
        tag: 'new',
        tagColor: 'success',
        permissions: [ALLPERMISSIONS]
      }
    ]
  }
]
