import Vue from 'vue';
import { projectName } from '../../config';

const URL = `project/${projectName}/page/`;

const makeObjectFromList = (list) => {
  const object = {};
  list.forEach((e) => {
    object[e.head.toLowerCase().replace(/ /g, '_')] = {
      body: e.body,
      files: e.files,
    };
  });
  return object;
};

export default {
  namespaced: true,
  state: {
    landing: '',
    connect: '',
    limit: '',
    documentation: [],
    referral: '',
    info: '',
    tokens: {},
    main: '',
    qa: '',
    airDropLanding: '',
    airDropConnect: '',
    airDropModal: '',
  },
  mutations: {
    setPageData(state, { data, field }) {
      state[field] = data;
    },
  },
  actions: {
    getLandingPageData({ commit }) {
      return Vue.http.get(`${URL}landing-short`).then((r) => {
        commit('setPageData', { data: r.body.contents[0], field: 'landing' });
      });
    },
    getConnectPageData({ commit }) {
      Vue.http.get(`${URL}connect-with-cryptoid`).then((r) => {
        commit('setPageData', { data: makeObjectFromList(r.body.contents), field: 'connect' });
      });
    },
    getLimitPageData({ commit }) {
      Vue.http.get(`${URL}you-need-increase-your-limit`).then((r) => {
        commit('setPageData', { data: r.body.contents[0].body, field: 'limit' });
      });
    },
    getReferralPageData({ commit }) {
      Vue.http.get(`${URL}referal-program`).then((r) => {
        commit('setPageData', { data: r.body.contents[0].body, field: 'referral' });
      });
    },
    getDocumentationPageData({ commit }) {
      Vue.http.get(`${URL}documentation`).then((r) => {
        commit('setPageData', { data: r.body.contents, field: 'documentation' });
      });
    },
    getInfoModalPageData({ commit }) {
      return Vue.http.get(`${URL}get-tokens-how-to-increase-your-limit-modal-box`).then((r) => {
        commit('setPageData', { data: r.body.contents[0].body, field: 'info' });
      });
    },
    getGetTokensPageData({ commit }) {
      return Vue.http.get(`${URL}get-tokens`).then((r) => {
        commit('setPageData', { data: r.body.contents[0], field: 'tokens' });
      });
    },
    getMainPageData({ commit }) {
      return Vue.http.get(`${URL}landing`).then((r) => {
        commit('setPageData', { data: makeObjectFromList(r.body.contents), field: 'main' });
      });
    },
    getQAPageData({ commit }) {
      return Vue.http.get(`${URL}qa`).then((r) => {
        commit('setPageData', { data: r.body.contents[0].body, field: 'qa' });
      });
    },
    getAirDropLandingPageData({ commit }) {
      return Vue.http.get(`${URL}landing-short-airdrop`).then((r) => {
        commit('setPageData', { data: r.body.contents[0].body, field: 'airDropLanding' });
      });
    },
    getAirDropConnectPageData({ commit }) {
      Vue.http.get(`${URL}connect-with-cryptoid-airdrop`).then((r) => {
        commit('setPageData', { data: makeObjectFromList(r.body.contents), field: 'airDropConnect' });
      });
    },
    getAirDropModalPageData({ commit }) {
      Vue.http.get(`${URL}airdrop-modal`).then((r) => {
        commit('setPageData', { data: makeObjectFromList(r.body.contents), field: 'airDropModal' });
      });
    },
  },
};
