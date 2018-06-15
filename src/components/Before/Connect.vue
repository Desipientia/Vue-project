<template>
  <div class="before-connect e-inside-content-block" v-if="connect">
    <vue-markdown class="e-markdown-block -default" :source="connect[0].body"></vue-markdown>
    <div class="_qr-code-block" v-if="qrCode !== null">
      <qrcode :options="{ size: 160 }" v-model="qrCode"></qrcode>
    </div>
    <vue-markdown class="e-markdown-block -default" :source="connect[1].body"></vue-markdown>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  const VueQrcode = () => import('@xkeshi/vue-qrcode');

  export default {
    name: 'Connect',
    data() {
      return {
        qrCode: null,
      };
    },
    computed: {
      socketAuth() {
        return this.$store.state.socket.socket.user;
      },
      ...mapState('pages', ['connect']),
      ...mapGetters('auth', ['isAuthorized']),
    },
    props: ['referral'],
    components: { qrcode: VueQrcode },
    watch: {
      socketAuth: {
        handler() {
          if (this.socketAuth) {
            this.login(this.socketAuth);
            this.$router.push({ name: 'get-tokens' });
          }
        },
        deep: true,
      },
    },
    methods: {
      generateNewQRcode() {
        this.getUserProject().then((r) => {
          const data = { ...r.body, referal_number: this.referral || null };
          this.qrCode = JSON.stringify(data);
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
