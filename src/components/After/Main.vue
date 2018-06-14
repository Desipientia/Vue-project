<template>
  <div class="after-main">
    <div class="_header-block app-content" v-if="main.cover">
      <vue-markdown class="e-markdown-block -landing" :source="main.cover.body"></vue-markdown>
      <div class="_side-block">
        <div class="_distributed-block">
          <p class="e-caption-text">Total pre-seed token distribution</p>
          <progress-bar class="-main"
                        :label="`${$filters.number(progressValue)} CID`"
                        :max="progressMax"
                        :value="progressValue"></progress-bar>
          <p class="e-label-text">
            <span>0 CID</span>
            <span>{{ maxTokensCount }}</span>
          </p>
        </div>
        <div class="_timer-block">
          <p class="e-caption-text">This month's CID token distribution</p>
          <div class="_content">
            <div class="_element">
              <p class="_label">Tokens distributed in this stage</p>
              <p class="_text">25 Million CID</p>
            </div>
            <div class="_element">
              <p class="_label">Ether received</p>
              <p class="_text">24,661.2 ETH</p>
            </div>
            <router-link class="_element e-button -white -xl"
                         :to="{ name: 'get-tokens' }">Get Tokens</router-link>
            <div class="_element">
              <p class="_label">Token distribution closes in</p>
              <timer class="-main" :ending-at="date.end_date"></timer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="_content-block"></div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  const Timer = () => import(/* webpackChunkName: "timer" */ '../Elements/Timer.vue');
  const ProgressBar = () => import(/* webpackChunkName: "progress-bar" */ '../Elements/ProgressBar');

  export default {
    name: 'Main',
    data() {
      return {
        progressValue: 25000000,
        progressMax: 100000000,
        maxTokensCount: '100 Million CID',
      };
    },
    computed: {
      ...mapState('pages', ['main']),
      ...mapState('project', ['date']),
    },
    components: {
      Timer,
      ProgressBar,
    },
    methods: {
      ...mapActions('pages', ['getMainPageData']),
      ...mapActions('project', ['getDateList']),
    },
    mounted() {
      this.getMainPageData();
      this.getDateList();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .after-main {
    width: 100%;
  
    .e-landing-header-text,
    .e-landing-base-text {
      margin: 30px 0;
    }
    ._header-block {
      display: flex;
      padding-top: 60px;
      padding-bottom: 120px;
      background-color: #000;
  
      .e-caption-text {
        margin: 0;
        color: #fff;
      }
      .e-markdown-block {
        margin-right: 30px;
      }
      ._side-block {
        min-width: 540px;
        
        ._distributed-block {
          width: 520px;
          margin: 0 10px 0;
          padding: 30px 30px 25px;
          border-radius: 4px 4px 0 0;
          background-color: #1d1d1d;
          
          .e-label-text {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            line-height: 1.43;
          }
          .e-caption-text {
            margin: 0 0 10px;
          }
        }
        ._timer-block {
          width: 100%;
          padding: 30px 0 40px 40px;
          border-radius: 4px;
          background-color: #313131;
  
          ._label {
            margin: 0;
            color: #bcbcbc;
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
          }
          ._text {
            margin: 0;
            color: #fff;
            font-family: "Cabin", sans-serif;
            font-weight: 600;
            font-size: 30px;
          }
          ._content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            
            ._element {
              width: 50%;
              margin-top: 25px;
            }
          }
        }
      }
    }
    ._content-block {
      min-height: 500px;
    }
  }
</style>
