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
      <div class="_info-element" v-if="ito.current_date">
        <p class="e-label-text">Closing in</p>
        <timer :ending-at="ito.current_date.end_date"></timer>
      </div>
      <div class="_info-element">
        <p class="e-label-text">Total Tokens sold in this stage</p>
        <p class="e-number-text -s">{{ ito.token_for_sale | number }} CIDX</p>
      </div>
      <div class="_info-element">
        <p class="e-label-text">Total Ether received</p>
        <p class="e-number-text -s">{{ ito.received_money | number }} ETH</p>
      </div>
    </div>
    <div class="_allocation-block e-white-content-block">
      <div class="_text-line">
        <div v-if="allocation.transactions_count && allocation.transaction_limit">
          <span class="e-number-text -s -black">${{ allocation.transactions_count.usd }}</span>
          <span class="e-number-text -s">({{ allocation.transactions_count.eth }} ETH)</span>
          <span class="_suffix-text">(of ${{ allocation.transaction_limit.usd_limit }})</span>
        </div>
        <span class="_modal-link-text e-label-text"
              @click="showInfoModal">How to increase?</span>
      </div>
      <progress-bar class="_progress-bar -default" :value="progressValue"></progress-bar>
    </div>
    <form class="_send-block e-white-content-block"
          @submit.prevent="$modal.show('buy', { amount, address })">
      <div>
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
      <button class="e-button -black"
              type="submit"
              :disabled="$v.$invalid">Send</button>
    </form>
    <vue-markdown class="e-markdown-block -tokens"
                  :source="tokens.body"></vue-markdown>
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
        amount: 10.55,
        address: 'null',
        data: [
          { title: 'CID Tokens Distributed', value: 65 },
          { title: 'Advisors, Ecosystem, Partners', value: 10 },
          { title: 'Team', value: 10 },
          { title: 'Reserved', value: 15 },
        ],
      };
    },

    computed: {
      socketTransaction() {
        return this.$store.state.socket.socket.amount;
      },
      progressValue() {
        const a = this.allocation;
        if (!a.transactions_count) return 0;
        return (a.transactions_count.usd / a.transaction_limit.usd_limit) * 100;
      },
      ...mapState('project', [
        'ito',
        'allocation',
        'agreement',
      ]),
      ...mapState('pages', [
        'info',
        'tokens',
      ]),
      ...mapGetters('auth', ['isAgreementConfirmed']),
    },
    watch: {
      socketTransaction: {
        handler() {
          let text = '';
          const socketType = this.$store.state.socket.socket.type;
          switch (socketType) {
            case 'add_eth':
              text = `You send ${this.socketTransaction} ETH`;
              break;
            case 'add_cid':
              text = `You recieve ${this.socketTransaction} CID`;
              break;
            default:
              break;
          }

          this.$toasted.show(text, {}).goAway(3000);
          this.getAllocation();
        },
        deep: true,
      },
    },
    components: {
      Timer,
      ProgressBar,
      VueAutonumeric,
    },
    mixins: [validationMixin],
    validations() {
      return {
        amount: { notZero: value => value > 0 },
      };
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
      ...mapActions('project', [
        'getITO',
        'getAllocation',
        'getAgreement',
      ]),
      ...mapActions('pages', [
        'getInfoModalPageData',
        'getGetTokensPageData',
      ]),
      ...mapActions('auth', ['confirmAgreement']),
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
      this.getGetTokensPageData();
      this.getAllocation();
      this.getITO().then(() => {
        this.address = this.ito.contract_address;
      });
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .after-get-tokens {
    ._info-block {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
  
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
  
      ._line {
        margin: 0;
        color: #bcbcbc;
        font-family: "Cabin", sans-serif;
        font-size: 25px;
      }
    }
    ._allocation-block {
      margin: 2px 0;
      border-radius: 0;
    }
    ._send-block {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
  
      .e-input {
        margin-right: 5px;
      }
    }
    ._send-block,
    ._text-line {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
  
      ._suffix-text {
        margin: 0;
        line-height: 1.56;
        color: #767676;
        font-family: "Open Sans", sans-serif;
        font-size: 16px;
      }
    }
    ._block-caption {
      margin: 25px 0 15px;
      color: #bcbcbc;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 20px;
    }
    ._modal-link-text {
      line-height: 1.79;
      text-decoration: underline;
      cursor: pointer;
    }
    ._progress-bar {
      margin: 5px 0;
      overflow: hidden;
      border-radius: 2px;
    }
  }
</style>
