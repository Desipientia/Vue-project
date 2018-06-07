<template>
  <div class="after-main">
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
        <div class="_timer-block">
          <router-link class="e-button -white -l"
                       :to="{ name: 'get-tokens' }">Get Tokens</router-link>
          <div class="_timer">
            <p class="_label">Closing in</p>
            <timer class="-landing" ending-at="Jun 25, 2018"></timer>
          </div>
        </div>
      </div>
    </div>
    <div class="_content-block"></div>
  </div>
</template>

<script>
  import Timer from '../Elements/Timer';

  export default {
    name: 'Main',
    components: { Timer },
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
      min-width: 300px;
      margin-right: 8px;
    }
    ._header-block {
      padding-top: 60px;
      padding-bottom: 120px;
      background-color: #000;
    }
    ._timer-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin: 50px 0 0;
      max-width: 700px;
      min-width: 630px;
    }
    ._timer {
      min-width: 310px;
      height: 120px;
      padding: 8px 5px;
      border-radius: 4px;
      border: none;
    
      ._label {
        margin: 0;
        color: #bcbcbc;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
      }
    }
    ._content-block {
      height: 500px;
    }
  }
</style>
