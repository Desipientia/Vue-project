<template>
  <div class="after-get-tokens e-inside-content-block">
    <h2 class="e-header-text">Get Tokens</h2>
    <div class="_info-block e-white-content-block">
      <div class="_element">
        <p class="e-label-text">Duration</p>
      </div>
      <div class="_element">
        <p class="e-label-text">Closing in</p>
      </div>
      <div class="_element">
        <p class="e-label-text">Total Tokens sold in this stage</p>
        <p class="e-number-text">250,000 CIDX</p>
      </div>
      <div class="_element">
        <p class="e-label-text">Total Ether received</p>
        <p class="e-number-text">2,661.24 ETH</p>
      </div>
    </div>
    <form class="_send-block e-white-content-block" @submit.prevent="">
      <div>
        <input class="e-input -l" type="text" placeholder="0" value="10.55"/>
        <span class="e-number-text -black">ETH</span>
      </div>
      <button class="e-button -black" type="submit">Send</button>
    </form>
    <p class="_block-caption">Allocation</p>
    <div class="e-white-content-block">
      <div class="_text-line">
        <div>
          <span class="e-number-text -black">$2500</span>
          <span class="e-number-text">(4.1 ETH)</span>
          <span class="e-number-text -smaller">(of $5000)</span>
        </div>
        <span class="_modal-link-text e-label-text"
              @click="$modal.show('info')">How to increase?</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GetTokens',
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .after-get-tokens {
    ._info-block {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      
      ._element {
        margin: 10px 0 20px;
        width: 50%;
      }
    }
    ._send-block {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      
      .e-input {
        margin-right: 5px;
      }
    }
    ._send-block,
    ._text-line {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    ._block-caption {
      margin: 25px 0 15px;
      color: #bcbcbc;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 20px;
    }
    ._modal-link-text {
      line-height: 1.79;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
