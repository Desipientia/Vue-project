<template>
  <form class="message-modal" @submit.prevent="$modal.hide">
    <p class="m-header-text">How to increase allocation?</p>
    <p class="e-base-text">
      <!-- eslint-disable max-len -->
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus vulputate nulla ac finibus. Etiam maximus maximus lacus, vitae luctus ex tincidunt eget. Fusce eleifend est a odio tempor blandit ac a ipsum.
      <br/>
      Nullam dignissim faucibus orci eu luctus. Ut vel luctus purus. In urna ligula, varius non sem a, sagittis interdum nunc. Integer non eros a est consectetur consequat id et est. Integer molestie nunc at magna aliquet faucibus. Nullam eget quam quis augue laoreet aliquam.
      <br/>
      Maecenas tincidunt orci mi, eget tincidunt ligula posuere.
      <!-- eslint-enable max-len -->
    </p>
  </form>
</template>

<script>
  export default {
    name: 'MessageModal',
  };
</script>
