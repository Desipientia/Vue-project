<template>
  <div class="before-connect e-inside-content-block" v-if="connect">
    <vue-markdown class="e-markdown-block -default e-mobile-only"
                  :source="connect.main_content_mobile"></vue-markdown>
    <vue-markdown class="e-markdown-block -default e-hide-when-mobile"
                  :source="connect.main_content.body"></vue-markdown>
    <div class="_qr-code-block" v-if="finishQrCode !== null">
      <qrcode :options="{ size: 160 }" v-model="finishQrCode"></qrcode>
    </div>
    <vue-markdown class="e-markdown-block -default -connect"
                  :source="connect.if_not_installed.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default"
                  :source="connect.support.body"></vue-markdown>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  const VueQrcode = () => import('@xkeshi/vue-qrcode');

  export default {
    name: 'Connect',
    data() {
      return {
        finishQrCode: null,
      };
    },
    computed: {
      socketAuth() {
        return this.$store.state.socket.socket.user;
      },
      ...mapState('pages', ['connect']),
      ...mapState('auth', ['qrCode']),
      ...mapGetters('auth', ['isAuthorized']),
    },
    props: ['referral'],
    components: { qrcode: VueQrcode },
    watch: {
      socketAuth: {
        handler() {
          if (this.socketAuth) {
            this.login(this.socketAuth);
            this.$router.push({ name: 'main' });
          }
        },
        deep: true,
      },
    },
    methods: {
      generateNewQRcode() {
        this.getUserProject().then(() => {
          const data = { ...this.qrCode, referal_number: this.referral || null };
          this.finishQrCode = JSON.stringify(data);
          this.connectSocket(data.pk);
        });
      },
      ...mapActions('auth', ['getUserProject', 'login', 'connectSocket']),
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
      margin: 20px 0 30px;
    }
  }
</style>
