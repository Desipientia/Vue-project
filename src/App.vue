<template>
  <div id="app" :class="widthClass">
    <page-header class="app-content" id="header"></page-header>
    <page-container id="container"></page-container>
    <page-footer class="app-content"></page-footer>
  </div>
</template>

<script>
  import PageHeader from './components/PageHeader';
  import PageFooter from './components/PageFooter';
  import PageContainer from './components/PageContainer';

  export default {
    name: 'App',
    computed: {
      widthClass() {
        if (this.$route.name === 'landing'
          || this.$route.name === 'connect'
          || this.$route.name === 'connect-airdrop'
          || this.$route.name === 'qa') {
            return '';
          }
        return 'min-width-block';
      },
    },
    components: {
      PageContainer,
      PageFooter,
      PageHeader,
    },
    metaInfo: {
      title: 'CryptoID',
      titleTemplate: '%s | CryptoID',
    },
  };
/* eslint-disable */
</script>

<style lang="scss">
  html {
    min-width: 270px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    box-sizing: inherit;
  }
  body {
    position: relative;
    margin: 0;
    width: 100%;
  
    a:focus,
    button:focus {
      outline: none;
    }
  }
  #app {
    display: flex;
    flex-direction: column;
    min-height: 120vh;
  }
  .app-content {
    padding: 0 75px;
    @include transition(border, background);
    @include media(mobile) {
      padding: 0 10px;
    }
  }
  .min-width-block {
    min-width: 1000px;
  }
  .dropdown-item {
    background-color: #fff;
  }
</style>

<style lang="scss" src="./styles/elements.scss"></style>
