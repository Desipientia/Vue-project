import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import { projectName, wsRoot } from '../../config';

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
const vm = new Vue();

export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    isAuthorized: state => state.token !== null,
    authToken: () => getStorageItem(AUTH_TOKEN_KEY),
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
      if (user) {
        Vue.http.headers.common.Authorization = user.cid_token;
        // eslint-disable-next-line no-undef,no-console
        commit('setUserData', user.cid_token);
        if (user.purchase_agreement) {
          localStorage.setItem(AGREEMENT_TOKEN_KEY, 'Confirmed');
        }
      }
    },

    connectSocket({ state, rootState, dispatch }, userPk) {
      if ((state.token !== null && !rootState.socket.socket.isConnected) || state.token === null) {
        dispatch('dicsonnect');
        const wsUrl = `${wsRoot}${userPk}/`;
        Vue.use(VueNativeSock, wsUrl, {
          store: this,
          format: 'json',
          connectManually: true,
        });
        vm.$connect();
      }
    },
    logout({ commit, dispatch }) {
      dispatch('dicsonnect');
      Vue.http.options.headers = {};
      commit('removeUserData');
    },
    dicsonnect({ rootState }) {
      if (rootState.socket.socket.isConnected) {
        vm.$disconnect();
      }
    },
    getUserProject() {
      return Vue.http.get(`${URL}new-user-project/`);
    },
    confirmAgreement({}, data) {
      Vue.http.put(`${URL}license-agreement/`, { questions: data }).then(() => {
        localStorage.setItem(AGREEMENT_TOKEN_KEY, 'Confirmed');
      });
    },
  },
};
