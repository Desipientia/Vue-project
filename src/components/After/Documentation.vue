<template>
  <div class="after-documentation">
    <!-- TODO: Check out if Table of contents should be as links or not (can use radio then?) -->
    <div class="_table-of-contents-block">
      <p class="e-number-text -s"
         :class="{ '-black': currentParagraph === 'all' }"
         @click="currentParagraph = 'all'">One Pager</p>
      <p class="e-number-text -s"
         :class="{ '-black': currentParagraph === i }"
         :key="i"
         v-for="(d, i) in documentation"
         @click="currentParagraph = i">{{ d.head }}</p>
    </div>
    <div class="_content-block">
      <vue-markdown class="e-markdown-block -default"
                    :source="text"></vue-markdown>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  const VueMarkdown = () => import('vue-markdown');

  export default {
    name: 'Documentation',
    data() {
      return {
        currentParagraph: 0,
      };
    },
    computed: {
      text() {
        if (this.currentParagraph === 'all') {
          return this.documentation.reduce((textArray, e) => {
            textArray.push(e.body);
            return textArray;
          }, []).join('');
        }
        return this.documentation[this.currentParagraph]
          ? this.documentation[this.currentParagraph].body
          : '';
      },
      ...mapState('pages', ['documentation']),
    },
    components: { VueMarkdown },
    methods: mapActions('pages', ['getDocumentationPageData']),
    mounted() {
      this.getDocumentationPageData();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .after-documentation {
    display: flex;
    
    .e-header-text {
      margin: 0;
    }
    .e-number-text {
      margin-bottom: 16px;
      cursor: pointer;
      @include transition(text);
    }
    ._table-of-contents-block {
      min-width: 365px;
      padding: 70px 71px 70px 75px;
      background-color: #f6f6f6;
    }
    ._content-block {
      padding: 46px 50px 50px 40px;
    }
  }
</style>
