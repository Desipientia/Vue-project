import Vue from 'vue';

const TOKEN_KEY = 'manager_token';

const setUser = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
// const removeUser = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };
// const getToken = () => localStorage.getItem(TOKEN_KEY);

export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {},
  mutations: {
    authorize(state, { token }) {
      setUser(token);
      state.token = token;
    },
  },
  actions: {
    getUserProject() {
      return Vue.http.get('http://ciddev.tabularasa.host/api/project/dsadad/new_user_project/');
    },
  },
};
