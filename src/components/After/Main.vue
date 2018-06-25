<template>
  <div class="after-main">
    <div class="_header-block app-content" v-if="main.cover">
      <div class="e-transparent-content-block">
        <vue-markdown class="e-markdown-block -main" :source="main.cover.body"></vue-markdown>
        <div class="_side-block">
          <div class="_distributed-block">
            <p class="e-caption-text">Total pre-seed token distribution</p>
            <progress-bar class="-main"
                          :label="`${$filters.number(ito.current_date.token_for_sale)} CID`"
                          :max="ito.total_supply"
                          :value="ito.current_date.token_for_sale"></progress-bar>
            <p class="e-label-text">
              <span>0 CID</span>
              <span>{{$filters.number(ito.total_supply)}} CID</span>
            </p>
          </div>
          <div class="_timer-block">
            <p class="e-caption-text">This month's CID token distribution</p>
            <div class="_content">
              <div class="_element">
                <p class="_label">Tokens distributed in this stage</p>
                <p class="_text">{{$filters.number(ito.current_date.token_for_sale)}} CID</p>
              </div>
              <div class="_element">
                <p class="_label">Ether received</p>
                <p class="_text">{{ito.received_money}}</p>
              </div>
              <router-link class="_element e-button -white -xl"
                           :to="{ name: 'get-tokens' }">Get Tokens</router-link>
              <timer class="_element -main" :date-range="ito.current_date"></timer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="_ecosystem-block app-content" v-if="main.the_cryptoid_ecosystem">
      <div class="e-transparent-content-block">
        <div class="_line">
          <vue-markdown class="e-markdown-block -default -ecosystem -short"
                        :source="main.the_cryptoid_ecosystem.body"></vue-markdown>
          <div class="_image-wrapper">
            <img class="_image" :src="main.the_cryptoid_ecosystem.files[0].file"/>
            <button class="_rounded-button"
                    @click="$modal.show(
                    'image-view',
                    { src: main.the_cryptoid_ecosystem.files[0].file }
                  )">View full size</button>
          </div>
        </div>
        <vue-markdown class="e-markdown-block -default  -ecosystem"
                      :source="main.the_ecosystem_pictures.body"></vue-markdown>
      </div>
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
      <div class="e-transparent-content-block">
        <vue-markdown class="e-markdown-block -default"
                      :source="main.team.body"></vue-markdown>
        <div class="_person-inside-block">
          <div class="_element" :key="i" v-for="(t, i) in team['team']">
            <img class="_image" :src="t.avatar">
            <div class="_description">
              <p class="e-caption-text">{{ t.name }}</p>
              <p class="e-base-text">{{ t.position }}</p>
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
          <div class="_element -empty" :key="`e_${i}`" v-for="i in maxElementsPerFlexLine"></div>
        </div>
      </div>
    </div>
    <div class="_advisors-block app-content" v-if="main.advisors">
      <div class="e-transparent-content-block">
        <vue-markdown class="e-markdown-block -default"
                      :source="main.advisors.body"></vue-markdown>
        <div class="_person-inside-block">
          <div class="_element" :key="i" v-for="(t, i) in team['advisor']">
            <img class="_image" :src="t.avatar">
            <div class="_description">
              <p class="e-caption-text">{{ t.name }}</p>
              <p class="e-base-text">{{ t.position }}</p>
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
          <div class="_element -empty" :key="`e_${i}`" v-for="i in maxElementsPerFlexLine"></div>
        </div>
      </div>
    </div>
    <div class="_roadmap-block app-content" v-if="main.roadmap">
      <div class="e-transparent-content-block">
        <vue-markdown class="e-markdown-block -default -center"
                      :source="main.roadmap.body"></vue-markdown>
        <img class="_image" :src="main.roadmap.files[0].file"/>
      </div>
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
        maxElementsPerFlexLine: 8,
      };
    },
    computed: {
      ...mapState('pages', ['main']),
      ...mapState('project', [
        'date',
        'ito',
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
        'getTeamList',
        'getITO',
      ]),
    },
    mounted() {
      this.getMainPageData();
      // this.getDateList();
      this.getTeamList();
      this.getITO();

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
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      border: none;
      color: #fff;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
    }
    ._person-inside-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 60px;
  
      ._element {
        display: flex;
        width: 31%;
        max-width: 420px;
        margin-bottom: 60px;
        @include media(wide) {
          max-width: 520px;
        }
        &.-empty {
          height: 0;
          margin: 0;
        }
      }
      ._image {
        min-width: 190px;
        max-width: 190px;
        height: 230px;
        margin-right: 20px;
        object-fit: contain;
        @include media(wide) {
          min-width: 220px;
          max-width: 220px;
        }
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
          border-top: solid 1px #bcbcbc;
        }
        ._socials svg {
          width: auto;
          height: 20px;
          @include media(wide) {
            height: 25px;
          }
        }
        ._icon {
          fill: #bcbcbc;
      
          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
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
      min-height: 600px;
      padding-bottom: 80px;
  
      .e-transparent-content-block {
        display: flex;
      }
      .e-caption-text {
        margin: 0;
        color: #fff;
      }
      .e-markdown-block {
        margin-right: 30px;
      }
      ._side-block {
        min-width: 580px;
        
        ._distributed-block {
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
      ._rounded-button {
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        width: 130px;
        background-color: rgba(14, 14, 14, 0.4);
      }
      ._line {
        display: flex;
        justify-content: space-between;
      }
      ._image-wrapper {
        position: relative;
        display: flex;
        align-items: flex-end;
        flex-grow: 1;
        flex-basis: 620px;
        max-width: 700px;
        margin-left: 30px;
        
        ._image {
          width: 100%;
        }
      }
    }
    ._token-block {
      ._rounded-button {
        width: 190px;
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
