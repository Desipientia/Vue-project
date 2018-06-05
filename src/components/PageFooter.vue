<template>
  <footer class="page-footer" :class="background">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="15" viewBox="0 0 40 20">
        <g class="_logo-svg">
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
      <svg-icon class="_follow-link" name="linked-in"></svg-icon>
      <svg-icon class="_follow-link" name="telegram"></svg-icon>
      <svg-icon class="_follow-link" name="youtube"></svg-icon>
    </div>
  </footer>
</template>

<script>
  const SvgIcon = () => import('./Elements/SvgIcon');

  export default {
    name: 'PageFooter',
    computed: {
      background() {
        return this.$route.name === 'landing' ? '-black' : '-white';
      },
    },
    components: { SvgIcon },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .page-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 160px;
    
    &.-black {
      background-color: #000;
      border-top: solid 1px rgba(57, 57, 57, 0.51);
  
      ._text {
        color: #bcbcbc;
      }
      ._logo-svg,
      ._follow-link {
        fill: #fff;
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
      ._follow-link {
        fill: #bcbcbc;
  
        &:hover {
          fill: #0e0e0e;
        }
      }
    }
    ._logo-svg,
    ._follow-link {
      @include transition(svg);
    }
    ._text {
      margin: 0;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      @include transition(text);
    }
    ._follow-link-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 300px;
      min-width: 240px;
    }
    ._follow-text {
      color: #bcbcbc;
      font-family: "Open Sans", sans-serif;
      font-weight: 700;
      font-size: 14px;
    }
  }
</style>
