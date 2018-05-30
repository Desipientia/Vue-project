<template>
  <div class="after-main">
    <!--TODO: Synchronize animation with page header -->
    <div class="_header-block app-content">
      <div class="e-inside-content-block -left">
        <h1 class="e-landing-header-text">
          Turn a crypto wallet into a "bank" account you can use in the fiat world</h1>
        <p class="e-landing-base-text">
          <!-- eslint-disable-next-line max-len -->
          Buy anything with crypto, without having to convert to €, $, £ or other fiat currencies. Bypass KYC & AML procedures at exchanges, token-sales, and other services.
          <br><br>
          CryptoID uses end-to-end encryption to secure your data and is GDPR-compliant by design.
        </p>
        <button class="e-button -white -s">GDPR</button>
        <button class="e-button -white -s">KYC/AML</button>
      </div>
    </div>
    <div class="_content-block"></div>
  </div>
</template>

<script>
  export default {
    name: 'Main',
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .after-main {
    width: 100%;
  
    .e-landing-header-text,
    .e-landing-base-text {
      margin: 30px 0;
    }
    .e-button {
      margin-right: 8px;
    }
    ._header-block {
      padding-top: 60px;
      padding-bottom: 120px;
      background-color: #000;
    }
    ._content-block {
      height: 500px;
    }
  }
</style>
