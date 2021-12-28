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

]
