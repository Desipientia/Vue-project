<template>
  <div class="before-limit e-inside-content-block">
    <vue-markdown class="e-markdown-block -default" :source="limitString"></vue-markdown>
    <!--TODO: Find out if it has to be centered, or moved to left like in model -->
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  const VueMarkdown = () => import('vue-markdown');

  export default {
    name: 'Limit',
    computed: {
      ...mapState('pages', {
        limitString: (state) => {
          const limit = state.limit;

          Object.keys(this.limit || {}).forEach((key) => {
            limit.replace(`\${${key}}`, this.limit[key]);
          });
          return limit;
        },
      }),
      ...mapState('project', ['limit']),
    },
    components: { VueMarkdown },
    methods: {
      ...mapActions('pages', ['getLimitPageData']),
      ...mapActions('project', ['getLimitData']),
    },
    mounted() {
      this.getLimitPageData();
      this.getLimitData();
    },
  };
</script>
