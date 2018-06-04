import Vue from 'vue';
import { projectName } from '../../config';

const TOKEN_KEY = 'cid_token';

const setUser = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
const removeUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};
const getToken = () => localStorage.getItem(TOKEN_KEY);

export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    isAuthorized: state => state.token !== null,
  },
  mutations: {
    setUserData(state, token) {
      setUser(token);
      state.token = token;
    },
    removeUserData(state) {
      removeUser();
      state.token = null;
    },
  },
  actions: {
    verify({ dispatch }) {
      if (getToken()) {
        dispatch('login', { cid_token: getToken() });
      }
    },
    login({ commit }, user) {
      Vue.http.headers.common.Authorization = user.cid_token;
      commit('setUserData', user.cid_token);
    },
    logout({ commit }) {
      Vue.http.options.headers = {};
      commit('removeUserData');
    },
    getUserProject() {
      return Vue.http.get(`project/${projectName}/new-user-project/`);
    },
  },
};
