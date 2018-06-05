<template>
  <div class="before-connect e-inside-content-block">
    <vue-markdown class="e-markdown-block -default" :source="connect"></vue-markdown>
    <div class="_qr-code-block" v-if="qrCode !== null">
      <qrcode :options="{ size: 160 }" v-model="qrCode"></qrcode>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
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
      socketMessage() {
        return this.$store.state.socket.socket.message;
      },
      ...mapState('pages', ['connect']),
      ...mapGetters('auth', ['isAuthorized']),
    },
    props: ['referral'],
    components: { VueMarkdown },
    watch: {
      socketMessage: {
        handler() {
          if (this.socketMessage) {
            this.login(this.socketMessage);
            this.$router.push({ name: 'get-tokens' });
          }
        },
        deep: true,
      },
    },
    methods: {
      generateNewQRcode() {
        // TODO: Find some way to reconnect after logout without page reload
        this.getUserProject().then((r) => {
          if (this.$socket) {
            this.$disconnect();
          }
          const data = { ...r.body, referal_number: this.referral || null };
          this.qrCode = JSON.stringify(data);
          const wsUrl = `${wsRoot}${data.pk}/`;
          Vue.use(VueNativeSock, wsUrl, {
            store: this.$store,
            format: 'json',
            connectManually: true,
          });
          this.$connect();
        });
      },
      ...mapActions('auth', ['getUserProject', 'login']),
      ...mapActions('pages', ['getConnectPageData']),
    },
    mounted() {
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
