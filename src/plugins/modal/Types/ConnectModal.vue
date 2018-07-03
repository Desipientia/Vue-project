<template>
  <div class="before-connect e-inside-content-block">

    <vue-markdown class="e-markdown-block -default e-mobile-only"
                  :source="$modal.params().data.page.main_content_mobile.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default e-hide-when-mobile"
                  :source="$modal.params().data.page.main_content.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default -connect e-mobile-only"
                  :source="$modal.params().data.page.if_not_installed_mobile.body"></vue-markdown>
    <vue-markdown class="e-markdown-block -default -connect e-hide-when-mobile"
                  :source="$modal.params().data.page.if_not_installed.body"></vue-markdown>
    <div class="_qr-code-block e-hide-when-mobile"
         v-if="$modal.params().data.finishQrCode !== null">
      <qrcode :options="{ size: 160 }" v-model="$modal.params().data.finishQrCode"></qrcode>
    </div>
    <vue-markdown class="e-markdown-block -default"
                  :source="$modal.params().data.page.support.body"></vue-markdown>
  </div>
</template>

<script>
  const VueQrcode = () => import('@xkeshi/vue-qrcode');

  export default {
    name: 'Connect',
    components: { qrcode: VueQrcode },
    metaInfo: {
      title: 'Connect',
    },

  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .before-connect {
    ._qr-code-block {
      margin: 20px 0 30px;
    }
  }
</style>
