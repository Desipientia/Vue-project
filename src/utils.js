import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMarkdown from 'vue-markdown';
import Toasted from 'vue-toasted';
import VueYouTubeEmbed from 'vue-youtube-embed';
import Meta from 'vue-meta';

import Modal from './plugins/modal/modal';
import Loader from './plugins/loader/loader';
import ScrollJump from './plugins/scroll-jump/scroll-jump';
import Filters from './plugins/filters/filters';

import { root, debug } from './config';
import store from './store';
import router from './router';

Vue.component('vue-markdown', VueMarkdown);

Vue.use(VueResource);
Vue.use(Toasted);
Vue.use(VueYouTubeEmbed);
Vue.use(Meta);

Vue.use(Modal);
Vue.use(Loader);
Vue.use(ScrollJump);
Vue.use(Filters);

Vue.http.options.root = `${root}/api`;

// eslint-disable-next-line arrow-body-style
Vue.http.interceptors.push(() => {
  return (r) => {
    if (r.status === 401) {
      store.dispatch('auth/logout').then(() => {
        router.replace({ name: 'landing' });
      });
    }
  };
});

// Script to add root to dynamic image src when on localhost
if (debug) {
  Vue.mixin({
    updated() {
      for (let i = 0, l = document.images.length; i < l; i += 1) {
        const img = document.images[i];
        if (img.src.search(window.location.origin) !== -1) {
          img.src = img.src.replace(window.location.origin, root);
        }
      }
    },
  });
}
