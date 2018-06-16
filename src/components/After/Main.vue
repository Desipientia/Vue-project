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
    <div class="_ecosystem-block app-content" v-if="main.the_cryptoid_ecosystem">
      <div class="_line">
        <vue-markdown class="e-markdown-block -default -main -ecosystem -short"
                      :source="main.the_cryptoid_ecosystem.body"></vue-markdown>
        <img class="_image" :src="main.the_cryptoid_ecosystem.files[0].file"/>
      </div>
      <vue-markdown class="e-markdown-block -default -main -ecosystem"
                    :source="main.the_ecosystem_pictures.body"></vue-markdown>
    </div>
    <div class="_token-block app-content" v-if="main.the_cid_token">
      <vue-markdown class="e-markdown-block -default -black -center -token"
                    :source="main.the_cid_token.body"></vue-markdown>
      <div class="_line">
        <div class="_element" :key="i" v-for="(f, i) in main.the_cid_token.files">
          <img class="_image" :src="f.file"/>
          <router-link :to="{ name: 'documentation', query: { name: f.name } }"
                       class="_rounded-button">View {{ f.name | format }}</router-link>
        </div>
      </div>
    </div>
    <div class="_team-block app-content" v-if="main.team">
      <vue-markdown class="e-markdown-block -default -main"
                    :source="main.team.body"></vue-markdown>
      <div class="_content">
        <div class="_element" :key="i" v-for="(t, i) in team">
          <img class="_image" :src="t.avatar">
          <div class="_description">
            <p class="e-caption-text">{{ t.name }}</p>
            <p class="e-base-text">{{ t.team_role }}</p>
            <p class="e-label-text">{{ t.bio }}</p>
            <div class="_socials">
              <svg-icon class="_icon"
                        :name="s.social_name.toLowerCase()"
                        :link="s.url"
                        :key="s.social_name"
                        v-for="s in t.socials"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="_advisors-block app-content" v-if="main.advisors">
      <vue-markdown class="e-markdown-block -default -main"
                    :source="main.advisors.body"></vue-markdown>
    </div>
    <div class="_roadmap-block app-content" v-if="main.roadmap">
      <vue-markdown class="e-markdown-block -default -center"
                    :source="main.roadmap.body"></vue-markdown>
      <img class="_image" :src="main.roadmap.files[0].file"/>
    </div>
    <div class="_program-block app-content" v-if="main.the_merchant_pilot_program">
      <vue-markdown class="e-markdown-block -default -center"
                    :source="main.the_merchant_pilot_program.body"></vue-markdown>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  const Timer = () => import(/* webpackChunkName: "timer" */ '../Elements/Timer.vue');
  const ProgressBar = () => import(/* webpackChunkName: "progress-bar" */ '../Elements/ProgressBar');
  const SvgIcon = () => import(/* webpackChunkName: "svg-icon" */ '../Elements/SvgIcon');

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
      ...mapState('project', [
        'date',
        'team',
      ]),
    },
    components: {
      SvgIcon,
      Timer,
      ProgressBar,
    },
    filters: {
      format(value) {
        if (!value) return '';
        const array = value.toString().split('_');
        const capitalised = array.map(e => e.charAt(0).toUpperCase() + e.slice(1));
        const space = array[0] === 'q' ? '&' : ' ';
        return capitalised.join(space);
      },
    },
    methods: {
      ...mapActions('pages', ['getMainPageData']),
      ...mapActions('project', [
        'getDateList',
        'getTeamList',
      ]),
    },
    mounted() {
      this.getMainPageData();
      this.getDateList();
      this.getTeamList();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .after-main {
    width: 100%;
  
    .app-content {
      padding-top: 80px;
      padding-bottom: 110px;
    }
    .e-landing-header-text,
    .e-landing-base-text {
      margin: 30px 0;
    }
    ._rounded-button {
      display: block;
      width: 190px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      background-color: #313131;
      color: #fff;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      text-decoration: none;
    }
    ._header-block,
    ._token-block {
      background-color: #0e0e0e;
    }
    ._ecosystem-block,
    ._roadmap-block {
      background-color: #f6f6f6;
    }
    ._team-block,
    ._advisors-block,
    ._program-block {
      background-color: #fff;
    }
    ._header-block {
      display: flex;
      min-height: 600px;
      padding-bottom: 80px;
  
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
    ._ecosystem-block {
      ._line {
        display: flex;
        justify-content: space-between;
      }
      ._image {
        flex-grow: 1;
        flex-basis: 620px;
        max-width: 700px;
        margin-left: 30px;
      }
    }
    ._token-block {
      ._rounded-button {
        margin-top: 25px;
        background-color: #313131;
      }
      ._line {
        display: flex;
        justify-content: space-between;
        max-width: 850px;
        margin: 50px auto 0;
        
        ._element {
          width: 190px;
        }
        ._image {
          width: 100%;
        }
      }
    }
    ._team-block {
      ._content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 60px;
        
        ._element {
          display: flex;
          width: 31%;
          margin-bottom: 60px;
        }
        ._image {
          width: 190px;
          height: 230px;
          margin-right: 20px;
          object-fit: contain;
        }
        ._description {
          display: flex;
          flex-direction: column;
          
          .e-caption-text,
          .e-base-text {
            font-weight: 600;
          }
          .e-caption-text {
            margin: 0;
          }
          .e-base-text {
            margin: 2px 0 8px;
          }
          .e-label-text {
            flex-grow: 1;
            line-height: 1.43;
            padding: 8px 0;
            border-top: solid 2px #bcbcbc;
          }
          ._socials {
            height: 20px;
          }
          ._icon {
            fill: #bcbcbc;
            
            &:not(:last-child) {
              margin-right: 10px;
            }
          }
        }
      }
    }
    ._advisors-block {
      border-top: solid 2px #ededed;
    }
    ._roadmap-block {
      ._image {
        width: 100%;
        max-height: 300px;
        margin-top: 45px;
        object-fit: contain;
      }
    }
  }
</style>
