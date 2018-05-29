<template>
  <transition name="fade" mode="in-out">
    <div class="loader" v-show="isActive">
      <div class="_body">
        <div class="_rect -first"></div>
        <div class="l_rect -second"></div>
        <div class="l_rect -third"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'LoaderComponent',
    data() {
      return {
        isActive: false,
      };
    },
    methods: {
      show() {
        this.isActive = true;
      },
      hide() {
        this.isActive = false;
      },
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .loader {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3000;
    background-color: rgba(0, 0, 0, .45);
    
    ._body {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    ._rect {
      width: 1.5rem;
      height: 3rem;
      display: inline-block;
      animation: loader_move 2s infinite ease-in-out both;
      
      &.-first {
        animation-delay: -.5s;
        background-color: #fff;
      }
      &.-second {
        animation-delay: -0.25s;
        background-color: #4fb858;
      }
      &.-third {
        background-color: #0e1d0e;
      }
    }
  }
  @keyframes loader_move {
    0%, 80%, 100% {
      transform: scale(0);
    } 40% {
      transform: scale(1.0);
    }
  }
</style>


