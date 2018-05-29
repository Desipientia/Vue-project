import LoaderComponent from './LoaderComponent';

export default {
  install: (Vue) => {
    const Constructor = Vue.extend(LoaderComponent);
    const Loader = new Constructor();
    const vm = Loader.$mount();

    document.querySelector('body').appendChild(vm.$el);

    // eslint-disable-next-line no-param-reassign, no-multi-assign
    Vue.loader = Vue.prototype.$loader = {
      show() {
        Loader.show();
      },
      hide() {
        Loader.hide();
      },
    };
  },
};
