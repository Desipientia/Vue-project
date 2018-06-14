export default {
  install: (Vue) => {
    Vue.filter('number', value => (value || 0).toLocaleString('en'));
    Vue.filter('date', value => (new Date(value || 0)).toLocaleDateString('en', {
      day: 'numeric',
      month: 'short',
    }));
    Vue.filter('time', value => (new Date(value || 0)).toLocaleTimeString('en', {
      hour: 'numeric',
      minute: 'numeric',
    }).replace('AM', 'am').replace('PM', 'pm'));

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$filters = Vue.options.filters;
  },
};
