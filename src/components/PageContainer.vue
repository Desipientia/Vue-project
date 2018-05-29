<template>
  <div class="page-container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'PageContainer',
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .page-container {
    flex-grow: 1;
  }
</style>
