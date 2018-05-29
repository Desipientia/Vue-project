<template>
  <div id="app">
    <page-header></page-header>
    <page-container></page-container>
    <page-footer></page-footer>
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
</style>

<style lang="scss" src="./styles/elements.scss"></style>
