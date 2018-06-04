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
  },
  mutations: {
    setStateData(state, { type, data }) {
      state[type] = data;
    },
  },
  actions: {
    getITO({ commit }) {
      Vue.http.get(`${URL}ito/`).then((r) => {
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
  },
};
