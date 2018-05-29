<template>
  <div class="page-container" :class="background">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'PageContainer',
    computed: {
      background() {
        return this.$route.name === 'landing' ? '-black' : '-white';
      },
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .page-container {
    flex-grow: 1;
    
    &.-black {
      background-color: #000;
    }
    &.-white {
      background-color: #fff;
    }
  }
</style>
