import Vue from 'vue';
import VueResource from 'vue-resource';

import Modal from './plugins/modal/modal';
import Loader from './plugins/loader/loader';
import ScrollJump from './plugins/scroll-jump/scroll-jump';

import { root } from './config';

Vue.use(VueResource);

Vue.use(Modal);
Vue.use(Loader);
Vue.use(ScrollJump);

Vue.http.options.root = `${root}/api`;
