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
  // // Users
  // {
  //   url: null,
  //   name: 'Users',
  //   slug: 'Users',
  //   icon: 'UsersIcon',
  //   permissions: [ALLPERMISSIONS],
  //   submenu: [
  //     {
  //       url: '/Users/create',
  //       name: 'Add Users',
  //       slug: 'AddUsers',
  //       icon: 'PlusIcon',
  //       permissions: [ALLPERMISSIONS]
  //     },
  //     {
  //       url: '/Users/list',
  //       name: 'Users List',
  //       slug: 'UserList',
  //       icon: 'ListIcon',
  //       permissions: [ALLPERMISSIONS]
  //     }
  //   ]
  // },
  // Users
  {
    url: null,
    name: 'Retailers',
    slug: 'retailers',
    icon: 'UsersIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/retailer/list',
        name: 'Retailers List',
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
        url: '/category/subcategory/list',
        name: 'Sub Category',
        slug: 'sub-category',
        icon: 'ListIcon',
        tag: 'sub',
        tagColor: 'success',
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
        url: '/diamond/list',
        name: 'List',
        slug: 'diamond-List',
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
        url: '/metal/list',
        name: 'List',
        slug: 'metal-list',
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
  },
  /** Admin Banner Setting */
  {
    url: null,
    name: 'Banner',
    slug: 'banner',
    icon: 'ImageIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/banner/list',
        name: 'List',
        slug: 'productsList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      }
    ]
  }
]
