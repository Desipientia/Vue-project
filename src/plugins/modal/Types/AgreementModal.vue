<template>
  <form class="agreement-modal" @submit.prevent="$modal.accept(checks)">
    <vue-markdown class="m-markdown-block e-markdown-block -modal"
                  :source="data.head"></vue-markdown>
    <!-- eslint-disable max-len -->
    <div class="_agreement-block-wrapper">
      <div class="_agreement-block">
        <vue-markdown :source="data.body"></vue-markdown>
      </div>
    </div>
    <label class="e-checkbox" :key="q.pk" v-for="q in data.questions">
      <input class="_input" type="checkbox" :value="q.pk" v-model="checks"/>
      <span class="_label"><vue-markdown :source="q.head"></vue-markdown></span>
    </label>
    <p class="e-info-text"><vue-markdown :source="data.description"></vue-markdown></p>
    <!-- eslint-enable max-len -->
    <button class="e-button -black"
            type="submit"
            :disabled="$v.$invalid">Continue</button>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, minLength } from 'vuelidate/lib/validators';

  export default {
    name: 'AgreementModal',
    data() {
      return {
        checks: [],
      };
    },
    computed: {
      data() {
        return this.$modal.params().data;
      },
    },
    mixins: [validationMixin],
    validations() {
      return {
        checks: {
          required,
          lengthName: minLength(this.data.questions.length),
        },
      };
    },
    mounted() {
      this.$modal.validateAcceptFromInside(() => !this.$v.$invalid, () => this.checks);
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
      @include media(wide) {
        font-size: 18px;
      }
      ._updated-text {
        font-weight: 600;
      }
    }
  }
</style>
