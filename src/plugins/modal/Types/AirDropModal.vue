<template>
    <form class="airdrop" @submit.prevent="$modal.hide">
      <vue-markdown class="m-header-promo-text"
                :source="headString"></vue-markdown>
      <vue-markdown class="e-markdown-block -modal m-text-modal -m"
                :source="bodyString"></vue-markdown>
     <div>
      <input class="e-input -s m-referal-link"
        type="text"
        title="linkInput"
        ref="linkInput"
        v-model="referralLink"
        @keydown.prevent=""/>
      <div class="e-button -grey m-copy-button" @click="copyLink">
        <svg xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="12.5"
              v-show="copyButtonText === 'Copied'">
          <g stroke="#3ab94a" stroke-width="3">
            <line x1="1" y1="6" x2="7" y2="11"></line>
            <line x1="5" y1="11" x2="14" y2="1"></line>
          </g>
        </svg>
        {{ copyButtonText }}
      </div>
     </div>
      <vue-markdown class="e-markdown-block m-text-modal -s"
                    :source="$modal.params().data.page.earn_token.body"></vue-markdown>
    </form>
</template>

<script>
  export default {
    name: 'AirDropModal',
    data() {
      return {
        copyButtonText: 'Copy',
      };
    },
    computed: {
      referralLink() {
        const referalNumber = this.$modal.params().data.user.referal_number;
        return `${window.location.host}/?r=${referalNumber}`;
      },
      headString() {
        const promo = this.$modal.params().data.promo;
        let head = this.$modal.params().data.page.head.body;
        Object.keys(promo).forEach((key) => {
          head = head.replace(`{${key}}`, promo[key]);
        });
        return head;
      },
      bodyString() {
        const promo = this.$modal.params().data.promo;
        let body = this.$modal.params().data.page.main_context.body;
        Object.keys(promo).forEach((key) => {
          body = body.replace(`{${key}}`, promo[key]);
        });
        return body;
      },
    },
    methods: {
      copyLink() {
        this.$refs.linkInput.select();
        document.execCommand('copy');
        this.copyButtonText = 'Copied';
        setTimeout(() => { this.copyButtonText = 'Copy'; }, 5000);
      },
    },
  };
</script>
