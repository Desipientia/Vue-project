<template>
  <div class="pie-chart">
    <div class="_legend">
      <p class="_caption">{{ caption }}</p>
      <p class="_text" :key="i" v-for="(d, i) in this.data">
        <span class="_dot" :style="{ backgroundColor: colorArray[i] }"></span>
        <b>{{ d.value }}%</b> {{ d.title }}
      </p>
    </div>
    <svg class="_pie" ref="pie">
      <circle r="35.5%" cx="50%" cy="50%"/>
      <circle r="35%"
              cx="50%"
              cy="50%"
              :key="i"
              :style="{
                strokeDasharray: `${d.relativeSize} ${circleLength}`,
                strokeDashoffset: d.offset,
                stroke: colorArray[i],
              }"
              v-for="(d, i) in dataObjects"/>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'PieChart',
    data() {
      return {
        circleLength: 714.9741600374101,
        hasMounted: false,
        startingColor: '#5b5b5b',
      };
    },
    computed: {
      colorArray() {
        const array = [];
        for (let i = 0, l = this.data.length; i < l; i += 1) {
          array.push(this.colorLuminance(this.startingColor, (i * this.colorStep) / 100));
        }
        return array;
      },
      colorStep() {
        return (100 / this.data.length) + 10;
      },
      dataTotal() {
        return this.data.reduce((previous, current) => previous + current.value, 0);
      },
      dataObjects() {
        let startingPoint = 0;
        return this.data.map((item) => {
          const relativeSize = ((item.value / this.dataTotal) * this.circleLength);
          const dataObject = {
            relativeSize: this.hasMounted ? relativeSize : 0,
            offset: -startingPoint,
          };
          startingPoint += relativeSize;
          return dataObject;
        });
      },
    },
    props: ['data', 'caption'],
    methods: {
      colorLuminance(hex, lum = 0) {
        let validHex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (validHex.length < 6) {
          validHex = validHex[0] + validHex[0] + validHex[1] + validHex[1]
            + validHex[2] + validHex[2];
        }
        let rgb = '#';
        let c;
        for (let i = 0; i < 3; i += 1) {
          c = parseInt(validHex.substr(i * 2, 2), 16);
          c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
          rgb += (`00${c}`).substr(c.length);
        }
        return rgb;
      },
    },
    mounted() {
      setTimeout(() => {
        this.circleLength = this.$refs.pie.firstChild.getBoundingClientRect().width * Math.PI;
        this.hasMounted = true;
      }, 100);
    },
  };
  /* eslint-disable */
</script>

<style lang="scss" scoped>
  .pie-chart {
    display: flex;
    justify-content: space-between;
    
    ._pie {
      width: 40%;
      
      circle {
        fill: none;
        stroke-width: 40;
        transition: stroke-dasharray 0.3s ease-in-out, stroke-dashoffset 0.3s ease-in-out;
      }
    }
    ._legend {
      width: 50%;
    }
    ._caption {
      color: #0e0e0e;
      font-family: "Cabin", sans-serif;
      font-weight: 600;
      font-size: 18px;
    }
    ._text {
      margin: 0;
      line-height: 2.5;
      color: #767676;
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
      
      b {
        margin-right: 10px;
      }
    }
    ._dot {
      display: inline-block;
      vertical-align: middle;
      width: 15px;
      height: 15px;
      margin-right: 10px;
      border-radius: 100%;
    }
  }
</style>
