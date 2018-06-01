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
        <div class="_closing-in-block">
          <div class="_element" :key="e" v-for="(e, i) in timerElements">
            <div>
              <p class="e-number-text -l -black"
                 :class="{ '-center': i > 0 }">{{ timerData[e] | twoDigits }}</p>
              <p class="_inscription e-number-text -xs -center">{{ e }}</p>
            </div>
            <span class="_colon-divider" v-if="i < timerElements.length - 1">:</span>
          </div>
        </div>
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
    <form class="_send-block e-white-content-block" @submit.prevent="">
      <div>
        <input class="e-input -l" type="text" placeholder="0" value="10.55"/>
        <span class="e-number-text -s -black">ETH</span>
      </div>
      <button class="e-button -black" type="submit">Send</button>
    </form>
    <p class="_block-caption">Allocation</p>
    <div class="e-white-content-block">
      <div class="_text-line">
        <div>
          <span class="e-number-text -s -black">$2500</span>
          <span class="e-number-text -s">(4.1 ETH)</span>
          <span class="_suffix-text">(of $5000)</span>
        </div>
        <span class="_modal-link-text e-label-text"
              @click="$modal.show('info')">How to increase?</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'GetTokens',
    data() {
      return {
        timerElements: ['days', 'hours', 'mins', 'secs'],
        timerInterval: null,
        currentDate: Math.trunc((new Date()).getTime() / 1000),
      };
    },
    computed: {
      timerData() {
        const t = this.endDate - this.currentDate || 0;
        const secs = Math.floor(t % 60);
        const mins = Math.floor((t / 60) % 60);
        const hours = Math.floor((t / 60 / 60) % 24);
        const days = Math.floor(t / 60 / 60 / 24);

        if (this.endDate && t <= 0) clearInterval(this.timerInterval);
        return { days, hours, mins, secs };
      },
      endDate() {
        return Math.trunc((Date.parse(this.ito.end_date) / 1000));
      },
      ...mapState('project', ['ito']),
    },
    filters: {
      twoDigits(value) {
        const str = value.toString();
        if (str.length <= 1) {
          return `0${str}`;
        }
        return str;
      },
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
    methods: mapActions('project', ['getITO']),
    mounted() {
      this.getITO().then(() => {
        this.timerInterval = setInterval(() => {
          this.currentDate = Math.trunc((new Date()).getTime() / 1000);
        }, 1000);
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
    ._closing-in-block {
      display: flex;
      
      .e-number-text,
      ._inscription {
        width: 40px;
      }
      ._element {
        display: flex;
      }
      ._colon-divider {
        margin: 10px 3px 0;
        color: #767676;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
        font-weight: bold;
      }
      ._inscription {
        margin: -5px 0 0;
      }
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
  }
</style>
