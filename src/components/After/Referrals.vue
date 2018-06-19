<template>
  <div class="after-referrals e-inside-content-block">
    <div class="_purchase-block e-white-content-block" v-if="purchase">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512">
        <!-- eslint-disable-next-line max-len -->
        <path fill="#3ab94a" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
      </svg>
      <p class="e-number-text -black -l">You purchase is being processed</p>
      <p class="e-base-text">
        <!-- eslint-disable-next-line max-len -->
        Thanks for participating in the CID Token distribution. You should receive your tokens to your balance within 24 hours.
      </p>
      <router-link class="e-button -grey"
                   :to="{ name: 'get-tokens' }">Get more Tokens</router-link>
    </div>
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
      <svg-icon class="_share-link" name="linkedin"></svg-icon>
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

  const SvgIcon = () => import(/* webpackChunkName: "svg-icon" */ '../Elements/SvgIcon');

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
    props: ['purchase'],
    components: { SvgIcon },
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
    ._purchase-block {
      margin: 50px 0 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .e-number-text {
        margin-top: 10px;
      }
      .e-base-text {
        margin: 14px 0 29px;
        text-align: center;
      }
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
