<template>
  <transition name="m-fade">
    <div class="modal"
         id="modal"
         ref="modal"
         tabindex="1"
         v-show="visible"
         @keydown.enter="accept"
         @keydown.esc.prevent="hide"
         @click.self="hide">
      <div class="m-window" :class="type">
        <button class="m-close-button" @click="hide">
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#bcbcbc" stroke-width="1.5">
              <line x1="0" y1="20" x2="20" y2="0"></line>
              <line x1="0" y1="0" x2="20" y2="20"></line>
            </g>
          </svg>
        </button>
        <transition name="m-fade" mode="out-in">
          <component class="m-content"
                     :is="type"
                     :key="type"
                     v-if="visible"></component>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
  const BuyTokensModal = () => import('./Types/BuyTokensModal');
  const InfoModal = () => import('./Types/InfoModal');
  const AgreementModal = () => import('./Types/AgreementModal');
  const WalletModal = () => import('./Types/WalletModal');
  const ImageViewModal = () => import('./Types/ImageViewModal');
  const AirDropModal = () => import('./Types/AirDropModal');
  const LoginModal = () => import('./Types/LoginModal');
  const ConnectModal = () => import('./Types/ConnectModal');

  export default {

    name: 'ModalComponent',
    data() {
      return {
        visible: false,
        params: {},
        type: null,
        onHide: null,
        onAccept: null,
      };
    },
    components: {
      buy: BuyTokensModal,
      info: InfoModal,
      agreement: AgreementModal,
      wallet: WalletModal,
      airdrop: AirDropModal,
      login: LoginModal,
      connect: ConnectModal,
      'image-view': ImageViewModal,
    },
    methods: {
      show(type, params, onHide, onAccept) {
        this.type = type;
        this.params = params;
        this.onHide = onHide;
        this.onAccept = onAccept;
        this.visible = true;
        this.$modal.isVisible = true;
        this.$scrollJump.resizeJumpingBlocks('modal-show');
        setTimeout(() => {
          this.$refs.modal.focus();
        }, 100);
      },
      hide(silent) {
        if (this.onHide && !(silent === 'silent')) this.onHide();
        this.visible = false;
        this.$modal.isVisible = false;
        this.params = {};
        this.returnFocus();
        this.$scrollJump.resizeJumpingBlocks('modal-hide');
      },
      accept() {
        if (this.onAccept) {
          if (this.onAccept()) this.hide('silent');
        } else if (this.type === 'message') {
          this.hide();
        }
      },
      returnFocus() {
        if (this.$modal.focusOn) {
          setTimeout(() => {
            this.$modal.focusOn.focus();
            this.$modal.focusOn.select();
          }, 100);
        }
      },
      addAcceptValidation(validation, data) {
        const accept = this.onAccept;
        this.onAccept = (d = data()) => {
          const v = validation();
          if (v) accept(d);
          return v;
        };
      },
    },
  };
</script>

<style lang="scss" src="../../styles/modal.scss"></style>
