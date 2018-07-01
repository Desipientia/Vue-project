import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import { projectName, wsRoot } from '../../config';

const AUTH_TOKEN_KEY = 'token';
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
    qrCode: null,
    phoneNumber: null,
    user: null,
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
    setUser(state, user) {
      state.token = user;
    },
    setQrCode(state, qrCode) {
      state.qrCode = qrCode;
    },
    setPhoneNubmber(state, phoneNumber) {
      state.phoneNumber = phoneNumber;
    },
    removeUserData(state) {
      removeStorageItem(AUTH_TOKEN_KEY);
      state.token = null;
    },
  },
  actions: {
    verify({ dispatch }) {
      if (getStorageItem(AUTH_TOKEN_KEY)) {
        dispatch('login', { token: getStorageItem(AUTH_TOKEN_KEY) });
      }
    },
    login({ commit }, user) {
      if (user) {
        Vue.http.headers.common.Authorization = `Token ${user.token}`;
        commit('setUserData', user.token);
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
      dispatch('getUserProject');
    },
    dicsonnect({ rootState }) {
      if (rootState.socket.socket.isConnected) {
        vm.$disconnect();
        const index = Vue._installedPlugins.indexOf(VueNativeSock);
        if (index > -1) {
          Vue._installedPlugins.splice(index, 1);
        }
      }
    },
    getUserProject({ commit }) {
      return Vue.http.get(`${URL}new-user-project/`).then((r) => {
        commit('setQrCode', r.body);
      });
    },
    setUserProject({ commit }) {
      return Vue.http.put(`${URL}set-project-to-user/`).then((r) => {
        console.log(r.body);
        commit('setUser', r.body);
      });
    },
    validateCode({ state, dispatch }, otp) {
      return Vue.http.post('auth/validate/', { otp, phone_number: state.phoneNumber }).then((r) => {
        dispatch('login', r.body).then(() => {
          dispatch('setUserProject');
        });
      });
    },
    generateCode({ commit }, phoneNumber) {
      return Vue.http.post('auth/generate/', { phone_number: phoneNumber }).then(() => {
        commit('setPhoneNubmber', phoneNumber);
      });
    },
    confirmAgreement({}, data) {
      Vue.http.put(`${URL}license-agreement/`, { questions: data }).then(() => {
        localStorage.setItem(AGREEMENT_TOKEN_KEY, 'Confirmed');
      });
    },
  },
};
