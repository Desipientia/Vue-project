<template>
  <div class="after-referrals e-inside-content-block">
    <h2 class="e-header-text">Referral program</h2>
    <p class="e-base-text">
      <!-- eslint-disable-next-line max-len -->
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet sit amet sapien ac semper. Nam tortor dui, rutrum at laoreet eget, mattis ut dui. Nam eu nibh sed massa gravida porttitor ac sed metus.
    </p>
    <h4 class="e-caption-text">Your Referral Link</h4>
    <div class="_referral-link-block e-white-content-block">
      <input class="e-input -m" type="text" value="cryptoid.ch/?r=824"/>
      <button class="e-button -grey">Copy</button>
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
        <span class="e-number-text -s -black">10 people</span>
      </p>
      <p class="_statistics-text">
        <span class="e-number-text -s">Bonus is</span>
        <span class="e-number-text -s -black">30000 CID</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Referrals',
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
