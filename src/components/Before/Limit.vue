<template>
  <div class="before-limit e-inside-content-block">
    <h2 class="e-header-text">You need increase your limit</h2>
    <p class="e-base-text">
      <!-- eslint-disable-next-line max-len -->
      Unfortunately this information is only accessible to accredited investors, which inside CryptoID means users with a transaction limit of at least $50K.
      <!-- eslint-disable-next-line max-len -->
      If you are have an an income of over $200K per year or assets over $1M, excluding your primary residence or you represent a fund managing over $5M, please go to CryptoID and follow the instructions to increase your limit.
    </p>
    <ol class="e-ordered-list">
      <li class="_element">
        <h4 class="e-caption-text">Open CryptoID and touch on button “Increase”</h4>
        <p class="e-base-text">
          <!-- eslint-disable-next-line max-len -->
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium libero vel efficitur ultrices.
        </p>
      </li>
      <li class="_element">
        <h4 class="e-caption-text">Select your current financial status</h4>
        <p class="e-base-text">
          <!-- eslint-disable-next-line max-len -->
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium libero vel efficitur ultrices.
        </p>
      </li>
      <li class="_element">
        <h4 class="e-caption-text">Upload documents</h4>
        <p class="e-base-text">
          <!-- eslint-disable-next-line max-len -->
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium libero vel efficitur ultrices.
        </p>
      </li>
      <li class="_element">
        <h4 class="e-caption-text">Done</h4>
        <p class="e-base-text">
          <!-- eslint-disable-next-line max-len -->
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium libero vel efficitur ultrices.
        </p>
      </li>
    </ol>
    <!--TODO: Find out if it has to be centered, or moved to left like in model -->
    <div class="_not-accredited-block">
      <h2 class="m-header-text">Not accredited?</h2>
      <p class="e-base-text">
        We are working on expanding, so we can open up access to you as well.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Limit',
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .before-limit {
    ._not-accredited-block {
      margin: 40px 0 0;
      border-top: solid 1px #bcbcbc;
    }
  }
</style>
