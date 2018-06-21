<template>
  <div class="timer">
    <p class="e-label-text" v-if="type === 'landing'">Time to pass the KYC process</p>
    <p class="e-label-text" v-else>
      <transition name="e-fade" mode="out-in">
        <span key="inactive" v-if="isInactive">
          The next token distribution will start in</span>
        <span key="default" v-else>Token distribution closes in</span>
      </transition>
    </p>
    <div class="_timer-block">
      <div class="_element" :key="e" v-for="(e, i) in timerElements">
        <div>
          <p class="_text"
             :class="{ '-center': i > 0 }">{{ timerData[e] | twoDigits }}</p>
          <p class="_legend">{{ e }}</p>
        </div>
        <span class="_colon-divider" v-if="i < timerElements.length - 1">:</span>
      </div>
    </div>
  </div>
</template>

<!--suppress ReservedWordAsName -->
<script>
  export default {
    name: 'Timer',
    data() {
      return {
        timerElements: ['days', 'hours', 'mins', 'secs'],
        timerInterval: null,
        dateOfUpdate: (new Date()).getTime(),
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
        const endDate = this.isInactive ? this.parsedDate.start : this.parsedDate.end;
        return Math.trunc(endDate / 1000);
      },
      parsedDate() {
        return {
          start: Date.parse(this.dateRange.start_date),
          end: Date.parse(this.dateRange.end_date),
        };
      },
      isInactive() {
        return this.parsedDate.start > this.dateOfUpdate;
      },
    },
    props: {
      dateRange: {
        type: Object,
        default() {
          return {};
        },
      },
      type: {
        type: String,
        default: 'default',
      },
    },
    watch: {
      dateRange() {
        clearInterval(this.timerInterval);
        this.dateOfUpdate = (new Date()).getTime();
        this.timerInterval = setInterval(() => {
          this.currentDate = Math.trunc((new Date()).getTime() / 1000);
        }, 1000);
      },
    },
    filters: {
      twoDigits(value) {
        const str = value.toString();
        if (str.length <= 1) {
          return `0${str}`;
        }
        return str;
      },
    },
    mounted() {
      this.timerInterval = setInterval(() => {
        this.currentDate = Math.trunc((new Date()).getTime() / 1000);
      }, 1000);
    },
    deleted() {
      clearInterval(this.timerInterval);
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .timer {
    --text-size: 30px;
    --text-width: 40px;
    --text-color: #0e0e0e;
    --legend-color: #767676;
    --colon-size: 14px;
    
    &.-landing {
      --text-size: 40px;
      --text-width: 53px;
      --colon-size: 18px;
    }
    &.-landing,
    &.-main {
      --text-color: #fff;
      --legend-color: #bcbcbc;
      
      .e-label-text {
        color: var(--legend-color);
      }
    }
    ._timer-block {
      display: flex;
    }
    ._text {
      color: var(--text-color);
      font-size: var(--text-size);
    }
    ._legend {
      color: var(--legend-color);
      font-size: 16px;
    }
    ._text,
    ._legend {
      width: var(--text-width);
      margin: 0;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      text-align: center;
    }
    ._element {
      display: flex;
    }
    ._colon-divider {
      margin: 10px 3px 0;
      color: var(--legend-color);
      font-family: "Open Sans", sans-serif;
      font-size: var(--colon-size);
      font-weight: bold;
    }
    ._inscription {
      margin: -5px 0 0;
    }
  }
</style>
