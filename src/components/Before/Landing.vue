<template>
  <div class="before-landing app-content">
    <vue-markdown class="e-markdown-block -landing" :source="landing.body"></vue-markdown>
    <div class="_content-block" ref="content" v-if="videoId">
      <div class="e-hide-when-mobile">
        <div class="_nav-block">
          <label class="_nav-tab" :key="i" v-for="(f, i) in landing.files">
            <input class="_input" type="radio" :value="i" v-model="visibleVideo"/>
            <span class="_label" v-if="landing.files.length > 1">{{ f.name }}</span>
          </label>
        </div>
      </div>
      <youtube :player-width="playerWidth"
               :player-height="playerHeight"
               :video-id="videoId"></youtube>
    </div>
    <div class="_content-block">
      <router-link class="e-button -white -l"
                   :to="{ name: 'connect', query: this.$route.query }">Get full access</router-link>
      <timer class="_timer -landing" type="landing" :date-range="date"></timer>
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
        playerWidth: '630px',
        playerHeight: '440px',
        ratio: 1.43,
      };
    },
    computed: {
      ...mapState('pages', ['landing']),
      ...mapState('project', ['date']),
    },
    props: ['referral'],
    watch: {
      visibleVideo() {
        this.videoId = this.$youtube.getIdFromURL(this.landing.files[this.visibleVideo].url);
      },
    },
    components: { Timer },
    methods: {
      handleResize() {
        const width = this.$refs.content.clientWidth;
        this.playerWidth = `${width}px`;
        this.playerHeight = `${width / this.ratio}px`;
      },
      ...mapActions('pages', ['getLandingPageData']),
      ...mapActions('project', ['getDateList']),
    },
    mounted() {
      this.getDateList();
      this.getLandingPageData().then(() => {
        this.visibleVideo = 0;
      });
      window.addEventListener('resize', this.handleResize);
      setTimeout(() => { this.handleResize(); }, 1000);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .before-landing {
    width: 100%;
    margin: 50px 0 50px;
    
    ._content-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      width: 630px;
      margin: 60px auto 0;
      @include media(mobile) {
        width: 100%;
      }
      @include media(wide) {
        width: 900px;
      }
    }
    ._timer {
      min-width: 270px;
      height: 120px;
      padding: 8px 5px;
      border-radius: 4px;
      border: none;
      @include media(mobile) {
        margin-top: 20px;
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
