<template>
  <div class="image-view-modal">
    <img :src="$modal.params().src"/>
  </div>
</template>

<script>
  export default {
    name: 'ImageViewModal',
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .image-view-modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
