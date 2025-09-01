/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pingaksh
  Author URL: http://www.themeforest.net/user/Pingaksh
==========================================================================================*/

import Vue from 'vue'
import Router from 'vue-router'
import axios from './axios'
import store from './store'
import UserRoute from '@/views/users/routes'
import CategoryRoute from '@/views/category/routes'
/** Product Module */
import ProductRoute from '@/views/products/routes'
/** Metal Module */
import MetalRoute from '@/views/metal/routes'
/** Diamond Module */
import DiamondRoute from '@/views/diamond/routes'
/** Retailer Module */
import RetailerRoute from '@/views/retailers/routes'
/** Banner Module */
import BannerRoute from '@/views/banner/routes'
/** LatestProductRoute Module */
import LatestProductRoute from '@/views/latest-product/routes'
/** LabourPriceRoute Module */
import LabourPriceRoute from '@/views/labour-price/routes'
/** Collection Module */
import CollectionRoute from '@/views/collection/routes'
/** Inventory Module */
import InventoryRoute from '@/views/inventory/routes'
/** Setting Module */
import SettingRoute from '@/views/setting/routes'
/** Setting Module */
import DiamondPricingRoute from '@/views/diamond-pricing/routes'
/** Upload PDF Module */
import UploadPdfRoute from '@/views/upload-pdf/routes'
/** Role Module */
import roleRoute from '@/views/roles/routes'
/** Order Module */
import orderRoute from '@/views/order/routes'
// diamond clarity
import DiamondClarityRoute from '@/views/diamond-clarity/routes'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      // MAIN LAYOUT ROUTES
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // Theme Routes
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            allowAnonymous: false
          }
        },
        // client routes
        ...UserRoute,
        // Category route
        ...CategoryRoute,
        // Product route
        ...ProductRoute,
        // Metal route
        ...MetalRoute,
        // Diamond route
        ...DiamondRoute,
        // Retailer route
        ...RetailerRoute,
        // Inventory route
        ...InventoryRoute,
        // Banner route
        ...BannerRoute,
        // LatestProduct route
        ...LatestProductRoute,
        // CollectionRoute route
        ...CollectionRoute,
        // Setting route
        ...SettingRoute,
        // DiamondPricing route
        ...DiamondPricingRoute,
        // order route
        ...orderRoute,
        // Upload PDF route
        ...UploadPdfRoute,
        // LabourPrice route
        ...LabourPriceRoute,
        // Role route
        ...roleRoute,
        ...DiamondClarityRoute,
      ]
    },

    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // PAGES
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue'),
          meta: {
            allowAnonymous: true
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        },
        {
          path: '/forget-password',
          name: 'forget-password',
          component: () => import('@/views/pages/ForgetPassword.vue')
        },
        {
          path: '/reset-password/:token',
          name: 'reset-password',
          component: () => import('@/views/pages/ResetPassword.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

/* ---------------------------------------------------------------------------------------------------------------------------- */
/*                                                    Authenticatation Check                                                    */
/* ---------------------------------------------------------------------------------------------------------------------------- */
const isAuthenticated = async () => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    localStorage.removeItem('accessToken')
    return false
  }
  if (accessToken && !store.state.auth.user) {
    try {
      const res = await axios.post('/auth/verify-token')
      // await store.dispatch('auth/fetchAllRoles')
      // await store.dispatch('auth/fetchAllPermissions')
      store.commit('auth/SET_USER_INFO', res.data.data.user)
      store.commit('auth/SET_PERMISSIONS', res.data.access_permissions)
      store.commit('auth/SET_USER_ROLE', res.data.data.user.role.name)
      return true
    } catch (err) {
      return false
    }
  } else if (accessToken && store.state.auth.user) {
    return true
  }
  return false
}

// router.beforeEach(async (to, from, next) => {
//  if (Object(to.meta).hasOwnProperty('allowAnonymous')) {
//   const authed = await isAuthenticated()
//   if (!to.meta.allowAnonymous && !authed) {
//    // localStorage.removeItem('accessToken')
//    return next({
//     path: '/pages/login'
//    })
//   } else if (to.meta.allowAnonymous && authed) {
//    return next({
//     path: '/'
//    })
//   } else {
//    return next()
//   }
//  }
//  return next()
// })

router.beforeEach(async (to, from, next) => {
  if (Object(to.meta).hasOwnProperty('allowAnonymous')) {
    const authed = await isAuthenticated()
    if (!to.meta.allowAnonymous && !authed) {
      localStorage.removeItem('accessToken')
      localStorage.setItem('redirectPath', to.fullPath)
      // store.dispatch('auth/logoutUser')
      return next({
        path: '/pages/login'
      })
    } else if (to.meta.allowAnonymous && authed) {
      return next({
        path: '/'
      })
    } else {
      if (!to.meta.allowAnonymous && to.meta && to.meta.permissions && !store.getters['auth/checkPermissionSlug'](to.meta.permissions || [])) {
        const app = window.document.getElementById('app')
        if (app && app.__vue__) {
          app.__vue__.$vs.notify({
            title: 'Error',
            text: `You don't have access to visit "${to.meta.pageTitle}"`,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'primary'
          })
        }
        return next({
          path: '/'
        })
      } else if (!to.meta.requiresAuth && to.meta && to.meta.roles && !to.meta.roles.includes(store.state.auth.userInfo.role.slug)) {
        const app = window.document.getElementById('app')
        if (app && app.__vue__) {
          app.__vue__.$vs.notify({
            title: 'Error',
            text: `You don't have access to visit "${to.meta.pageTitle}"`,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'primary'
          })
        }
        return next({
          path: '/'
        })
      }
      return next()
    }
  }
  return next()
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
