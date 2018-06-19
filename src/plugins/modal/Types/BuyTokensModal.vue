<template>
  <form class="buy-tokens-modal" @submit.prevent="$modal.accept">
    <p class="m-header-text">Buy Tokens</p>
    <p class="e-label-text">Price</p>
    <p class="_price-text">
      <span class="_number">{{ $modal.params().amount.toFixed(2) }}</span>
      <span class="_suffix">ETH</span>
    </p>
    <p class="e-label-text">Send a payment to the wallet address</p>
    <qrcode class="_qr-code-block"
            :options="{ size: 120 }"
            v-model="$modal.params().address"></qrcode>
    <p class="_wallet-address-text">{{ $modal.params().address }}</p>
    <p class="e-info-text">
      <!-- eslint-disable-next-line max-len -->
      Please set the gas to at least <b>55 GWEI</b> and <b>210.000</b> (two hundred and ten thousand) blocks.
    </p>
    <p class="e-label-text">Send with browser plugin</p>
    <button class="e-button -grey"
            type="submit">Send Transaction with MetaMask</button>
    <!-- eslint-disable-next-line max-len-->
    <p class="_bottom-text e-label-text">You should see the amount of ETH you contributed added to your balance within 24 hours. You will receive your CID tokens at the end of the current token distribution period.</p>
  </form>
</template>

<script>
  const VueQrcode = () => import('@xkeshi/vue-qrcode');

  export default {
    name: 'DialogModal',
    data() {
      return {
        amount: '',
        type: '',
      };
    },
    components: { qrcode: VueQrcode },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .buy-tokens-modal {
    .e-button {
      width: 100%;
      margin-top: 15px;
    }
    .e-label-text {
      line-height: 1.43;
    }
    ._price-text {
      margin: 0 0 8px;
      color: #0e0e0e;
      font-family: "Open Sans", sans-serif;
      
      ._number {
        font-weight: 600;
        font-size: 30px;
      }
      ._suffix {
        font-size: 20px;
      }
    }
    ._wallet-address-text {
      margin: 15px 0;
      padding: 13px 0;
      border-top: solid 1px rgba(188, 188, 188, 0.3);
      border-bottom: solid 1px rgba(188, 188, 188, 0.3);
      color: #0e0e0e;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 19px;
    }
    ._grey-block {
      margin: 15px 0 25px;
      padding: 14px 5px;
      border-radius: 4px;
      background-color: #f6f6f6;
      
      ._text {
        margin: 0;
        color: #0e0e0e;
        font-family: "Open Sans", sans-serif;
        font-weight: 700;
        font-size: 16px;
        text-align: center;
      }
    }
    ._qr-code-block {
      display: block;
      margin: 20px auto;
    }
    ._bottom-text {
      margin-top: 45px;
    }
  }
</style>
