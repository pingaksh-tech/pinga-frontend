import _ from 'lodash'

export default {
  SET_STATE: (state, payload) => {
    console.log(state, payload)
    _.set(state, payload.action, payload.data)
  }
}
