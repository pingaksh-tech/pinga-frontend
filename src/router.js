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
import UserRoute from '@/views/Users/routes'
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
/** Inventory Module */
import InventoryRoute from '@/views/inventory/routes'
/** Setting Module */
import SettingRoute from '@/views/setting/routes'
/** Setting Module */
import DiamondPricingRoute from '@/views/diamond-pricing/routes'
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
          component: () => import('./views/Home.vue')
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
        // Setting route
        ...SettingRoute,
        // DiamondPricing route
        ...DiamondPricingRoute
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
          component: () => import('@/views/pages/Login.vue')
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

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
