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
    diamond
  }
})
