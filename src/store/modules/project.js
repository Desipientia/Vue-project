import Vue from 'vue';
import router from '../../router';
import { projectName } from '../../config';

const URL = `project/${projectName}/`;

export default {
  namespaced: true,
  state: {
    ito: {},
    limit: {},
    referral: {},
    allocation: {},
    agreement: {},
    date: {},
    team: {},
    wallets: [],
  },
  mutations: {
    setStateData(state, { type, data }) {
      state[type] = data;
    },
  },
  actions: {
    getITO({ commit }) {
      return Vue.http.get(`${URL}ito/`).then((r) => {
        commit('setStateData', { type: 'ito', data: r.body });
      }, (r) => {
        if (r.status === 403) {
          router.push({ name: 'limit' });
        }
      });
    },
    getLimitData({ commit }) {
      Vue.http.get(`${URL}allowed_limit/`).then((r) => {
        commit('setStateData', { type: 'limit', data: r.body });
      });
    },
    getReferral({ commit }) {
      Vue.http.get(`${URL}referal/`).then((r) => {
        commit('setStateData', { type: 'referral', data: r.body });
      });
    },
    getAllocation({ commit }) {
      Vue.http.get(`${URL}allocation/`).then((r) => {
        commit('setStateData', { type: 'allocation', data: r.body });
      });
    },
    getAgreement({ commit }) {
      return Vue.http.get(`${URL}license-agreement/`).then((r) => {
        commit('setStateData', { type: 'agreement', data: r.body });
      });
    },
    getDateList({ commit }) {
      return Vue.http.get(`${URL}start-date/`).then((r) => {
        commit('setStateData', { type: 'date', data: r.body });
      });
    },
    getTeamList({ commit }) {
      return Vue.http.get(`${URL}team/`).then((r) => {
        commit('setStateData', { type: 'team', data: r.body });
      });
    },
    getWalletsList({ commit }) {
      return Vue.http.get(`${URL}wallets/`).then((r) => {
        commit('setStateData', { type: 'wallets', data: r.body });
      });
    },
  },
};
