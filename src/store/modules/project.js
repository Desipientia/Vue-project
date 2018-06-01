import Vue from 'vue';
import { projectName } from '../../config';

const URL = `project/${projectName}/`;

export default {
  namespaced: true,
  state: {
    ito: {},
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
      });
    },
  },
};
