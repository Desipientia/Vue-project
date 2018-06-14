<template>
  <div class="progress-bar">
    <div class="_text-block"
         ref="textBlock"
         :style="textBlockStyle"
         v-if="label.length > 0">{{ label }}</div>
    <div class="_bar-line" ref="barLine">
      <div class="_bar-filler" ref="barFiller" :style="barFillerStyle"></div>
    </div>
  </div>
</template>

<!--suppress ReservedWordAsName -->
<script>
  export default {
    name: 'ProgressBar',
    data() {
      return {
        textOffset: null,
      };
    },
    props: {
      value: {
        default: 0,
      },
      max: {
        default: 100,
      },
      label: {
        type: String,
        default: '',
      },
    },
    computed: {
      barFillerStyle() {
        return { width: `${Math.min(((this.value / this.max) * 100).toFixed(), 100)}%` };
      },
      textBlockStyle() {
        switch (this.textOffset) {
          case 'default':
            return {
              transform: 'translateX(-50%)',
              'margin-left': this.barFillerStyle.width,
            };
          case 'none': return {};
          default: return { 'margin-left': `${this.textOffset}px` };
        }
      },
    },
    methods: {
      positionTextBlock() {
        if (!(this.$refs.textBlock && this.$refs.barFiller && this.$refs.barLine)) return;
        const textBlockWidth = this.$refs.textBlock.clientWidth;
        const barFillerWidth = this.$refs.barFiller.clientWidth;
        const barLineWidth = this.$refs.barLine.clientWidth;
        if (textBlockWidth / 2 > barFillerWidth) {
          this.textOffset = 'none';
        } else if (textBlockWidth / 2 >= barLineWidth - barFillerWidth) {
          this.textOffset = barLineWidth - textBlockWidth;
        } else {
          this.textOffset = 'default';
        }
      },
    },
    mounted() {
      this.positionTextBlock();
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .progress-bar {
    width: 100%;
    
    ._text-block {
      position: relative;
      display: inline-block;
      margin: 10px 0;
      padding: 5px 14px;
      border-radius: 4px;
      background-color: #3d3d3d;
      color: #fff;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 22px;
      text-align: center;
      white-space: nowrap;
  
      &:before {
        $width: 5px;
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        width: 0;
        height: 0;
        border-left: $width solid transparent;
        border-right: $width solid transparent;
        border-top: $width solid #3d3d3d;
      }
    }
    ._bar-filler {
      height: 100%;
      transition: all .5s ease;
    }
    &.-default {
      ._bar-line {
        height: 6px;
        border-radius: 3px;
        background-color: #ededed;
      }
      ._bar-filler {
        border-radius: 3px;
        background-color: #767676;
      }
    }
    &.-main {
      ._bar-line {
        height: 10px;
        border-radius: 5px;
        background-color: #3d3d3d;
      }
      ._bar-filler {
        border-radius: 5px;
        background-color: #f6f6f6;
      }
    }
  }
</style>
