export default {
  state: {
    socket: {
      isConnected: false,
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
    },
    SOCKET_ONERROR(state, event) {
      // eslint-disable-next-line no-console
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message.user;
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
