//import Vuex from 'vuex'
//import axios from 'axios'
export const strict = false;
import cookie from "cookie";

export const state = () => ({
  user: "no user",
  authUser: false,
  allGlobalPosts: [],
  globalPostLoading: true,
  token: "",
  unauthorizedCredential: { email: "", password: "" },
});
// common getters
export const getters = {
  getIsLoggedIn(state) {
    return !!state.authUser;
  },
  getAuthUser(state) {
    return state.authUser;
  },
  getToken(state) {
    return state.token;
  },

  unauthorizedCredential(state) {
    return state.unauthorizedCredential;
  },
  getallGlobalPosts(state) {
    return state.allGlobalPosts;
  },
  getglobalPostLoading(state) {
    return state.globalPostLoading;
  },
};
//mutations for changing data from action
export const mutations = {
  loginUser(state, data) {
    state.authUser = data;
  },
  setAuthInfo(state, data) {
    state.authUser = data;
  },
  updateCart(state, data) {
    state.cart = data;
  },
  setToken(state, data) {
    state.token = data;
  },
  removeItem(state, i) {
    state.cart.splice(i, 1);
  },
  removeAll(state, data) {
    state.cart = [];
  },

  setUnauthorizedCredential(state, data) {
    state.unauthorizedCredential = data;
  },
  setallGlobalPosts(state, data) {
    state.allGlobalPosts = data;
  },
  setglobalPostLoading(state, data) {
    state.globalPostLoading = data;
  },
  pushallGlobalPosts(state, data) {
    state.allGlobalPosts.push(data);
  },
};
// actionns for commiting mutations
export const actions = {
  async nuxtServerInit({ commit, state }, { $axios, req, env }) {
    console.log("I am running as nuxt server init");
    const session = req.headers.cookie ? cookie.parse(req.headers.cookie) : "";
    // console.log("token : ",session)
    $axios.setToken(session.token, "Bearer");
    try {
      const res = await $axios.get("/app/auth_user");
      console.log(res.data);
      commit("setAuthInfo", res.data);
      const cart = await $axios.get(`/app/get_cart`);
      if (cart.status == 200) {
        // console.log(cart.data);
        state.order.invoiceTotal = cart.data.total;
        commit("updateCart", cart.data.data);
      }
    } catch (e) {
      console.log("nuxt server error ");
    }
  },

  setToken({ commit }, data) {
    commit("setToken", data);
  },
  updateCart({ commit }, data) {
    commit("updateCart", data);
  },
  setAuthInfo({ commit }, data) {
    commit("setAuthInfo", data);
  },
};
