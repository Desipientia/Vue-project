<template>
  <header class="page-header" :class="background">
    <div class="e-transparent-content-block -row"
         :class="{ '-centered': $route.name === 'connect'}">
      <router-link class="_logo" :to="{ name: 'landing' }">
        <svg class="_logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 20">
          <g>
            <!-- eslint-disable  max-len -->
            <path d="M13 0h14v5H13V0zm-1.5 0v5H10a5 5 0 1 0 0 10h12V6.5h5V20H10C4.477 20 0 15.523 0 10S4.477 0 10 0h1.5z"/>
            <path d="M27 20H13v-5h14v5zm1.5 0v-5H30a5 5 0 0 0 0-10H18v8.5h-5V0h17c5.523 0 10 4.477 10 10s-4.477 10-10 10h-1.5z"/>
            <!-- eslint-enable  max-len -->
          </g>
        </svg>
        <span class="_logo-text">CryptoID</span>
      </router-link>
      <transition name="e-fade">
        <ul class="_link-menu" v-if="isAuthorized">
          <li v-for="l in links" :key="l.name">
            <router-link class="_link"
                         active-class="-active"
                         :to="{ name: l.name }">{{ l.text }}</router-link>
          </li>
        </ul>
        <!-- <div class="e-hide-when-mobile" v-else-if="$route.name === 'landing'">
           <div class="_share-link-block">
            <span class="_share-text">Share on</span>
            <svg-icon class="_share-link" name="twitter"></svg-icon>
            <svg-icon class="_share-link" name="facebook"></svg-icon>
            <svg-icon class="_share-link" name="linkedin"></svg-icon>
            <svg-icon class="_share-link" name="telegram"></svg-icon>
          </div>
        </div> -->
      </transition>
      <transition name="e-fade">
        <router-link class="e-button -white -m"
                     :to="{ name: 'connect' }"
                     v-if="$route.name === 'landing' || $route.name === 'qa'">
          <span class="e-hide-when-mobile">Get</span> full access
        </router-link>
      </transition>
      <transition name="e-fade">
        <button class="_sign-out-button" v-if="isAuthorized" @click="logoutAndGo">
          <span class="_sign-out-text">Sign Out</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
            <!-- eslint-disable  max-len -->
            <path class="_sign-out-svg" fill-rule="evenodd" d="M13 5h-2V2H2v14h9v-3h2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3zm3.93 5.008H8a1 1 0 1 1 0-2h8.937l-1.705-2.383a.999.999 0 0 1 .157-1.405.999.999 0 0 1 1.405.155l3 4.004a.996.996 0 0 1 0 1.25l-3 4.003a1 1 0 1 1-1.562-1.251l1.698-2.373z"/>
            <!-- eslint-enable  max-len -->
          </svg>
        </button>
      </transition>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  const SvgIcon = () => import(/* webpackChunkName: "svg-icon" */ './Elements/SvgIcon');

  export default {
    name: 'PageHeader',
    data() {
      return {
        links: [
          { text: 'Main', name: 'main' },
          { text: 'Get tokens', name: 'get-tokens' },
          // { text: 'Earn tokens', name: 'referrals' },
          { text: 'Documentation', name: 'documentation' },
        ],
      };
    },
    computed: {
      background() {
        switch (this.$route.name) {
          case 'landing':
          case 'main':
            return '-black';
          case 'documentation':
            return '-white -docs';
          default:
            return '-white';
        }
      },
      ...mapGetters('auth', ['isAuthorized']),
    },
    components: { SvgIcon },
    methods: {
      logoutAndGo() {
        this.logout();
        this.$router.push({ name: 'landing' });
      },
      ...mapActions('auth', ['logout']),
    },
  };
  /* eslint-disable */
</script>

<style lang="scss">
  .page-header {
    width: 100%;
    height: 80px;
    
    @include media(wide) {
      height: 100px;
    }
    &.-black {
      background-color: #0e0e0e;
      border-bottom: solid 1px rgba(57, 57, 57, 0.51);
  
      ._logo-text {
        color: #fff;
      }
      ._logo-svg {
        fill: #fff;
      }
      ._sign-out-text {
        color: #767676;
      }
      ._sign-out-svg {
        fill: #767676;
      }
      ._link {
        &.-active {
          border-color: #fff;
          color: #fff;
        }
        &:not(.-active) {
          color: #767676;
        }
      }
      ._share-link {
        fill: #767676;
        
        &:hover {
          fill: #fff;
        }
      }
    }
    &.-white {
      background-color: #fff;
      border-bottom: solid 1px rgba(188, 188, 188, 0.51);
  
      .e-button {
        color: #fff;
        background-color: #0e0e0e;
      }
      ._logo-text {
        color: #0e0e0e;
      }
      ._logo-svg {
        fill: #0e0e0e;
      }
      ._sign-out-text {
        color: #bcbcbc;
      }
      ._sign-out-svg {
        fill: #bcbcbc;
      }
      ._link {
        &.-active {
          border-color: #000;
          color: #0e0e0e;
        }
        &:not(.-active) {
          color: #bcbcbc;
        }
      }
    }
    &.-docs {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }
    .e-button {
      @include transition(text, background);
    }
    .e-transparent-content-block {
      &.-centered {
        @include media(mobile) {
          justify-content: center;
        }
      }
    }
    ._logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 125px;
      text-decoration: none;
      @include media(wide) {
        width: 160px;
      }
    }
    ._logo-text {
      font-family: "Cabin", sans-serif;
      font-size: 19px;
      @include media(wide) {
        font-size: 23px;
      }
    }
    ._logo-svg {
      height: 21px;
      @include media(wide) {
        height: 30px;
      }
    }
    ._link-menu {
      display: flex;
      justify-content: space-between;
      padding: 0;
      width: 100%;
      max-width: 440px;
      min-width: 400px;
      list-style: none;
    }
    ._link {
      display: block;
      padding: 30px 0 25px;
      border-bottom: solid 4px transparent;
      font-family: "Open Sans", sans-serif;
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      text-decoration: none;
      @include transition(text, border);
      @include media(wide) {
        padding: 37px 0 32px;
        font-size: 20px;
      }
    }
    ._share-link-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ._share-text {
      color: #767676;
      font-family: "Open Sans", sans-serif;
      font-weight: 700;
      font-size: 14px;
      @include media(wide) {
        font-size: 18px;
      }
    }
    ._share-link {
      margin-left: 20px;
      cursor: pointer;
      
      svg {
        height: 20px;
        width: auto;
        @include media(wide) {
          height: 30px;
        }
      }
    }
    ._sign-out-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      @include media(wide) {
        width: 130px;
      }
    }
    ._sign-out-text {
      font-family: "Open Sans", sans-serif;
      font-weight: 700;
      font-size: 14px;
      @include media(wide) {
        font-size: 18px;
      }
    }
    ._logo-text,
    ._sign-out-text {
      @include transition(text);
    }
    ._logo-svg,
    ._sign-out-svg,
    ._share-link {
      @include transition(svg);
    }
  }
</style>
