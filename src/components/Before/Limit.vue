<template>
  <div class="before-limit e-inside-content-block">
    <vue-markdown class="e-markdown-block -default" :source="limitString"></vue-markdown>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Limit',
    computed: {
      limitString() {
        let limit = this.limit;
        Object.keys(this.limitVars).forEach((key) => {
          limit = limit.replace(`\${${key}}`, this.limitVars[key]);
        });
        return limit;
      },
      ...mapState('pages', ['limit']),
      ...mapState('project', {
        limitVars: s => s.limit,
      }),
    },
    metaInfo: {
      title: 'You need to increase your limit',
    },
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
