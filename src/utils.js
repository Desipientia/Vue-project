import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMarkdown from 'vue-markdown';

import Modal from './plugins/modal/modal';
import Loader from './plugins/loader/loader';
import ScrollJump from './plugins/scroll-jump/scroll-jump';
import Filters from './plugins/filters/filters';

import { root, debug } from './config';

Vue.component('vue-markdown', VueMarkdown);

Vue.use(VueResource);

Vue.use(Modal);
Vue.use(Loader);
Vue.use(ScrollJump);
Vue.use(Filters);

Vue.http.options.root = `${root}/api`;

// Script to add root to dynamic image src when on localhost
if (debug) {
  Vue.mixin({
    updated() {
      for (let i = 0, l = document.images.length; i < l; i += 1) {
        const img = document.images[i];
        img.src = img.src.replace(window.location.origin, root);
      }
    },
  });
}
