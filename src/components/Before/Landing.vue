<template>
  <div class="before-landing app-content">
    <vue-markdown class="e-markdown-block -landing" :source="landing"></vue-markdown>
    <div class="_content-block">
      <router-link class="e-button -white -l"
                   :to="{ name: 'connect' }">Get full access</router-link>
      <div class="_timer">
        <p class="_label">First stage of the ITO will start</p>
        <p class="_time">00:12:33:29</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  const VueMarkdown = () => import('vue-markdown');

  export default {
    name: 'Landing',
    computed: mapState('pages', ['landing']),
    components: { VueMarkdown },
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
      margin: 60px auto 0;
      max-width: 700px;
      min-width: 630px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    ._timer {
      min-width: 300px;
      height: 70px;
      padding: 8px 5px;
      border-radius: 4px;
      border: none;
      background-color: #313131;
      text-align: center;
  
      ._label {
        margin: 0;
        color: #bcbcbc;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
      }
      ._time {
        margin: 0;
        color: #fff;
        font-family: "Cabin", sans-serif;
        font-weight: 600;
        font-size: 24px;
      }
    }
  }
</style>
