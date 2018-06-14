<template>
  <form class="info-modal" @submit.prevent="$modal.hide">
    <p class="m-header-text">How to increase allocation?</p>
    <vue-markdown class="e-markdown-block -modal"
                  :source="$modal.params().data"></vue-markdown>
  </form>
</template>

<script>
  export default {
    name: 'MessageModal',
  };
</script>
