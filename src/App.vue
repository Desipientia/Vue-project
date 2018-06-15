<template>
  <div id="app">
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
    components: {
      PageContainer,
      PageFooter,
      PageHeader,
    },
  };
/* eslint-disable */
</script>

<style lang="scss">
  html {
    min-width: 1350px;
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
    min-height: 100vh;
  }
  .app-content {
    padding: 0 75px;
    @include transition(border, background);
  }
</style>

<style lang="scss" src="./styles/elements.scss"></style>
