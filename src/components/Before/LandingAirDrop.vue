<template>
  <div class="before-landing app-content">
    <vue-markdown class="e-markdown-block -landing" :source="airDropLanding"></vue-markdown>
    <div class="_content-block -with-button">
    </div>
    <div class="_content-block">
      <router-link class="e-button -white -l"
                   :to="{ name: 'connect', query: this.$route.query }">
                   GET YOUR AIRDROP
      </router-link>
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
        if (!this.airDropLanding.body) return '';
        const index = this.airDropLanding.body.indexOf('\n');
        return this.airDropLanding.body.slice(2, index);
      },
      ...mapState('pages', ['airDropLanding']),
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
    methods: {
      ...mapActions('pages', ['getAirDropLandingPageData']),
      ...mapActions('project', ['getDateList']),
    },
    mounted() {
      this.getDateList();
      this.getAirDropLandingPageData();
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
