<template>
  <div class="page-container" :class="background">
    <transition name="e-fade" mode="out-in">
      <router-view></router-view>
    </transition>
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
    @include transition(background);
    
    &.-black {
      background-color: #000;
    }
    &.-white {
      background-color: #fff;
    }
  }
</style>
