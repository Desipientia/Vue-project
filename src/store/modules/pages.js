import Vue from 'vue';
import { projectName } from '../../config';

const URL = `project/${projectName}/page/`;

export default {
  namespaced: true,
  state: {
    landing: '',
    connect: '',
    limit: '',
    documentation: '',
  },
  mutations: {
    setPageData(state, { data, field }) {
      state[field] = data;
    },
  },
  actions: {
    getLandingPageData({ commit }) {
      Vue.http.get(`${URL}landing-short`).then((r) => {
        commit('setPageData', { data: r.body.contents[0].body, field: 'landing' });
      });
    },
    getConnectPageData({ commit }) {
      Vue.http.get(`${URL}connect-with-cryptoid`).then((r) => {
        commit('setPageData', { data: r.body.contents[0].body, field: 'connect' });
      });
    },
    getLimitPageData({ commit }) {
      Vue.http.get(`${URL}you-need-increase-your-limit`).then((r) => {
        commit('setPageData', { data: r.body.contents[0].body, field: 'limit' });
      });
    },
    getDocumentationPageData({ commit }) {
      Vue.http.get(`${URL}documentation`).then((r) => {
        commit('setPageData', { data: r.body.contents, field: 'documentation' });
      });
    },
  },
};
