<template>
  <div class="before-landing app-content">
    <vue-markdown class="e-markdown-block -landing" :source="landing.body"></vue-markdown>
    <div class="_content-block" ref="content" v-if="videoId">
      <div class="_nav-block">
        <label class="_nav-tab" :key="i" v-for="(f, i) in landing.files">
          <input class="_input" type="radio" :value="i" v-model="visibleVideo"/>
          <span class="_label" v-if="landing.files.length > 1">{{ f.name }}</span>
        </label>
      </div>
      <youtube :player-width="playerWidth"
               :player-height="playerHeight"
               :video-id="videoId"></youtube>
    </div>
    <div class="_content-block -with-button">
      <router-link class="_q-a-button" :to="{ name: 'qa' }">
        <svg class="_icon" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
          <!-- eslint-disable-next-line max-len -->
          <path d="M0,0 L11,0 L11,2 L0,2 L0,0 Z M0,4 L11,4 L11,6 L0,6 L0,4 Z M0,8 L11,8 L11,10 L0,10 L0,8 Z M0,12 L7,12 L7,14 L0,14 L0,12 Z"></path>
        </svg>
        Read Q&A
      </router-link>
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
  import { root } from '../../config';

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
      title() {
        if (!this.landing.body) return '';
        const index = this.landing.body.indexOf('\n');
        return this.landing.body.slice(2, index);
      },
      videoUrl() {
        if (!this.landing.files) return '';
        return this.landing.files[0].url;
      },
      ...mapState('pages', ['landing']),
      ...mapState('project', ['date']),
    },
    props: ['referral'],
    components: { Timer },
    metaInfo() {
      return {
        title: 'CryptoID',
        titleTemplate: null,
        meta: [
          {
            property: 'og:title',
            content: this.title,
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:url',
            content: root || window.location.href,
          },
          {
            property: 'og:image',
            content: this.videoUrl,
          },
          {
            property: 'og:video',
            content: this.videoUrl,
          },
        ],
      };
    },
    watch: {
      visibleVideo() {
        this.videoId = this.$youtube.getIdFromURL(this.landing.files[this.visibleVideo].url);
      },
    },
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
      margin: 50px auto 0;
      @include media(mobile) {
        width: 100%;
      }
      @include media(wide) {
        width: 900px;
      }
      &.-with-button {
        margin-top: 20px;
      }
      .e-hide-when-mobile {
        width: 100%;
      }
    }
    ._q-a-button {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-radius: 4px;
      background-color: #1d1d1d;
      color: #fff;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      cursor: pointer;
      @include media(wide) {
        height: 60px;
        line-height: 60px;
        font-size: 20px;
      }
      ._icon {
        width: 11px;
        height: auto;
        margin: 0 5px -1px;
        fill: #767676;
        @include media(wide) {
          width: 14px;
          margin: 0 7px -3px;
        }
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
