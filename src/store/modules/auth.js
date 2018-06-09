import Vue from 'vue';
import { projectName } from '../../config';

const AUTH_TOKEN_KEY = 'cid_token';
const AGREEMENT_TOKEN_KEY = 'cid_agreement';

const URL = `project/${projectName}/`;

const setStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};
const removeStorageItem = (key) => {
  localStorage.removeItem(key);
};
const getStorageItem = key => localStorage.getItem(key);

export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    isAuthorized: state => state.token !== null,
    isAgreementConfirmed: () => getStorageItem(AGREEMENT_TOKEN_KEY) === 'Confirmed',
  },
  mutations: {
    setUserData(state, token) {
      setStorageItem(AUTH_TOKEN_KEY, token);
      state.token = token;
    },
    removeUserData(state) {
      removeStorageItem(AUTH_TOKEN_KEY);
      state.token = null;
    },
  },
  actions: {
    verify({ dispatch }) {
      if (getStorageItem(AUTH_TOKEN_KEY)) {
        dispatch('login', { cid_token: getStorageItem(AUTH_TOKEN_KEY) });
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
      return Vue.http.get(`${URL}new-user-project/`);
    },
    confirmAgreement() {
      localStorage.setItem(AGREEMENT_TOKEN_KEY, 'Confirmed');
    },
  },
};
