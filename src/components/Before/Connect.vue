<template>
  <div class="before-connect e-inside-content-block" v-if="connect">
    <vue-markdown class="e-markdown-block -default e-mobile-only"
                  :source="connect.main_content_mobile.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default e-hide-when-mobile"
                  :source="connect.main_content.body"></vue-markdown>
  
    <vue-markdown class="e-markdown-block -default -connect e-mobile-only"
                  :source="connect.if_not_installed_mobile.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default -connect e-hide-when-mobile"
                  :source="connect.if_not_installed.body"></vue-markdown>
    <div class="_qr-code-block e-hide-when-mobile" v-if="finishQrCode !== null">
      <qrcode :options="{ size: 160 }" v-model="finishQrCode"></qrcode>
    </div>
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
      ...mapState('pages', ['connect', 'airDropModal']),
      ...mapState('auth', ['qrCode']),
      ...mapState('project', ['promo']),
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
            if (this.socketAuth.earn){
              this.$modal.show('airdrop', { data: {promo:this.promo, page:this.airDropModal, user:this.socketAuth} });
            }
          }
        },
        deep: true,
      },
    },
    methods: {
      generateNewQRcode() {
        this.getUserProject().then(() => {
          const referalNumber = this.referral || null;
          const data = { ...this.qrCode, referalNumber };
          const pk = data.pk;
          if (referalNumber !== null) data.pk = `${pk}&${referalNumber}`;
          this.finishQrCode = JSON.stringify(data);
          this.connectSocket(pk);
        });
      },
      ...mapActions('auth', ['getUserProject', 'login', 'connectSocket']),
      ...mapActions('pages', ['getConnectPageData', 'getAirDropModalPageData']),
      ...mapActions('project', ['getPromo']),

    },
    mounted() {
      this.generateNewQRcode();
      this.getConnectPageData();
      this.getAirDropModalPageData();
      this.getPromo();
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
