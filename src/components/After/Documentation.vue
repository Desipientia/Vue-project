<template>
  <div class="after-documentation">
    <!-- TODO: Check out if Table of contents should be as links or not (can use radio then?) -->
    <div class="_table-of-contents-block">
      <p class="e-number-text"
         :class="{ '-black': c === 'Terms & Conditions' }"
         :key="i"
         v-for="(c, i) in contents">{{ c }}</p>
    </div>
    <div class="_content-block">
      <h2 class="e-header-text">Terms & Conditions</h2>
      <p class="e-base-text">
        <!-- eslint-disable-next-line max-len -->
        By installing the CryptoID apps for iOS or Android and applying for a CryptoID you explicitly agree to these terms described in this document.
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Documentation',
    data() {
      return {
        contents: [
          'One Pager',
          'Terms & Conditions',
          'Tokensale Smart Contract',
        ],
      };
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .after-documentation {
    display: flex;
    
    .e-header-text {
      margin: 0;
    }
    .e-number-text {
      margin-bottom: 16px;
      cursor: pointer;
    }
    ._table-of-contents-block {
      min-width: 365px;
      padding: 70px 71px 70px 75px;
      background-color: #f6f6f6;
    }
    ._content-block {
      padding: 46px 50px 50px 40px;
    }
  }
</style>
