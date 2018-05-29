<template>
  <transition name="m-fade">
    <div class="modal"
         ref="modal"
         tabindex="1"
         v-show="visible"
         @keydown.enter="accept()"
         @keydown.esc.prevent="hide()"
         @click.self="hide()">
      <div class="m-window" :class="type">
        <button class="m-close-button" @click="hide">✕</button>
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
    },
    methods: {
      show(type, params, onHide, onAccept) {
        this.type = type;
        this.params = params;
        this.onHide = onHide;
        this.onAccept = onAccept;
        this.visible = true;
        setTimeout(() => {
          this.$refs.modal.focus();
        }, 100);
        document.body.style.overflowY = 'hidden';
      },
      hide(silent) {
        if (this.onHide && !silent) this.onHide();
        this.visible = false;
        this.params = {};
        this.returnFocus();
        document.body.style.overflowY = 'auto';
      },
      accept() {
        if (this.onAccept) {
          this.onAccept();
        } else if (this.type !== 'message') {
          return;
        } else {
          this.hide();
        }
        this.hide(true);
      },
      returnFocus() {
        if (this.$modal.focusOn) {
          setTimeout(() => {
            this.$modal.focusOn.focus();
            this.$modal.focusOn.select();
          }, 100);
        }
      },
    },
  };
</script>

<style lang="scss" src="../../styles/modal.scss"></style>
