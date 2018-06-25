<template>
  <footer class="page-footer" :class="background">
    <div class="e-transparent-content-block -row">
      <div>
        <svg class="_logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 20">
          <g>
            <!-- eslint-disable  max-len -->
            <path d="M13 0h14v5H13V0zm-1.5 0v5H10a5 5 0 1 0 0 10h12V6.5h5V20H10C4.477 20 0 15.523 0 10S4.477 0 10 0h1.5z"/>
            <path d="M27 20H13v-5h14v5zm1.5 0v-5H30a5 5 0 0 0 0-10H18v8.5h-5V0h17c5.523 0 10 4.477 10 10s-4.477 10-10 10h-1.5z"/>
            <!-- eslint-enable  max-len -->
          </g>
        </svg>
        <p class="_text">© 2018 CID. All rights reserved.</p>
      </div>
      <div class="_follow-link-block">
        <span class="_follow-text">Follow us on</span>
        <svg-icon class="_follow-link" name="twitter"></svg-icon>
        <svg-icon class="_follow-link" name="facebook"></svg-icon>
        <svg-icon class="_follow-link" name="linkedin"></svg-icon>
        <svg-icon class="_follow-link" name="telegram"></svg-icon>
        <svg-icon class="_follow-link" name="youtube"></svg-icon>
      </div>
    </div>
  </footer>
</template>

<script>
  const SvgIcon = () => import(/* webpackChunkName: "svg-icon" */ './Elements/SvgIcon');

  export default {
    name: 'PageFooter',
    computed: {
      background() {
        switch (this.$route.name) {
          case 'landing':
            return '-black';
          case 'documentation':
            return '-white -docs';
          default:
            return '-white';
        }
      },
    },
    components: { SvgIcon },
  };
  /* eslint-disable */
</script>

<style lang="scss">
  .page-footer {
    width: 100%;
    height: 160px;
    @include media(mobile) {
      height: 250px;
    }
    &.-black {
      background-color: #0e0e0e;
      border-top: solid 1px rgba(57, 57, 57, 0.51);
  
      ._text {
        color: #bcbcbc;
      }
      ._logo-svg {
        fill: #fff;
      }
      ._follow-text {
        color: #767676;
      }
      ._follow-link {
        fill: #767676;
    
        &:hover {
          fill: #fff;
        }
      }
    }
    &.-white {
      background-color: #fff;
      border-top: solid 1px rgba(188, 188, 188, 0.51);
  
      ._text {
        color: #767676;
      }
      ._logo-svg {
        fill: #0e0e0e;
      }
      ._follow-text {
        color: #bcbcbc;
      }
      ._follow-link {
        fill: #bcbcbc;
  
        &:hover {
          fill: #0e0e0e;
        }
      }
    }
    &.-docs {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1000;
    }
    .e-transparent-content-block {
      @include media(mobile) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-top: 45px;
      }
    }
    ._logo-svg,
    ._follow-link {
      @include transition(svg);
    }
    ._logo-svg {
      height: 15px;
      @include media(wide) {
        height: 24px;
      }
    }
    ._text {
      margin: 0;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      @include transition(text);
      @include media(wide) {
        font-size: 18px;
      }
    }
    ._follow-link-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 300px;
      min-width: 240px;
      @include media(mobile) {
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 40px;
      }
      @include media(wide) {
        max-width: 400px;
      }
    }
    ._follow-link {
      @include media(mobile) {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
      svg {
        @include media(wide) {
          width: auto;
          height: 30px;
        }
      }
    }
    ._follow-text {
      font-family: "Open Sans", sans-serif;
      font-weight: 700;
      font-size: 14px;
      @include media(mobile) {
        width: 100%;
        margin-bottom: 15px;
      }
      @include media(wide) {
        font-size: 18px;
      }
    }
  }
</style>
