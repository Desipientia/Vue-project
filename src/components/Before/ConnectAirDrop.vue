<template>
  <div class="before-connect e-inside-content-block" v-if="airDropConnect">
    <vue-markdown class="e-markdown-block -default e-mobile-only"
                  :source="airDropConnect.main_content_mobile.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default e-hide-when-mobile"
                  :source="airDropConnect.main_content.body"></vue-markdown>
    <div class="_qr-code-block e-hide-when-mobile" v-if="finishQrCode !== null">
      <qrcode :options="{ size: 160 }" v-model="finishQrCode"></qrcode>
    </div>
    <vue-markdown class="e-markdown-block -default -connect e-mobile-only"
                  :source="airDropConnect.if_not_installed_mobile.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default -connect e-hide-when-mobile"
                  :source="airDropConnect.if_not_installed.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default"
                  :source="airDropConnect.support.body"></vue-markdown>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  const VueQrcode = () => import('@xkeshi/vue-qrcode');

  export default {
    name: 'AirDropConnect',
    data() {
      return {
        finishQrCode: null,
      };
    },
    computed: {
      socketAuth() {
        return this.$store.state.socket.socket.user;
      },
      ...mapState('pages', ['airDropConnect']),
      ...mapState('auth', ['qrCode']),
      ...mapGetters('auth', ['isAuthorized']),
    },
    props: ['referral'],
    components: { qrcode: VueQrcode },
    metaInfo: {
      title: 'Connect',
    },
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
          const referalNumber = 'airdrop';
          const data = { ...this.qrCode, referalNumber };
          const pk = data.pk;
          data.pk = `${pk}&${referalNumber}`;
          this.finishQrCode = JSON.stringify(data);
          this.connectSocket(pk);
        });
      },
      ...mapActions('auth', ['getUserProject', 'login', 'connectSocket']),
      ...mapActions('pages', ['getAirDropConnectPageData']),
    },
    mounted() {
      this.generateNewQRcode();
      this.getAirDropConnectPageData();
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
