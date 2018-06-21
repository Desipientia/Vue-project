<template>
  <div class="image-view-modal">
    <img class="_image" :src="$modal.params().src"/>
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
    
    ._image {
      object-fit: contain;
      max-height: 82vh;
    }
  }
</style>
