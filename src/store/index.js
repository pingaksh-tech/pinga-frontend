import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

/** Auth Module */
import category from './category'
/** Category API Store */
import auth from './auth'
/** Metal API Store */
import metal from './metal'
/** Common API Store */
import common from './common'
/** Diamond API Store */
import diamond from './diamond'
/** Tag API Store */
import product from './product'
/** Retailer API Store */
import retailer from './retailer'
/** Inventory API Store */
import inventory from './inventory'
/** Banner API Store */
import banner from './banner'
/** latestProduct API Store */
import latestProduct from './latest-product'
/** labourPrice API Store */
import labourPrice from './labour-price'
/** collection API Store */
import collection from './collection'
/** setting API Store */
import setting from './setting'
/** diamond-pricing API Store */
import diamondPricing from './diamond-pricing'
/** pdf-upload API Store */
import pdfUpload from './pdf-upload'
/** user API Store */
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
 getters,
 mutations,
 state,
 actions,
 strict: process.env.NODE_ENV !== 'production',
 modules: {
  category,
  auth,
  metal,
  common,
  product,
  diamond,
  retailer,
  inventory,
  banner,
  latestProduct,
  collection,
  setting,
  diamondPricing,
  user,
  pdfUpload,
  labourPrice
 }
})
