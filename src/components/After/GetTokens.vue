<template>
  <div class="after-get-tokens e-inside-content-block">
    <h2 class="e-header-text">Get Tokens</h2>
    <div class="_info-block e-white-content-block">
      <div class="_info-element">
        <p class="e-label-text">Duration</p>
        <div class="_duration-block" v-if="ito.current_date">
          <div>
            <p class="e-number-text -m -black">{{ ito.current_date.start_date | date }}</p>
            <p class="e-number-text -s">{{ ito.current_date.start_date | time }}</p>
          </div>
          <p class="_line">–</p>
          <div>
            <p class="e-number-text -m -black">{{ ito.current_date.end_date | date }}</p>
            <p class="e-number-text -s">{{ ito.current_date.end_date | time }}</p>
          </div>
        </div>
      </div>
      <timer class="_info-element" :date-range="ito.current_date"></timer>
      <div class="_info-element">
        <p class="e-label-text">Total tokens distributed in this stage</p>
        <p class="e-number-text -s">{{ tokensForSale }} CID</p>
      </div>  
      <div class="_info-element" v-if="isActive">
        <p class="e-label-text">Ether received in this stage</p>
        <p class="e-number-text -s">{{ ito.current_date.received_money | number }} ETH</p>
      </div>
    </div>
    
    <form class="_send-block e-white-content-block"
          v-if="isActive"
          @submit.prevent="goNext">
      <div class="_inside-content">
        
        <vue-autonumeric class="e-input -l"
                         type="tel"
                         placeholder="0"
                         :options="{
                           digitGroupSeparator: ' ',
                           decimalCharacter: ',',
                           minimumValue: '0',
                           onInvalidPaste: 'truncate'
                         }"
                         v-model="amount"></vue-autonumeric>
        <span class="e-number-text -s -black">ETH</span>
      </div>
      <button class="e-button -black">Next</button>
    </form>
    <vue-markdown class="e-markdown-block -tokens"
                  :source="tokensText.first"></vue-markdown>
    <vue-markdown class="_hidden-tokens-block e-markdown-block -tokens"
                  :class="{ '-visible': isTokensFullyVisible }"
                  :source="tokensText.second"></vue-markdown>
    <button class="_view-hide-button"
            @click="isTokensFullyVisible = !isTokensFullyVisible">
      <transition name="e-fade" mode="out-in">
        <span key="hide" v-if="isTokensFullyVisible">
          <span class="_text">Hide all information</span>
          <svg class="_arrow" viewBox="0 0 10 20" xmlns="http://www.w3.org/2000/svg">
            <!-- eslint-disable-next-line max-len -->
            <path transform="rotate(180, 5, 10)" d="M6,15.5857864 L8.29289322,13.2928932 C8.68341751,12.9023689 9.31658249,12.9023689 9.70710678,13.2928932 C10.0976311,13.6834175 10.0976311,14.3165825 9.70710678,14.7071068 L5,19.4142136 L0.292893219,14.7071068 C-0.0976310729,14.3165825 -0.0976310729,13.6834175 0.292893219,13.2928932 C0.683417511,12.9023689 1.31658249,12.9023689 1.70710678,13.2928932 L4,15.5857864 L4,1 C4,0.44771525 4.44771525,1.01453063e-16 5,0 C5.55228475,-1.01453063e-16 6,0.44771525 6,1 L6,15.5857864 Z"></path>
          </svg>
        </span>
        <span key="view" v-else>
          <span class="_text">View all information</span>
          <svg class="_arrow" viewBox="0 0 10 20" xmlns="http://www.w3.org/2000/svg">
            <!-- eslint-disable-next-line max-len -->
            <path d="M6,15.5857864 L8.29289322,13.2928932 C8.68341751,12.9023689 9.31658249,12.9023689 9.70710678,13.2928932 C10.0976311,13.6834175 10.0976311,14.3165825 9.70710678,14.7071068 L5,19.4142136 L0.292893219,14.7071068 C-0.0976310729,14.3165825 -0.0976310729,13.6834175 0.292893219,13.2928932 C0.683417511,12.9023689 1.31658249,12.9023689 1.70710678,13.2928932 L4,15.5857864 L4,1 C4,0.44771525 4.44771525,1.01453063e-16 5,0 C5.55228475,-1.01453063e-16 6,0.44771525 6,1 L6,15.5857864 Z"></path>
          </svg>
        </span>
      </transition>
    </button>
    <div class="_side-block">
      <div class="_balance-block e-white-content-block" v-if="showBalance">
        <p class="e-label-text">Balance</p>
        <p class="e-number-text -black -l">{{ cidTransactionCount }} CID</p>
        <p class="e-label-text">Total Contributed <b>{{ fullEthTransactionCount }} ETH</b></p>
        <div class="_error-block" v-if="user.cid_user">
          <!-- eslint-disable-next-line max-len -->
          <span @click="openConnectModal">To unlock your Tokens please pass the KYC procedure with the CryptoID app.</span>
        </div>
        <hr class="_line">
        <p class="e-label-text">Contributed in this stage</p>
        <p class="e-number-text -black -m">{{ currentEthTransactionCount }} ETH</p>
        <!-- eslint-disable-next-line max-len -->
        <p class="e-info-text">You will receive tokens after the closing of the distribution stage.</p>
      </div>
      <div class="_wallets-block e-white-content-block">
        <p class="e-label-text">Your Wallets</p>
        <p class="_wallet" :key="i" v-for="(w, i) in wallets">{{ w.wallet }}</p>
        <div class="_error-block" v-if="isLoaded && wallets.length <= 0">
          <!-- eslint-disable-next-line max-len -->
          <span>To receive your CID tokens please add your ETH wallet or open the CryptoID app and follow the instructions to add a wallet.</span>
        </div>
        <button class="_add-wallet-button e-label-text"
                :disabled="!web3active"
                @click="addWallets">+ Add Metamask Wallets</button>
        <button class="_add-wallet-button e-label-text"
                @click="showWalletModal">+ Add Wallet</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { validationMixin } from 'vuelidate';

  const VueAutonumeric = () => import(/* webpackChunkName: "vue-autonumeric" */ 'vue-autonumeric');
  const ProgressBar = () => import(/* webpackChunkName: "progress-bar" */ '../Elements/ProgressBar');
  const Timer = () => import(/* webpackChunkName: "timer" */ '../Elements/Timer');

  export default {
    name: 'GetTokens',
    data() {
      return {
        amount: 1.00,
        address: 'null',
        finishQrCode: null,
        data: [
          { title: 'CID Tokens Distributed', value: 65 },
          { title: 'Advisors, Ecosystem, Partners', value: 10 },
          { title: 'Team', value: 10 },
          { title: 'Reserved', value: 15 },
        ],
        showBalance: true,
        isLoaded: false,
        isTokensFullyVisible: false,
      };
    },
    computed: {

     socketAuth() {
        return this.$store.state.socket.socket.user;
      },
      tokensText() {
        if (!this.tokens.body) return {};
        const divider = this.tokens.body.indexOf('>');
        return {
          first: this.tokens.body.slice(0, divider),
          second: this.tokens.body.slice(divider),
        };
      },
      socketTransaction() {
        return this.$store.state.socket.socket.amount;
      },
      progressValue() {
        const a = this.allocation;
        if (!a.full_transactions_count) return 0;
        return 100 - ((a.full_transactions_count.usd_amount / a.transaction_limit.usd_limit) * 100);
      },
      cidTransactionCount() {
        const a = this.allocation;
        return a.full_cid_transactions_count ? a.full_cid_transactions_count : 0;
      },
      tokensForSale() {
        const a = this.ito;
        return a.current_date ? a.current_date.token_for_sale : 0;
      },
      fullEthTransactionCount() {
        const a = this.allocation;
        return a.full_transactions_count ? a.full_transactions_count.eth_amount : 0;
      },
      currentEthTransactionCount() {
        const a = this.allocation;
        return a.current_transactions_count ? a.current_transactions_count.eth_amount : 0;
      },
      cidDropTransactionCount() {
        const a = this.allocation;
        return a.full_cid_drop_transactions_count;
      },
      maxTransactionCountAvailable() {
        const a = this.allocation;
        return +(a.transaction_remain ? a.transaction_remain.eth_amount : 0).toFixed(2);
      },
      isActive() {
        const date = this.ito.current_date;
        if (!date) return false;
        return Date.parse(date.start_date) < (new Date()).getTime();
      },
      ...mapState('project', [
        'ito',
        'allocation',
        'agreement',
        'wallets',
      ]),
      ...mapState('pages', [
        'info',
        'tokens',
        'connect',
      ]),
      ...mapState('web3mod', [
        'web3active',
      ]),
      ...mapState('auth', [
        'qrCode',
        'user',
      ]),
      ...mapGetters('auth', ['isAgreementConfirmed']),
    },
    components: {
      Timer,
      ProgressBar,
      VueAutonumeric,
    },
    metaInfo: {
      title: 'Get Tokens',
    },
    mixins: [validationMixin],
    validations() {
      return {
        amount: {
          notZero: value => value > 0,
          notBeyondMax: value => value <= this.maxTransactionCountAvailable,
        },
      };
    },
    
    watch: {
      socketTransaction: {
        handler() {
          let text = '';
          const socketType = this.$store.state.socket.socket.type;
          switch (socketType) {
            case 'add_eth':
              text = `You send ${this.socketTransaction} ETH`;
              this.$toasted.show(text, { class: '.toast', position: 'bottom-right' }).goAway(3000);
              break;
            case 'add_cid':
              text = `You recieve ${this.socketTransaction} CID`;
              this.$toasted.show(text, { class: '.toast' }).goAway(3000);
              break;
            case 'update_ito':
              this.updateITOReceive({ receivedMoney: this.socketTransaction });
              break;
            default:
              break;
          }
          this.getAllocation();
        },
        deep: true,
      },
      socketAuth: {
        handler() {
          if (this.socketAuth) {
            this.login(this.socketAuth);
            this.$modal.hide();
          }
        },
        deep: true,
      },
    },
    methods: {
      showInfoModal() {
        if (this.info) {
          this.$modal.show('info', { data: this.info });
        } else {
          this.getInfoModalPageData().then(() => {
            this.$modal.show('info', { data: this.info });
          });
        }
      },
      goNext() {
        if (this.wallets.length > 0) {
          this.showBuyTokenModal();
        } else {
          this.showWalletModal(() => { this.showBuyTokenModal(); });
        }
      },
      showWalletModal(callback) {
        const walletsCount = this.wallets.length;
        this.$modal.show({
          type: 'wallet',
          params: { check: w => this.checkWallet(w) },
          onAccept: (data) => {
            this.addWallet(data).then(() => {
              if (walletsCount < this.wallets.length) {
                if (typeof callback === 'function') {
                  callback();
                } else {
                  this.$modal.hide();
                }
              }
            });
          },
        });
      },
      showBuyTokenModal() {
        this.$modal.show({
          type: 'buy',
          params: { amount: this.amount, address: this.address },
          onAccept: () => {
            this.becomeInvestor(this.amount);
            this.$modal.hide();
          },
        });
      },
      generateNewQRcode() {
        return this.getUserProject().then(() => {
          this.finishQrCode = JSON.stringify(this.qrCode);
          this.connectSocket(this.qrCode.pk);
        });
      },
      openConnectModal() {
        this.generateNewQRcode().then(() => {
          this.getConnectPageData().then(() => {
            console.log(this.connect);
            this.$modal.show({
              type: 'connect',
              params: {data : {page: this.connect, finishQrCode: this.finishQrCode }},
            });
          })

        })
       

      },
      ...mapActions('project', [
        'getITO',
        'getAllocation',
        'getAgreement',
        'getWalletsList',
        'updateITOReceive',
        'addWallet',
      ]),
      ...mapActions('pages', [
        'getInfoModalPageData',
        'getGetTokensPageData',
        'getConnectPageData',
      ]),
      ...mapActions('auth', ['confirmAgreement', 'getUserProject', 'login', 'connectSocket']),
      ...mapActions('web3mod', [
        'connectWeb3',
        'becomeInvestor',
        'addWallets',
        'checkWallet',
      ]),
    },
    mounted() {
      if (!this.isAgreementConfirmed) {
        this.getAgreement().then(() => {
          this.$modal.show({
            type: 'agreement',
            params: { data: this.agreement },
            onAccept: (data) => {
              this.confirmAgreement(data);
            },
            onHide: () => {
              if (!this.isAgreementConfirmed) {
                this.$router.replace({ name: 'main' });
              }
            },
          });
        });
      }
      this.getWalletsList();
      this.getGetTokensPageData();
      this.getAllocation();
      this.getITO().then(() => {
        this.address = this.ito.contract.address;
        this.isLoaded = true;
        this.connectWeb3();
      });
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .toast {
    width: 147px;
    height: 19px;
    border-radius: 4px;
    background-color: rgba(102, 9, 9, 0.7);
    color: #ff0909;
    box-shadow: 0 10px 20px 0 rgba(3, 6, 168, 0.2);
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    text-align: center;
  }
  .after-get-tokens {
    position: relative;
    
    ._info-block {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
  
      ._info-element {
        margin: 10px 0 20px;
        width: 50%;
      }
    }
    ._duration-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 210px;
      @include media(wide) {
        width: 260px;
      }
      ._line {
        margin: 0;
        color: #bcbcbc;
        font-family: "Cabin", sans-serif;
        font-size: 25px;
        @include media(wide) {
          font-size: 30px;
        }
      }
    }
    ._allocation-block {
      margin: 2px 0;
      border-radius: 0;
  
      ._error-block {
        margin-top: 10px;
        padding: 5px 20px;
      }
    }
    ._send-block {
      align-items: flex-end;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
  
      .e-input {
        margin-right: 5px;
      }
      ._inside-content {
        position: relative;
        
        ._max-button {
          position: absolute;
          bottom: 10px;
          width: 68px;
          height: 30px;
          background-color: #f6f6f6;
          color: #767676;
          font-family: "Open Sans", sans-serif;
          font-weight: 700;
          font-size: 14px;
          text-align: center;
          @include media(wide) {
            font-size: 18px;
          }
        }
      }
    }
    ._text-line {
      align-items: flex-start;
    }
    ._send-block,
    ._text-line {
      display: flex;
      justify-content: space-between;
    }
    ._modal-link-text {
      text-decoration: underline;
      cursor: pointer;
      
      &.-single {
        line-height: 2.08;
        font-size: 12px;
        text-align: right;
        @include media(wide) {
          font-size: 16px;
        }
      }
    }
    ._progress-bar {
      margin: 5px 0;
      overflow: hidden;
      border-radius: 2px;
    }
    ._hidden-tokens-block {
      max-height: 0;
      overflow: hidden;
      transition: max-height .5s linear;
      
      &.-visible {
        max-height: 1500px;
      }
    }
    ._view-hide-button {
      height: 50px;
      margin-top: 20px;
      padding: 0 30px;
      border-radius: 4px;
      border: solid 2px #bcbcbc;
      background-color: transparent;
      font-family: "Open Sans", sans-serif;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;
      @include media(wide) {
        font-size: 20px;
      }
      ._text {
        vertical-align: middle;
        color: #767676;
      }
      ._arrow {
        vertical-align: middle;
        width: 10px;
        height: auto;
        margin-left: 10px;
        fill: #bcbcbc;
      }
    }
    ._side-block {
      position: absolute;
      top: 110px;
      left: 670px;
      width: 100%;
      max-width: 300px;
      @include media(wide) {
        top: 123px;
        left: 920px;
        max-width: 400px;
      }
    }
    ._balance-block {
      margin-bottom: 20px;
      
      .e-number-text.-m {
        margin-top: 8px;
      }
      ._line {
        margin: 20px 0 24px;
        border-color: rgba(188, 188, 188, 0.3);
      }
    }
    ._wallets-block {
      .e-label-text {
        margin-bottom: 5px;
      }
      ._error-block {
        margin-top: 20px;
        padding: 15px 20px;
      }
      ._wallet {
        margin: 0;
        line-height: 1.56;
        overflow: hidden;
        color: #767676;
        font-family: "Open Sans", sans-serif;
        font-weight: bold;
        font-size: 16px;
        text-overflow: ellipsis;
      }
      ._add-wallet-button {
        display: block;
        line-height: 1.43;
        margin: 10px 0 0;
        padding: 0;
        border: none;
        background-color: transparent;
        text-decoration: underline;
        cursor: pointer;
        
        &:first-of-type {
          margin-top: 15px;
        }
        &:disabled {
          opacity: .5;
          cursor: default;
        }
      }
    }
    ._balance-block,
    ._wallets-block {
      width: 100%;
      padding: 23px 30px;
    }
    ._error-block {
      line-height: 1.43;
      border-radius: 4px;
      background-color: rgba(208, 2, 27, 0.1);
      color: #d0021b;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      @include media(wide) {
        font-size: 18px;
      }
    }
  }
</style>
