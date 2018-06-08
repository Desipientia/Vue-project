<template>
  <div class="before-landing app-content">
    <vue-markdown class="e-markdown-block -landing" :source="landing"></vue-markdown>
    <div class="_content-block">
      <router-link class="e-button -white -l"
                   :to="{ name: 'connect', query: this.$route.query }">Get full access</router-link>
      <div class="_timer">
        <p class="_label">Time to pass the KYC process</p>
        <timer class="-landing" ending-at="Jun 25, 2018"></timer>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  const Timer = () => import('../Elements/Timer.vue');

  export default {
    name: 'Landing',
    computed: mapState('pages', ['landing']),
    props: ['referral'],
    components: { Timer },
    methods: mapActions('pages', ['getLandingPageData']),
    mounted() {
      this.getLandingPageData();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss">
  .before-landing {
    width: 100%;
    margin: 50px 0 50px;
    
    .e-markdown-block {
      h1, p {
        margin: 30px auto;
        max-width: 820px;
        text-align: center;
      }
    }
    ._content-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      max-width: 700px;
      min-width: 630px;
      margin: 60px auto 0;
    }
    ._timer {
      min-width: 330px;
      height: 120px;
      padding: 8px 5px;
      border-radius: 4px;
      border: none;
  
      ._label {
        margin: 0;
        color: #bcbcbc;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
      }
    }
  }
</style>
