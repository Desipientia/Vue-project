<template>
  <form class="buy-tokens-modal" @submit.prevent="$modal.accept">
    <p class="m-header-text">Buy Tokens</p>
    <button class="e-button -black" type="submit">I sent</button>
  </form>
</template>

<script>
  export default {
    name: 'DialogModal',
  };
</script>
