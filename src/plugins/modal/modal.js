import ModalComponent from './ModalComponent';

export default {
  install: (Vue) => {
    const Constructor = Vue.extend(ModalComponent);
    const Modal = new Constructor();
    const vm = Modal.$mount();
    const toType = obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

    document.body.appendChild(vm.$el);

    // eslint-disable-next-line no-param-reassign, no-multi-assign
    Vue.modal = Vue.prototype.$modal = {
      focusOn: null,
      isVisible: false,
      params() {
        return Modal.params;
      },
      // TODO: Remove dialog, message and loader if unused
      message(text, onHide, ok = 'OK') {
        Modal.show('message', { text, ok }, onHide);
        Vue.loader.hide();
      },
      dialog(text, onAccept, onHide, accept = 'ОК', cancel = 'modalCancel') {
        Modal.show('dialogue', { text, accept, cancel }, onHide, onAccept);
        Vue.loader.hide();
      },
      show(args) {
        switch (toType(args)) {
          case 'string':
            Modal.show(args);
            break;
          case 'array': {
            const [type, params] = args;
            Modal.show(type, params);
            break;
          }
          default: {
            const { type, params, onHide, onAccept } = args;
            Modal.show(type, params, onHide, onAccept);
            break;
          }
        }
      },
      hide() {
        Modal.hide();
      },
      accept() {
        Modal.accept();
      },
      validateAcceptFromInside(validation) {
        Modal.addAcceptValidation(validation);
      },
    };
  },
};
