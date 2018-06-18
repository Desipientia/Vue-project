<template>
  <div class="before-landing app-content">
    <vue-markdown class="e-markdown-block -landing" :source="landing.body"></vue-markdown>
    <div class="_content-block" v-if="videoId">
      <div class="_nav-block">
        <label class="_nav-tab" :key="i" v-for="(f, i) in landing.files">
          <input class="_input" type="radio" :value="i" v-model="visibleVideo"/>
          <span class="_label">{{ f.name }}</span>
        </label>
      </div>
      <youtube player-width="630px"
               player-height="440px"
               :video-id="videoId"></youtube>
    </div>
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
    data() {
      return {
        visibleVideo: null,
        videoId: null,
      };
    },
    computed: mapState('pages', ['landing']),
    props: ['referral'],
    watch: {
      visibleVideo() {
        this.videoId = this.$youtube.getIdFromURL(this.landing.files[this.visibleVideo].url);
      },
    },
    components: { Timer },
    methods: mapActions('pages', ['getLandingPageData']),
    mounted() {
      this.getLandingPageData().then(() => {
        this.visibleVideo = 0;
      });
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
      width: 630px;
      margin: 60px auto 0;
    }
    ._timer {
      min-width: 270px;
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
    ._nav-block {
      display: flex;
      justify-content: space-between;
      width: 100%;
      
      ._nav-tab {
        display: flex;
        flex-grow: 1;
        
        ._input {
          display: none;
  
          &:not(:checked) + ._label {
            color: #767676;
            border-bottom: solid 2px rgba(255, 255, 255, 0.1);;
          }
          &:checked + ._label {
            color: #fff;
            border-bottom: solid 2px #fff;
          }
        }
        ._label {
          width: 100%;
          padding: 5px 10px 18px;
          font-family: "Cabin", sans-serif;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          text-transform: uppercase;
          cursor: pointer;
          @include transition(text, border);
        }
      }
    }
  }
</style>
