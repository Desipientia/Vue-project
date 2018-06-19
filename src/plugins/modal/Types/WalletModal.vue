<template>
  <form class="wallet-modal" @submit.prevent="$modal.accept(wallet)">
    <p class="m-header-text">Please paste your wallet address</p>
    <!-- eslint-disable-next-line max-len -->
    <p class="e-base-text">Do not use exchange wallet addresses. We recommend cold storage wallets ONLY. Our favorite wallets are MetaMask, MyEtherWallet, Trezor, Ledger. Using of any exchange wallet will most probably result in the loss of CID tokens.</p>
    <input class="e-input" placeholder="Your Wallet" v-model="wallet"/>
    <button class="e-button -black"
            type="submit"
            :disabled="$v.$invalid">Done</button>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';  
  import { mapActions } from 'vuex';

  export default {
    name: 'WalletModal',
    data() {
      return {
        wallet: '',
      };
    },
    mixins: [validationMixin],
    validations: {
      wallet: { required, 
      // TODO  use checkWallet 
      },
    },
    mounted() {
      this.$modal.validateAcceptFromInside(() => !this.$v.$invalid, () => this.wallet);
    },
    methods: {
      ...mapActions('web3mod', ['checkWallet'])
    }
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .wallet-modal {
    .e-input {
      display: block;
      width: 100%;
      margin: 30px 0 20px;
      font-weight: 600;
      font-size: 20px;
      text-align: center;
    }
    .e-button {
      width: 100%;
    }
  }
</style>
