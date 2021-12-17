/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import * as permissions from '@/utils/permissions'
import * as roles from '@/utils/roles'

const { USER_ADD, USER_VIEW } = permissions

const { ADMIN } = roles

const ALLPERMISSIONS = [...Object.values(permissions)]
const ALLROLES = [...Object.values(roles)]

export default [
  // dashboard
  {
    url: '/dashboard',
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
    icon: 'BriefcaseIcon',
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

  // Documents
  {
    url: '/Documents/list',
    name: 'Documents',
    slug: 'Documents',
    icon: 'BookIcon',
    permissions: [ALLPERMISSIONS]
  },

  // Cutsomers
  {
    url: null,
    name: 'Cutsomers',
    slug: 'Cutsomers',
    icon: 'ActivityIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/customers/create',
        name: 'Customer',
        slug: 'AddCustomer',
        icon: 'PlusIcon',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/customers/list',
        name: 'History',
        slug: 'customersList',
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

  // Location
  {
    url: '/location/list',
    name: 'Item Locations',
    slug: 'LocationList',
    icon: 'MapPinIcon',

    permissions: [ALLPERMISSIONS]
  },

  // item
  {
    url: null,
    name: 'Item',
    slug: 'Item',
    icon: 'TagIcon',
    permissions: [ALLPERMISSIONS],
    submenu: [
      {
        url: '/items/create',
        name: 'Add Item',
        slug: 'AddItem',
        icon: 'PocketIcon',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/items/list',
        name: 'Item List',
        slug: 'ItemList',
        icon: 'ListIcon',
        permissions: [ALLPERMISSIONS]
      },
      {
        url: '/items/import',
        name: 'Import',
        slug: 'ImportItem',
        icon: 'ListIcon',
        tag: 'new',
        tagColor: 'success',
        permissions: [ALLPERMISSIONS]
      }
    ]
  },

  // Invoices
  {
    url: null,
    name: 'Invoices',
    slug: 'Invoices',
    icon: 'FileTextIcon',
    permissions: [ALLPERMISSIONS]
  },

  // Orders
  {
    url: null,
    name: 'Orders',
    slug: 'Orders',
    icon: 'SlidersIcon',
    permissions: [ALLPERMISSIONS]
  },

  // Delivery Person
  {
    url: null,
    name: 'Delivery Person',
    slug: 'Delivery Person',
    icon: 'UserIcon',
    permissions: [ALLPERMISSIONS]
  },
  // Delivery Receipt
  {
    url: null,
    name: 'Delivery Receipt',
    slug: 'Delivery Receipt',
    icon: 'FileIcon',
    permissions: [ALLPERMISSIONS]
  },

  // Order Pickup
  {
    url: null,
    name: 'Order Pickup',
    slug: 'Order Pickup',
    icon: 'TruckIcon',
    permissions: [ALLPERMISSIONS]
  },

  // Purchases
  {
    url: null,
    name: 'Purchases',
    slug: 'Purchases',
    icon: 'ShoppingBagIcon',
    permissions: [ALLPERMISSIONS]
  }
]
