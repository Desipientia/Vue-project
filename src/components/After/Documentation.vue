<template>
  <div class="after-documentation e-transparent-content-block">
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
      <transition name="e-fade" mode="out-in">
        <vue-markdown class="e-markdown-block -default"
                      :key="currentParagraph"
                      :source="text"></vue-markdown>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Documentation',
    computed: {
      text() {
        if (this.currentParagraph === 'all') {
          return this.documentation.reduce((textArray, e) => {
            textArray.push(e.body);
            return textArray;
          }, []).join('\n');
        }
        return this.documentation[this.currentParagraph]
          ? this.documentation[this.currentParagraph].body
          : '';
      },
      linksArray() {
        if (!this.documentation) return [];
        return this.documentation.map(e => e.head.toLowerCase().replace(/( & )|( )|&/g, '_'));
      },
      currentParagraph: {
        get() {
          const index = this.linksArray.indexOf(this.name);
          return index === -1 ? 'all' : index;
        },
        set(value) {
          if (value === 'all') {
            this.$router.replace({ name: 'documentation' });
          } else {
            this.$router.replace({
              name: 'documentation',
              query: { name: this.linksArray[value] },
            });
          }
        },
      },
      ...mapState('pages', ['documentation']),
    },
    props: ['name'],
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
      position: fixed;
      top: 80px;
      bottom: 0;
      overflow-y: auto;
      width: 365px;
      padding: 70px 71px 70px 75px;
      background-color: #f6f6f6;
      @include media(wide) {
        width: 410px;
      }
    }
    ._content-block {
      padding: 46px 50px 210px 405px;
      @include media(wide) {
        padding: 80px 60px 210px 455px;
      }
    }
  }
</style>
