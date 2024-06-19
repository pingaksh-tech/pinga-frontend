import Axios from 'axios'
import _ from 'lodash'

export default {
  SET_STATE: (state, payload) => {
    _.set(state, payload.action, payload.data);
  },
  SET_USER_INFO(state, user) {
    state.userInfo = user;
  },
};
