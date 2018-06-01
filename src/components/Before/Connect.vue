<template>
  <div class="before-connect e-inside-content-block">
    <vue-markdown class="e-markdown-block -default" :source="connect"></vue-markdown>
    <div class="_qr-code-block" v-if="qrCode !== null">
      <qrcode :options="{ size: 160 }" v-model="qrCode"></qrcode>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Vue from 'vue';
  import VueQrcode from '@xkeshi/vue-qrcode';
  import VueNativeSock from 'vue-native-websocket';

  import { wsRoot } from '../../config';

  const VueMarkdown = () => import('vue-markdown');

  Vue.component('qrcode', VueQrcode);

  export default {
    name: 'Connect',
    data() {
      return {
        qrCode: null,
      };
    },
    computed: {
      sendMessage() {
        return this.$store.state.socket.socket.message;
      },
      ...mapState('pages', ['connect']),
    },
    components: { VueMarkdown },
    watch: {
      sendMessage: {
        handler() {
          this.login();
        },
        deep: true,
      },
    },
    methods: {
      login() {
        this.$router.push('get-tokens');
      },
      generateNewQRcode() {
        this.getUserProject().then((r) => {
          if (this.$socket) {
            this.$disconnect();
          }
          this.qrCode = JSON.stringify(r.body);
          const wsUrl = `${wsRoot}${r.body.pk}/`;
          Vue.use(VueNativeSock, wsUrl, {
            store: this.$store,
            format: 'json',
            connectManually: true,
          });
          this.$connect();
        });
      },
      ...mapActions('auth', ['getUserProject']),
      ...mapActions('pages', ['getConnectPageData']),
    },
    created() {
      this.generateNewQRcode();
      this.getConnectPageData();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .before-connect {
    ._qr-code-block {
      margin: 20px 0 0 24px;
    }
  }
</style>
