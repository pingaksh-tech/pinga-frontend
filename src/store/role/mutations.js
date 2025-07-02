import _ from 'lodash'

export default {
  SET_STATE: (state, payload) => {
    _.set(state, payload.action, payload.data)
  },
  SET_STATUS(state, { id, status }) {
    const record = state.records.find((rec) => rec._id === id)
    if (record) {
      record.is_active = status
    }
  }
}
