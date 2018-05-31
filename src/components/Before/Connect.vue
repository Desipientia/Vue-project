<template>
  <div class="before-connect e-inside-content-block">
    <h2 class="e-header-text">Connect with CryptoID</h2>
    <p class="e-base-text">
      <!-- eslint-disable-next-line max-len -->
      By applying for a CryptoID, you go through KYC (the identity verification procedure) only once. All data is secured by end-to-end encryption and is verified by Authorised Verification Agents. CryptoID follows the global privacy regulations and is GDPR compliant by design.
    </p>
    <ol class="e-ordered-list">
      <li class="_element">
        <h4 class="e-caption-text">Install CryptoID for iOS or Android</h4>
        <p class="e-base-text">
          <!-- eslint-disable-next-line max-len -->
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium libero vel efficitur ultrices.
        </p>
      </li>
      <li class="_element">
        <h4 class="e-caption-text">Go through KYC</h4>
        <p class="e-base-text">
          <!-- eslint-disable-next-line max-len -->
          By applying for a CryptoID, you go through KYC (the identity verification procedure) only once. All data is secured by end-to-end encryption and is verified by Authorised Verification Agents. CryptoID follows the global privacy regulations and is GDPR compliant by design.
        </p>
      </li>
      <li class="_element">
        <h4 class="e-caption-text">Scan the code below</h4>
        <div class="qr-code">
          <qrcode v-model="qrCode" :options="{ size: 100 }"></qrcode>
          <button @click="generateNewQRcode()">Generate New</button>
        </div>
        {{sendMessage}}
        <p class="e-base-text">
          <!-- eslint-disable-next-line max-len -->
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium libero vel efficitur ultrices. Vestibulum accumsan fringilla velit, molestie tempor dui pharetra id.
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapState } from 'vuex';

  import Vue from 'vue';
  import VueQrcode from '@xkeshi/vue-qrcode';
  import VueNativeSock from 'vue-native-websocket';

  Vue.component('qrcode', VueQrcode);


  export default {
    name: 'Connect',
    data() {
      return {
        qrCode: '',
      };
    },
    watch: {
      sendMessage: {
          handler: function(val, oldVal) {
              this.login(); // call it in the context of your component object
          },
          deep: true
      }
    },
 
    computed: {
     sendMessage(){
        return this.$store.state.socket.socket.message
     }

    },
    methods: Object.assign({
      login(){
          this.$router.push('get-tokens')
      },
      generateNewQRcode() {
        this.$store.dispatch('auth/getUserProject').then((response) => {
          if (this.$socket){
            this.$disconnect()
          }
          this.qrCode = JSON.stringify(response.body);
          const wsUrl = `ws://ciddev.tabularasa.host/api/user/${response.body.pk}/`;
          Vue.use(VueNativeSock, wsUrl, { store: this.$store, format: 'json' ,   connectManually: true})
          this.$connect()
        });
      },
    }),
  };
</script>
