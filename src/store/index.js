import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import socket from './modules/socket';
import pages from './modules/pages';
import project from './modules/project';

import { debug } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: debug,
  modules: {
    auth,
    socket,
    pages,
    project,
  },
});
