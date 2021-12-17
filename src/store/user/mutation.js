export default {
  SET_STATE: (state, payload) => {
    state[payload.action] = payload.data
  }
}
