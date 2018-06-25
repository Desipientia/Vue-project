export default {
  install: (Vue) => {
    const body = document.body;
    // TODO: Add automatic initial padding count if possible
    // TODO: Fix main content blocks
    const jumpingBlocks = [
      { id: 'header', initialPadding: 75 },
      { id: 'container', initialPadding: 0 },
    ];

    body.style.overflow = 'scroll';
    const currentWidth = body.clientWidth;
    body.style.overflow = 'hidden';
    const scrollBarWidth = body.clientWidth - currentWidth;
    body.style.overflow = 'auto';

    document.addEventListener('DOMContentLoaded', () => {
      jumpingBlocks.forEach((e) => {
        e.block = document.getElementById(e.id);
      });
      /* eslint-disable no-param-reassign */
      Vue.scrollJump.jumpingBlocks = jumpingBlocks;
      Vue.scrollJump.modalBlock = document.getElementById('modal');
      /* eslint-enable no-param-reassign */
      window.addEventListener('resize', Vue.scrollJump.resizeJumpingBlocks);
    });

    // eslint-disable-next-line no-param-reassign, no-multi-assign
    Vue.scrollJump = Vue.prototype.$scrollJump = {
      scrollBarWidth,
      jumpingBlocks: [],
      modalBlock: {},
      resizeJumpingBlocks(type) {
        const doc = document.documentElement;
        const plugin = Vue.scrollJump;

        if (type === 'modal-show') {
          // If scrollbar is visible
          plugin.modalBlock.style.paddingRight = `${plugin.scrollBarWidth}px`;
          if (doc.scrollHeight > doc.clientHeight) {
            plugin.jumpingBlocks.forEach((e) => {
              e.block.style.paddingRight = `${e.initialPadding + plugin.scrollBarWidth}px`;
            });
          }
          document.body.style.overflowY = 'hidden';
        } else {
          if (type === 'modal-hide') {
            document.body.style.overflowY = 'auto';
          // TODO: Add padding to modal on resize
          } else if (Vue.modal.isVisible) return;
          if (doc.scrollHeight > doc.clientHeight) {
            if (type === 'modal-hide') {
              plugin.modalBlock.style.paddingRight = null;
            }
            plugin.jumpingBlocks.forEach((e) => {
              e.block.style.paddingRight = null;
            });
          } else {
            plugin.jumpingBlocks.forEach((e) => {
              e.block.style.paddingRight = `${e.initialPadding + plugin.scrollBarWidth}px`;
            });
          }
        }
      },
    };
    Vue.mixin({
      updated() {
        Vue.scrollJump.resizeJumpingBlocks();
      },
    });
  },
};
