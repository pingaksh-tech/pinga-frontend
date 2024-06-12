import axios from "@/axios";
import { getMessageFromError } from "../utils/functions";

export default {
  // login action
  async login({ commit, root }, data) {
    commit("SET_STATE", {
      action: "loading",
      data: true,
    });
    try {
      const res = await this.$http.post("/auth/login", data);
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.data.tokens.access_token}`;
      localStorage.setItem("accessToken", res.data.data.tokens.access_token);
      commit("SET_USER_INFO", res.data.data.user);
      commit("SET_BEARER", res.data.data.tokens.access_token);

      commit("SET_STATE", {
        action: "userInfo",
        data: res.data.data.user,
      });

      return {
        data: res.data.data,
        message: res.data.message,
      };
    } catch (error) {
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      const messages = getMessageFromError(error);
      return Promise.reject(messages);
    }
  },

  // change password action.
  async changePassword({ commit }, data) {
    commit("SET_STATE", {
      action: "loading",
      data: true,
    });
    try {
      const res = await this.$http.post("user/password/reset-password", data);
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      return {
        message: res.data.msg,
      };
    } catch (error) {
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      const messages = getMessageFromError(error);
      return Promise.reject(messages);
    }
  },

  // logout action
  async logoutUser({ commit }, data) {
    commit("SET_STATE", {
      action: "loading",
      data: true,
    });
    try {
      const res = await this.$http.post("user/logout", data);
      localStorage.removeItem("accessToken");
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      return {
        message: res.data.msg,
      };
    } catch (error) {
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      const messages = getMessageFromError(error);
      return Promise.reject(messages);
    }
  },

  // update profile action.
  async updateProfile({ commit }, data) {
    commit("SET_STATE", {
      action: "loading",
      data: true,
    });
    try {
      const res = await this.$http.put("/user/update-user", data);
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      return {
        data: res.data.data,
        message: res.data.message,
      };
    } catch (error) {
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      const { message } = getMessageFromError(error);
      return Promise.reject({
        message,
      });
    }
  },

  // get admin profile action.
  async getUserProfile({ commit }) {
    commit("SET_STATE", {
      action: "loading",
      data: true,
    });
    try {
      const res = await this.$http.get("/auth/verify-token");
      
      commit("SET_PERMISSIONS", res.data.data.permission);
      commit("SET_COMPANY_INFO", res.data.data.company._id);
      // commit('SET_COMPANY_ID', res.data.data.company._id)
      // localStorage.setItem('companyName', res.data.data.company.name)
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      commit("SET_STATE", {
        action: "userInfo",
        data: res.data.data.user,
      });
      commit("SET_USER_ROLE", res.data.data.user.role.role_name);
      return {
        data: res.data.data.user,
        message: res.data.message,
      };
    } catch (error) {
      commit("SET_STATE", {
        action: "loading",
        data: false,
      });
      const { message } = getMessageFromError(error);
      return Promise.reject({
        message,
      });
    }
  },
};
