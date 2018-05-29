<template>
  <div id="app">
    <page-header class="app-content"></page-header>
    <page-container class="app-content"></page-container>
    <page-footer class="app-content"></page-footer>
  </div>
</template>

<script>
  import PageHeader from './components/PageHeader';
  import PageFooter from './components/PageFooter';
  import PageContainer from './components/PageContainer';

  export default {
    components: {
      PageContainer,
      PageFooter,
      PageHeader,
    },
    name: 'App',
  };
/* eslint-disable */
</script>

<style lang="scss">
  html {
    overflow-x: hidden;
    box-sizing: border-box;
    color: #42423c;
    font-size: 16px;
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
    min-width: 240px;
    overflow-x: hidden;
  
    a:focus,
    button:focus {
      outline: none;
    }
  }
  .app-content {
    padding: 0 75px;
    @include transition(border, background .2s linear);
  }
</style>

<style lang="scss" src="./styles/elements.scss"></style>
