<template>
  <div class="before-landing app-content">
    <h1 class="e-landing-header-text">
      Turn a crypto wallet into a "bank" account you can use in the fiat world</h1>
    <p class="e-landing-base-text">
      Buy anything with crypto, without having to convert to €, $, £ or other currencies and bypass
      KYC & AML procedures at exchanges, token-sales and services.</p>
    <div class="_content-block">
      <router-link class="e-button -white -l"
                   :to="{ name: 'connect' }">Get full access</router-link>
      <div class="_timer">
        <p class="_label">First stage of the ITO will start</p>
        <p class="_time">00:12:33:29</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Landing',
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .before-landing {
    margin: 50px 0 50px;
    
    .e-landing-header-text,
    .e-landing-base-text {
      margin: 30px auto;
      max-width: 820px;
      text-align: center;
    }
    ._content-block {
      margin: 60px auto 0;
      max-width: 700px;
      min-width: 630px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    ._timer {
      min-width: 300px;
      height: 70px;
      padding: 8px 5px;
      border-radius: 4px;
      border: none;
      background-color: #313131;
      text-align: center;
  
      ._label {
        margin: 0;
        color: #bcbcbc;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
      }
      ._time {
        margin: 0;
        color: #fff;
        font-family: "Cabin", sans-serif;
        font-weight: 600;
        font-size: 24px;
      }
    }
  }
</style>
