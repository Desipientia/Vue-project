<template>
  <form class="agreement-modal" @submit.prevent="$modal.accept()">
    <p class="m-header-text">CIDX Token Purchase Agreement</p>
    <!-- eslint-disable max-len -->
    <p class="e-base-text">Please read the CIDX Token Purchase Agreement, Terms of use and cryptoid.ch technical white paper and confirm the facts in the checkboxes below in order to proceed.</p>
    <div class="_agreement-block-wrapper">
      <div class="_agreement-block">
        <p class="_updated-text">Last Updated: May 24th, 2018</p>
        <p>This privacy policy sets out how CryptoID uses and protects any information that you give CryptoID when you use this website and the mobile applications for iOS and Android. CryptoID is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.Coined may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. <br/><br/> This privacy policy sets out how CryptoID uses and protects any information that you give CryptoID when you use this website and the mobile applications for iOS and Android. CryptoID is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.Coined may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. </p>
      </div>
    </div>
    <label class="e-checkbox">
      <input class="_input" type="checkbox" v-model="checks.notUS"/>
      <span class="_label">Check here to confirm that you are NOT a U.S. citizen, resident of entity (each a "U.S. Person") nor are you purchasing CIDX Tokens or signing on behalf of a U.S. Person.</span>
    </label>
    <label class="e-checkbox">
      <input class="_input" type="checkbox" v-model="checks.notChina"/>
      <span class="_label">Check here to confirm that you are NOT a citizen of or resident of the People's Republic of China or an entity formed under the laws of the People's Republic of China (each a "Chinese Person") nor are you purchasing CIDX Tokens or signing on behalf a Chines Person.</span>
    </label>
    <label class="e-checkbox">
      <input class="_input" type="checkbox" v-model="checks.agreement"/>
      <span class="_label">Check here to confirm that you have read, understand and agree to the terms of the CIDX Token Purchase Agreement.</span>
    </label>
    <label class="e-checkbox">
      <input class="_input" type="checkbox" v-model="checks.terms"/>
      <span class="_label">Check here to confirm that you have read, understand and agree to the terms of the Terms of Use.</span>
    </label>
    <label class="e-checkbox">
      <input class="_input" type="checkbox" v-model="checks.whitepaper"/>
      <span class="_label">Check here to indicate that you have read the Whitepaper.</span>
    </label>
    <p class="e-info-text">Please scroll down fully and check all boxes to proceed</p>
    <!-- eslint-enable max-len -->
    <button class="e-button -black"
            type="submit"
            :disabled="$v.$invalid">Continue</button>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { sameAs } from 'vuelidate/lib/validators';

  const checked = sameAs(() => true);

  export default {
    name: 'AgreementModal',
    data() {
      return {
        checks: {
          notUS: false,
          notChina: false,
          agreement: false,
          terms: false,
          whitepaper: false,
        },
      };
    },
    mixins: [validationMixin],
    validations() {
      return {
        checks: {
          notUS: { checked },
          notChina: { checked },
          agreement: { checked },
          terms: { checked },
          whitepaper: { checked },
        },
      };
    },
    mounted() {
      this.$modal.validateAcceptFromInside(() => !this.$v.$invalid);
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .agreement-modal {
    .e-checkbox {
      width: 48%;
      vertical-align: top;
      margin: 10px 0;
      
      &:nth-child(even) {
        margin-right: 3%;
      }
    }
    .e-button {
      display: block;
      width: 100%;
    }
    ._agreement-block-wrapper {
      position: relative;
      height: 250px;
      margin: 24px 0;
      background-color: #f6f6f6;
  
      &:before,
      &:after {
        content: '';
        position: absolute;
        left: 0;
        width: 98%;
        height: 25px;
        background: #f6f6f6;
      }
      &:before {
        top: 0;
        background: linear-gradient(to top, rgba(246, 246, 246, 0), rgba(246, 246, 246, 1));
      }
      &:after {
        bottom: 0;
        background: linear-gradient(to bottom, rgba(246, 246, 246, 0), rgba(246, 246, 246, 1));
      }
    }
    ._agreement-block {
      height: 250px;
      line-height: 1.43;
      padding: 14px 20px 20px;
      overflow-y: auto;
      background-color: #f6f6f6;
      color: #767676;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      
      ._updated-text {
        font-weight: 600;
      }
    }
  }
</style>
