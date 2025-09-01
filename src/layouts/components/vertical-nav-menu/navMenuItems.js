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
    permissions: ['dashboard_view']
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
    permissions: ['users_list']
  },
  {
    url: '/retailer/list',
    name: 'Retailers',
    slug: 'retailers',
    icon: 'ShoppingBagIcon',
    permissions: ['retailers_list']
  },
  {
    url: '/category/list',
    name: 'Categories',
    slug: 'categories',
    icon: 'LayersIcon',
    permissions: ['categories_list']
  },
  {
    url: '/category/subcategory/list',
    name: 'Sub Categories',
    slug: 'subcategories',
    icon: 'SlidersIcon',
    tag: 'sub',
    tagColor: 'success',
    permissions: ['subcategories_list']
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
    permissions: ['metals_list']
  },
  /** Admin Inventory Setting */
  {
    url: null,
    name: 'Inventories',
    slug: 'inventories',
    icon: 'PackageIcon',
    permissions: ['inventories_list', 'product_tags_list'],
    submenu: [
      {
        url: '/inventory/list',
        name: 'List',
        slug: 'inventories-list',
        icon: 'ListIcon',
        permissions: ['inventories_list']
      },
      {
        url: '/tag/list',
        name: 'Tags Mgmt',
        slug: 'ImportCsv',
        icon: 'BarChartIcon',
        tag: 'Tag',
        tagColor: 'warning',
        permissions: ['product_tags_list']
      }
    ]
  },
  //  Diamond clarity
  {
    url: '/diamond-clarity/list',
    name: 'Diamond Clarity',
    slug: 'DiamondClarity',
    icon: 'ZapIcon',
    permissions: ['diamond_Pricings_list']
  },

  /** Diamond Pricing List */
  {
    url: '/diamond-pricing/list',
    name: 'Diamond Pricings',
    slug: 'DiamondPricings',
    icon: 'CpuIcon',
    permissions: ['diamond_Pricings_list']
  },

  /** Latest Product List */
  {
    url: '/latest-product/list',
    name: 'Latest Products',
    slug: 'LatestProducts',
    icon: 'BoxIcon',
    permissions: ['latest_Products_list']
  },
  {
    url: '/collection/list',
    name: 'Collections',
    slug: 'Collections',
    icon: 'GridIcon',
    permissions: ['collections_list']
  },

  /** Ordersg List */
  {
    url: '/order/list',
    name: 'Orders',
    slug: 'orders',
    icon: 'ShoppingCartIcon',
    permissions: ['orders_list']
  },

  {
    url: '/setting/list',
    name: 'Settings',
    slug: 'Settings',
    icon: 'SettingsIcon',
    permissions: ['settings_list']
  },
  {
    url: '/banner/list',
    name: 'Banners',
    slug: 'banners',
    icon: 'ImageIcon',
    permissions: ['banners_list']
  },
  {
    url: '/labour-price/list',
    name: 'Labor Prices',
    slug: 'labor-prices',
    icon: 'DollarSignIcon',
    permissions: ['labour_Prices_list']
  },
  {
    url: '/upload/pdf',
    name: 'PDF Uploads',
    slug: 'pdf-uploads',
    icon: 'FileTextIcon',
    permissions: ['PDF_Uploads_list']
  },
  {
    url: '/roles-list',
    name: 'Role & Permission',
    slug: 'RolesList',
    icon: 'UserCheckIcon',
    permissions: ['roles_list']
  }
]
