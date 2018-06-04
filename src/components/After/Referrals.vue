<template>
  <div class="after-referrals e-inside-content-block">
    <h2 class="e-header-text">Referral program</h2>
    <vue-markdown class="e-markdown-block -default"
                  :source="referralText"></vue-markdown>
    <h4 class="e-caption-text">Your Referral Link</h4>
    <div class="_referral-link-block e-white-content-block">
      <input class="e-input -m"
             type="text"
             title="linkInput"
             ref="linkInput"
             v-model="referralLink"
             @keydown.prevent=""/>
      <button class="e-button -grey" @click="copyLink">Copy</button>
    </div>
    <p class="e-label-text">
      Got questions? Contact us at
      <a class="_link-text" href="mailto:referral@cryptoid.ch">referral@cryptoid.ch</a>
    </p>
    <h4 class="e-caption-text">Share Your Link</h4>
    <p class="e-base-text">
      Share your personal reference by clicking on the social media icons below.</p>
    <h4 class="e-caption-text">Statistics</h4>
    <div class="e-white-content-block">
      <p class="_statistics-text">
        <span class="e-number-text -s">Invited</span>
        <span class="e-number-text -s -black">{{ referral.referal_count }} people</span>
      </p>
      <p class="_statistics-text">
        <span class="e-number-text -s">Bonus is</span>
        <span class="e-number-text -s -black">{{ referral.coin_count }} CID</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  const VueMarkdown = () => import('vue-markdown');

  export default {
    name: 'Referrals',
    computed: {
      referralLink() {
        return `${window.location.host}/?r=${this.referral.referal_number}`;
      },
      ...mapState('project', ['referral']),
      ...mapState('pages', {
        referralText: s => s.referral,
      }),
    },
    components: { VueMarkdown },
    methods: {
      copyLink() {
        this.$refs.linkInput.select();
        document.execCommand('copy');
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

<style lang="scss" scoped>
  .after-referrals {
    .e-white-content-block {
      margin: 5px 0 10px;
    }
    ._referral-link-block {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    ._statistics-text {
      display: inline-block;
      width: 49%;
      margin: 0;
    }
    ._link-text {
      color: inherit;
    }
  }
</style>
