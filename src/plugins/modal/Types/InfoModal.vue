<template>
  <form class="message-modal" @submit.prevent="$modal.hide">
    <p class="m-header-text">How to increase allocation?</p>
    <p class="e-base-text">{{ $modal.params().text }}</p>
  </form>
</template>

<script>
  export default {
    name: 'MessageModal',
  };
</script>
