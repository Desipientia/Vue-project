<template>
  <div class="qa e-inside-content-block">
    <vue-markdown class="e-markdown-block -default"
                  :source="qa"></vue-markdown>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'QA',
    computed: mapState('pages', ['qa']),
    methods: mapActions('pages', ['getQAPageData']),
    mounted() {
      this.getQAPageData();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped></style>
