<template>
  <div class="page-container" :class="background">
    <div class="_background-block"></div>
    <div class="_content-block">
      <transition name="e-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageContainer',
    computed: {
      background() {
        switch (this.$route.name) {
          case 'landing':
            return '-black';
          case 'main':
            return '-white -half';
          case 'get-tokens':
          case 'referrals':
            return '-grey';
          default:
            return '-white';
        }
      },
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .page-container {
    position: relative;
    flex-grow: 1;
    @include transition(background);
    
    &.-black {
      background-color: #0e0e0e;
    }
    &.-white {
      background-color: #fff;
      
      &.-half {
        ._background-block {
          width: 100%;
          height: 600px;
          background-color: #0e0e0e;
        }
      }
    }
    &.-grey {
      background-color: #f6f6f6;
    }
    ._background-block {
      position: absolute;
      z-index: 0;
      background-color: #fff;
      @include transition(background);
    }
    ._content-block {
      display: flex;
      position: relative;
      z-index: 10;
      height: 100%;
    }
  }
</style>
