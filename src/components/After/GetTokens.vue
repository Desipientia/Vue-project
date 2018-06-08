<template>
  <div class="after-get-tokens e-inside-content-block">
    <h2 class="e-header-text">Get Tokens</h2>
    <div class="_info-block e-white-content-block">
      <div class="_info-element">
        <p class="e-label-text">Duration</p>
        <div class="_duration-block">
          <div>
            <p class="e-number-text -m -black">{{ ito.start_date | date }}</p>
            <p class="e-number-text -s">{{ ito.start_date | time }}</p>
          </div>
          <p class="_line">–</p>
          <div>
            <p class="e-number-text -m -black">{{ ito.end_date | date }}</p>
            <p class="e-number-text -s">{{ ito.end_date | time }}</p>
          </div>
        </div>
      </div>
      <div class="_info-element">
        <p class="e-label-text">Closing in</p>
        <timer :ending-at="ito.end_date"></timer>
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
        <div v-if="allocation.transactions_count">
          <span class="e-number-text -s -black">${{ allocation.transactions_count.usd }}</span>
          <span class="e-number-text -s">({{ allocation.transactions_count.eth }} ETH)</span>
          <span class="_suffix-text">(of ${{ allocation.transaction_limit.usd_limit }})</span>
        </div>
        <span class="_modal-link-text e-label-text"
              @click="$modal.show('info')">How to increase?</span>
      </div>
      <vue-simple-progress class="_progress-bar"
                           bg-color="#ededed"
                           bar-color="#767676"
                           size="4"
                           :val="2500 / 5000 * 100"></vue-simple-progress>
    </div>
    <form class="_send-block e-white-content-block" @submit.prevent="">
      <div>
        <input class="e-input -l" type="text" placeholder="0" value="10.55"/>
        <span class="e-number-text -s -black">ETH</span>
      </div>
      <button class="e-button -black" type="submit">Send</button>
    </form>
    <h4 class="e-caption-text">CID Token Distribution</h4>
    <!-- eslint-disable -->
    <p class="e-base-text">We will distribute 1 Billion tokens via a series of auctions, which will take place every 25th day of each month, for a duration of 72 hours.</p>
    <div class="_info-table">
      <div class="_column">
        <img class="_icon" src="" alt="Icon in progress"/>
        <p class="_info-caption">Equal opportunity</p>
        <p class="_info-text -table">To ensure inclusivity CID tokens don’t have a fixed price. Instead, the price is set by the market. This way both small and large purchasers can participate.</p>
      </div>
      <div class="_column">
        <img class="_icon" src="" alt="Icon in progress"/>
        <p class="_info-caption">Wide Distribution</p>
        <p class="_info-text -table">Since the CID token can be used by anyone to buy/sell goods and services with cryptocurrencies, we aim to achieve the widest possible token distribution.</p>
      </div>
      <div class="_column">
        <img class="_icon" src="" alt="Icon in progress"/>
        <p class="_info-caption">Avoid Oversupply</p>
        <p class="_info-text -table">Instead of flooding the market with all tokens at once, tokens will be released gradually as the CryptoID ecosystem matures.</p>
      </div>
    </div>
    <p class="_example-caption">Example:</p>
    <ol class="_example-list">
      <li class="_info-text">100 CID tokens are available during a monthly 72 hour period.</li>
      <li class="_info-text">Mary contributes 4 ETH and Rob contributes 1 ETH during the period.</li>
      <li class="_info-text">As a total of 5 ETH were contributed for 100 CID tokens during the period. 1 CID token will be distributed for every 0.05 ETH contributed. Therefore, Mary receives 80 CID tokens and Rob receives 20 CID tokens.</li>
    </ol>
    <div class="_info-table">
      <div class="_column">
        <p class="_info-caption">Stage Pre-seed - 10%</p>
        <p class="_info-text -stage">
          <b>2.5%</b> - June 10th to 25th
        </p>
        <p class="_info-text -small-stage">
          (the first is an exception and will run immediately until 25th)
        </p>
        <p class="_info-text -stage">
          <b>2.5%</b> - July 25th
        </p>
        <p class="_info-text -stage">
          <b>2.5%</b> - August 25th
        </p>
        <p class="_info-text -stage">
          <b>2.5%</b> - September 25th
        </p>
      </div>
      <div class="_column">
        <p class="_info-caption">Stage Seed - 15%</p>
        <p class="_info-text -stage">
          <b>5%</b> - October 25th
        </p>
        <p class="_info-text -stage">
          <b>5%</b> - November 25th
        </p>
        <p class="_info-text -stage">
          <b>5%</b> - December 15th
        </p>
      </div>
      <div class="_column">
        <p class="_info-caption">Stage Growth - 40%</p>
        <p class="_info-text -stage">
          <b>10%</b> - February 25th, 2019
        </p>
        <p class="_info-text -stage">
          <b>10%</b> - March 25th, 2019
        </p>
        <p class="_info-text -stage">
          <b>10%</b> - April 25th, 2019
        </p>
        <p class="_info-text -stage">
          <b>10%</b> - May 25th, 2019
        </p>
      </div>
    </div>
    <pie-chart caption="Token Distribution" :data="data"></pie-chart>
    <!-- eslint-enable -->
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import VueSimpleProgress from 'vue-simple-progress';
  import PieChart from '../Elements/PieChart';

  const Timer = () => import('../Elements/Timer.vue');

  export default {
    name: 'GetTokens',
    data() {
      return {
        data: [
          { title: 'CID Tokens Distributed', value: 65 },
          { title: 'Advisors, Ecosystem, Partners', value: 10 },
          { title: 'Team', value: 10 },
          { title: 'Reserved', value: 15 },
        ],
      };
    },
    computed: mapState('project', [
      'ito',
      'allocation',
    ]),
    computed: {
      ...mapState('project', [
        'ito',
        'allocation',
      ]),
      ...mapGetters('auth', ['isAgreementConfirmed']),
    },
    components: {
      PieChart,
      Timer,
      VueSimpleProgress,
    },
    filters: {
      time(dateString) {
        return (new Date(dateString || 0)).toLocaleTimeString('en', {
          hour: 'numeric',
          minute: 'numeric',
        }).replace('AM', 'am').replace('PM', 'pm');
      },
      date(dateString) {
        return (new Date(dateString || 0)).toLocaleDateString('en', {
          day: 'numeric',
          month: 'short',
        });
      },
      number(value) {
        return (value || 0).toLocaleString('en');
      },
    },
    methods: {
      ...mapActions('project', [
        'getITO',
        'getAllocation',
      ]),
      ...mapActions('auth', ['confirmAgreement']),
    },
    mounted() {
      if (!this.isAgreementConfirmed) {
        this.$modal.show({
          type: 'agreement',
          onAccept: () => { this.confirmAgreement(); },
          onHide: () => {
            if (!this.isAgreementConfirmed) {
              this.$router.replace({ name: 'main' });
            }
          },
        });
      }
      this.getITO();
      this.getAllocation();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .after-get-tokens {
    .e-caption-text {
      margin: 50px 0 10px;
    }
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
    ._info-table {
      display: flex;
      justify-content: space-between;
      margin: 30px 0 10px;
      
      ._column {
        width: 30%;
      }
      ._icon {
        display: block;
        width: 100%;
        height: 100px;
        line-height: 100px;
        margin: 10px 0 15px;
        object-fit: cover;
        background-color: #ededed;
        color: #767676;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
        text-align: center;
      }
    }
    ._info-caption {
      margin: 10px 0;
      color: #0e0e0e;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 18px;
    }
    ._info-text {
      margin: 0;
      color: #767676;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      
      &.-table {
        line-height: 1.43;
      }
      &.-stage {
        line-height: 1.79;
      }
      &.-small-stage {
        font-size: 12px;
        line-height: 1.63;
      }
    }
    ._example-caption {
      margin: 35px 0 0;
      line-height: 1.56;
      color: #767676;
      font-family: "Open Sans", sans-serif;
      font-weight: 600;
      font-size: 16px;
    }
    ._example-list {
      counter-reset: li;
      margin: 0;
      padding: 0;
      
      li {
        position: relative;
        margin: 5px 0;
        padding-left: 20px;
        list-style: none;
    
        &:before {
          content: counter(li)'.';
          counter-increment: li;
          position: absolute;
          top: 0;
          left: 0;
          font-weight: 700;
        }
      }
    }
  }
</style>
