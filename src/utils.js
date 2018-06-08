import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMarkdown from 'vue-markdown';

import Modal from './plugins/modal/modal';
import Loader from './plugins/loader/loader';
import ScrollJump from './plugins/scroll-jump/scroll-jump';


import { root } from './config';

Vue.component('vue-markdown', VueMarkdown);

Vue.use(VueResource);

Vue.use(Modal);
Vue.use(Loader);
Vue.use(ScrollJump);

Vue.http.options.root = `${root}/api`;
