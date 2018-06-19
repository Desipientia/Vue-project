export default {
  state: {
    socket: {
      isConnected: false,
      amount: '',
      user: '',
      type: '',
      message: '',
      reconnectError: false,
    },
  },
  mutations: {
    SOCKET_ONOPEN(state) {
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
      state.socket.message = '';
    },
    SOCKET_ONERROR(state, event) {
      // eslint-disable-next-line no-console
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.type = message.type;
      switch (message.type) {
        case 'authorize':
          state.socket.user = message.user;
          break;
        case 'add_cid':
        case 'add_eth':
        case 'update_ito':
          state.socket.amount = message.amount;
          break;

        default:
          break;
      }
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      // eslint-disable-next-line no-console
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
};
