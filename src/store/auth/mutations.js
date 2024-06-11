import Axios from 'axios'
import _ from 'lodash'

export default {
  SET_BEARER(state, accessToken) {
    Axios.defaults.headers.common["x-access-token"] = accessToken;
  },
  SET_STATE: (state, payload) => {
    _.set(state, payload.action, payload.data);
  },
  SET_USER_INFO(state, user) {
    state.userInfo = user;
  },
};
