import _ from 'lodash'

export default {
  SET_STATE: (state, payload) => {
    console.log('here... set state data', payload.action, payload.data)
    _.set(state, payload.action, payload.data)
  }
}
