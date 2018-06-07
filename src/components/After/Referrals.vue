<template>
  <div class="after-referrals e-inside-content-block">
    <h2 class="e-header-text">Earn Tokens</h2>
    <vue-markdown class="e-markdown-block -default"
                  :source="referralText"></vue-markdown>
    <div class="_referral-link-block e-white-content-block">
      <input class="e-input -m"
             type="text"
             title="linkInput"
             ref="linkInput"
             v-model="referralLink"
             @keydown.prevent=""/>
      <button class="e-button -grey" @click="copyLink">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="15"
             height="12.5"
             v-show="copyButtonText === 'Copied'">
          <g stroke="#3ab94a" stroke-width="3">
            <line x1="1" y1="6" x2="7" y2="11"></line>
            <line x1="5" y1="11" x2="14" y2="1"></line>
          </g>
        </svg>
        {{ copyButtonText }}
      </button>
    </div>
    <p class="e-label-text">
      Got questions? Contact us at
      <a class="_link-text" href="mailto:referral@cryptoid.ch">referral@cryptoid.ch</a>
    </p>
    <h4 class="e-caption-text">Share Your Link</h4>
    <p class="e-base-text">
      Share your personal reference by clicking on the social media icons below.</p>
    <div class="_share-link-block">
      <svg-icon class="_share-link" name="facebook"></svg-icon>
      <svg-icon class="_share-link" name="twitter"></svg-icon>
      <svg-icon class="_share-link" name="linked-in"></svg-icon>
      <svg-icon class="_share-link" name="bitcoin-talk"></svg-icon>
      <svg-icon class="_share-link" name="telegram"></svg-icon>
    </div>
    <h4 class="e-caption-text">Statistics</h4>
    <div class="e-white-content-block">
      <p class="_statistics-text">
        <span class="e-number-text -s">Invited</span>
        <span class="e-number-text -s -black">{{ referral.referal_count }} people</span>
      </p>
      <p class="_statistics-text">
        <span class="e-number-text -s">Earned</span>
        <span class="e-number-text -s -black">{{ referral.coin_count }} CID</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  const VueMarkdown = () => import('vue-markdown');
  const SvgIcon = () => import('../Elements/SvgIcon');

  export default {
    name: 'Referrals',
    data() {
      return {
        copyButtonText: 'Copy',
      };
    },
    computed: {
      referralLink() {
        return `${window.location.host}/?r=${this.referral.referal_number}`;
      },
      ...mapState('project', ['referral']),
      ...mapState('pages', {
        referralText: s => s.referral,
      }),
    },
    components: { VueMarkdown, SvgIcon },
    methods: {
      copyLink() {
        this.$refs.linkInput.select();
        document.execCommand('copy');
        this.copyButtonText = 'Copied';
        setTimeout(() => { this.copyButtonText = 'Copy'; }, 5000);
      },
      ...mapActions('project', ['getReferral']),
      ...mapActions('pages', ['getReferralPageData']),
    },
    mounted() {
      this.getReferral();
      this.getReferralPageData();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss">
  .after-referrals {
    .e-caption-text {
      margin: 32px 0 6px;
    }
    .e-white-content-block {
      margin: 5px 0 10px;
    }
    ._referral-link-block {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: 25px 0 15px;
    }
    ._statistics-text {
      display: inline-block;
      width: 49%;
      margin: 0;
    }
    ._link-text {
      color: inherit;
    }
    ._share-link-block {
      display: flex;
      align-items: flex-start;
      margin-top: 20px;
    }
    ._share-link {
      margin-right: 30px;
      fill: #bcbcbc;
      cursor: pointer;
      @include transition(svg);
      
      &:hover {
        &.facebook {
          fill: #3b5998;
        }
        &.twitter {
          fill: #1da1f2;
        }
        &.linked-in {
          fill: #0077b5;
        }
        &.bitcoin-talk {
          fill: #f8b62b;
        }
        &.telegram {
          fill: #0088cc;
        }
      }
      svg {
        width: auto;
        height: 30px;
      }
    }
  }
</style>
