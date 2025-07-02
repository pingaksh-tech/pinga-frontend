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
  slug: 'dashboard',
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
  url: '/users/list',
  name: 'Users',
  slug: 'users',
  icon: 'UsersIcon',
  permissions: [ALLPERMISSIONS]
 },
 {
  url: '/retailer/list',
  name: 'Retailers',
  slug: 'retailers',
  icon: 'ShoppingBagIcon',
  permissions: [ALLPERMISSIONS]
 },
 {
  url: '/category/list',
  name: 'Categories',
  slug: 'categories',
  icon: 'LayersIcon',
  permissions: [ALLPERMISSIONS]
 },
 {
  url: '/category/subcategory/list',
  name: 'Sub Categories',
  slug: 'subcategories',
  icon: 'SlidersIcon',
  tag: 'sub',
  tagColor: 'success',
  permissions: [ALLPERMISSIONS]
 },


 /** Admin Daimond Setting */
 // {
 //   url: null,
 //   name: 'Diamond',
 //   slug: 'diamond',
 //   icon: 'CpuIcon',
 //   permissions: [ALLPERMISSIONS],
 //   submenu: [
 //     {
 //       url: '/diamond/list',
 //       name: 'List',
 //       slug: 'diamond-List',
 //       icon: 'ListIcon',
 //       permissions: [ALLPERMISSIONS]
 //     }
 //   ]
 // },
 /** Admin Metal Setting */
 {
  url: '/metal/list',
  name: 'Metals',
  slug: 'metals',
  icon: 'ServerIcon',
  permissions: [ALLPERMISSIONS]
 },
 /** Admin Inventory Setting */
 {
  url: null,
  name: 'Inventories',
  slug: 'inventories',
  icon: 'PackageIcon',
  permissions: [ALLPERMISSIONS],
  submenu: [
   {
    url: '/inventory/list',
    name: 'List',
    slug: 'inventories-list',
    icon: 'ListIcon',
    permissions: [ALLPERMISSIONS]
   },
   {
    url: '/tag/list',
    name: 'Tags Mgmt',
    slug: 'ImportCsv',
    icon: 'BarChartIcon',
    tag: 'Tag',
    tagColor: 'warning',
    permissions: [ALLPERMISSIONS]
   }
  ]
 },

 /** Diamond Pricing List */
 {
  url: '/diamond-pricing/list',
  name: 'Diamond Pricings',
  slug: 'DiamondPricings',
  icon: 'CpuIcon',
  permissions: [ALLPERMISSIONS]
 },

 /** Latest Product List */
 {
  url: '/latest-product/list',
  name: 'Latest Products',
  slug: 'LatestProducts',
  icon: 'BoxIcon',
  permissions: [ALLPERMISSIONS]
 },
 {
  url: '/collection/list',
  name: 'Collections',
  slug: 'Collections',
  icon: 'GridIcon',
  permissions: [ALLPERMISSIONS]
 },

 /** Ordersg List */
 {
  url: '/order/list',
  name: 'Orders',
  slug: 'orders',
  icon: 'ShoppingCartIcon',
  permissions: [ALLPERMISSIONS]
 },

 {
  url: '/setting/list',
  name: 'Settings',
  slug: 'Settings',
  icon: 'SettingsIcon',
  permissions: [ALLPERMISSIONS]
 },
 {
  url: '/banner/list',
  name: 'Banners',
  slug: 'banners',
  icon: 'ImageIcon',
  permissions: [ALLPERMISSIONS]
 },
 {
  url: '/labour-price/list',
  name: 'Labor Prices',
  slug: 'labor-prices',
  icon: 'DollarSignIcon',
  permissions: [ALLPERMISSIONS]
 },
 {
  url: '/upload/pdf',
  name: 'PDF Uploads',
  slug: 'pdf-uploads',
  icon: 'FileTextIcon',
  permissions: [ALLPERMISSIONS]
 },
 {
  url: '/roles-list',
  name: 'Role & Permission',
  slug: 'RolesList',
  icon: 'UserCheckIcon',
  permissions: [ALLPERMISSIONS]
 },
]
