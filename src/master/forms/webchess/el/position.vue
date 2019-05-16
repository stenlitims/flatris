<template>
  <div class="f-item" id="position">
    <h4 class="text-center">ПОЛОЖЕНИЕ КНОПКИ "ВЫБРАТЬ КВАРТИРУ"</h4>

    <div class="pos">
      <svg viewBox="0 0 748 499" id="key">
        <path
          class="st0"
          d="M728,14H20c-2.2,0-4,1.8-4,4v463c0,2.2,1.8,4,4,4h708c2.2,0,4-1.8,4-4V18C732,15.8,730.2,14,728,14z"
        ></path>
        <path class="st1" d="M728,14H20c-2.2,0-4,1.8-4,4v49h716V18C732,15.8,730.2,14,728,14z"></path>
        <rect
          x="32"
          y="80"
          class="st0 kv"
          :class="{'active': data == 'top-left'}"
          @click="setPos('top-left')"
          width="216"
          height="187"
        ></rect>
        <rect
          x="266"
          y="80"
          class="st0 kv"
          :class="{'active': data == 'top-center'}"
          @click="setPos('top-center')"
          width="216"
          height="187"
        ></rect>
        <rect
          x="32"
          y="286"
          class="st0 kv"
          :class="{'active': data == 'bottom-left'}"
          @click="setPos('bottom-left')"
          width="216"
          height="187"
        ></rect>
        <rect
          x="266"
          y="286"
          class="st0 kv"
          :class="{'active': data == 'bottom-center'}"
          @click="setPos('bottom-center')"
          width="216"
          height="187"
        ></rect>
        <rect
          x="500"
          y="286"
          class="st0 kv"
          :class="{'active': data == 'bottom-right'}"
          @click="setPos('bottom-right')"
          width="216"
          height="187"
        ></rect>
        <rect
          x="500"
          y="80"
          class="st0 kv"
          :class="{'active': data == 'top-right'}"
          @click="setPos('top-right')"
          width="216"
          height="187"
        ></rect>
        <g>
          <polyline class="st3" points="42,37 37,42 49,42    "></polyline>
          <polyline class="st3" points="42,47 37,42 49,42    "></polyline>
        </g>
        <g>
          <polyline class="st3" points="74,37 79,42 67,42    "></polyline>
          <polyline class="st3" points="74,47 79,42 67,42    "></polyline>
        </g>
        <g>
          <path
            class="st3"
            d="M109.8,40.7c-0.6-2.1-2.5-3.7-4.8-3.7c-2.8,0-5,2.2-5,5s2.2,5,5,5c2,0,3.8-1.2,4.5-2.9"
          ></path>
          <polyline class="st3" points="107.1,40.7 110.8,41.4 111.4,37.7    "></polyline>
        </g>
        <g>
          <line class="st3" x1="701" y1="36" x2="711" y2="46"></line>
          <line class="st3" x1="711" y1="36" x2="701" y2="46"></line>
        </g>
        <path
          class="st4"
          d="M676,54H134c-2.8,0-5-2.3-5-5V34c0-2.8,2.3-5,5-5h542c2.8,0,5,2.3,5,5v15C681,51.8,678.8,54,676,54z"
        ></path>
        <path
          class="st5"
          d="M372.9,186l-9.6,17.4c-0.2,0.4-0.1,0.8,0.2,1.1l0,0c0.3,0.3,0.7,0.4,1.1,0.2l2.2-1.1c0.6-0.3,1.2,0.1,1.3,0.7    l4.8,63.7c0,0.6,0.5,1,1.1,1l0,0c0.6,0,1-0.4,1.1-1l4.8-63.7c0-0.6,0.7-1,1.3-0.7l2.2,1.1c0.4,0.2,0.8,0.1,1.1-0.2l0,0    c0.3-0.3,0.4-0.8,0.2-1.1l-9.6-17.4C374.6,185.1,373.4,185.1,372.9,186z"
        ></path>
        <path
          class="st5"
          d="M375.1,365.4l9.6-17.4c0.2-0.4,0.1-0.8-0.2-1.1l0,0c-0.3-0.3-0.7-0.4-1.1-0.2l-2.2,1.1    c-0.6,0.3-1.2-0.1-1.3-0.7l-4.8-63.7c0-0.6-0.5-1-1.1-1l0,0c-0.6,0-1,0.4-1.1,1l-4.8,63.7c0,0.6-0.7,1-1.3,0.7l-2.2-1.1    c-0.4-0.2-0.8-0.1-1.1,0.2l0,0c-0.3,0.3-0.4,0.8-0.2,1.1l9.6,17.4C373.4,366.2,374.6,366.2,375.1,365.4z"
        ></path>
        <path
          class="st5"
          d="M191.6,347.1l19.1-5.5c0.4-0.1,0.7-0.5,0.7-0.9l0,0c0-0.4-0.3-0.8-0.7-0.9l-2.3-0.8c-0.6-0.2-0.8-0.9-0.4-1.4    l41.6-48.4c0.4-0.4,0.3-1.1-0.1-1.5l0,0c-0.4-0.4-1-0.4-1.5-0.1l-48.4,41.6c-0.5,0.4-1.2,0.2-1.4-0.4l-0.8-2.3    c-0.1-0.4-0.5-0.7-0.9-0.7l0,0c-0.4,0-0.8,0.3-0.9,0.7l-5.5,19.1C189.8,346.5,190.7,347.3,191.6,347.1z"
        ></path>
        <path
          class="st5"
          d="M189.1,203.8l5.5,19.1c0.1,0.4,0.5,0.7,0.9,0.7l0,0c0.4,0,0.8-0.3,0.9-0.7l0.8-2.3c0.2-0.6,0.9-0.8,1.4-0.4    l48.4,41.6c0.4,0.4,1.1,0.3,1.5-0.1l0,0c0.4-0.4,0.4-1,0.1-1.5L207,211.8c-0.4-0.5-0.2-1.2,0.4-1.4l2.3-0.8    c0.4-0.1,0.7-0.5,0.7-0.9l0,0c0-0.4-0.3-0.8-0.7-0.9l-19.1-5.5C189.7,202,188.8,202.9,189.1,203.8z"
        ></path>
        <path
          class="st5"
          d="M561.3,347.1l-19.1-5.5c-0.4-0.1-0.7-0.5-0.7-0.9l0,0c0-0.4,0.3-0.8,0.7-0.9l2.3-0.8c0.6-0.2,0.8-0.9,0.4-1.4    l-41.6-48.4c-0.4-0.4-0.3-1.1,0.1-1.5l0,0c0.4-0.4,1-0.4,1.5-0.1l48.4,41.6c0.5,0.4,1.2,0.2,1.4-0.4l0.8-2.3    c0.1-0.4,0.5-0.7,0.9-0.7l0,0c0.4,0,0.8,0.3,0.9,0.7l5.5,19.1C563.1,346.5,562.2,347.3,561.3,347.1z"
        ></path>
        <path
          class="st5"
          d="M563.8,203.8l-5.5,19.1c-0.1,0.4-0.5,0.7-0.9,0.7l0,0c-0.4,0-0.8-0.3-0.9-0.7l-0.8-2.3    c-0.2-0.6-0.9-0.8-1.4-0.4l-48.4,41.6c-0.4,0.4-1.1,0.3-1.5-0.1l0,0c-0.4-0.4-0.4-1-0.1-1.5l41.6-48.4c0.4-0.5,0.2-1.2-0.4-1.4    l-2.3-0.8c-0.4-0.1-0.7-0.5-0.7-0.9l0,0c0-0.4,0.3-0.8,0.7-0.9l19.1-5.5C563.2,202,564.1,202.9,563.8,203.8z"
        ></path>
      </svg>
      <div
        class="flatris-btn"
        :style="{'background': color.main, 'color':color.icons }"
        :class="data"
      >
        <div>
          <svg :style="{'fill':color.icons }">
            <use xlink:href="#ico-key"></use>
          </svg>
          <div class="text">
            Выбрать
            квартиру
          </div>
        </div>
      </div>
    </div>

    <div class="btns-inner-master text-center" v-if="btns">
      <button class="btn-line btn-md waves-effect" @click="save">Сохранить</button>
      <button class="btn-md btn-outline-primary waves-effect" @click="syng">Отмена</button>
    </div>
  </div>
</template>

<script>
import webchess from "@/mixin/webchess";
export default {
  name: "position",
  mixins: [webchess],
  data() {
    return {
      data: "",
      position: "bottom-right",
      btns: false,
      default: {
        main: "#5F3C65",
        icons: "#FFFFFF"
      }
    };
  },
  created() {
    if (this.$store.state.webchess) {
      this.syng();
    } else {
      setTimeout(() => {
        this.syng();
      }, 1000);
    }
  },
  computed: {
    color() {
      if (this.$store.state.webchess) {
        if (!this.$store.state.webchess.color) {
          return this.default;
        } else {
          return this.$store.state.webchess.color;
        }
      } else {
        return this.default;
      }
    }
  },
  updated() {},
  mounted() {},
  methods: {
    syng() {
      if (!this.$store.state.webchess.position) {
        this.data = this.position;
        this.btns = false;
        return;
      }
      this.data = this.$store.state.webchess.position;
      this.btns = false;
    },
    setPos(pos) {
      this.data = pos;
      this.btns = true;
    },
    save() {
      this.saveWebchess(this.data, "position");
      this.btns = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.pos {
  max-width: 600px;
  margin: -10px auto 0;
  position: relative;
  svg {
    width: 100%;
    * {
      pointer-events: none;
    }
    .kv {
      pointer-events: all;
    }
  }
}
.flatris-btn {
  position: absolute;
  pointer-events: none;
  display: flex;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 9px;
  line-height: 1.2;
  font-weight: bold;
  &.bottom-right {
    right: 6%;
    bottom: 7.5%;
  }
  &.top-right {
    right: 6%;
    top: 18.5%;
  }
  &.top-center {
    right: 50%;
    top: 18.5%;
    transform: translate(50%, 0);
  }
  &.top-left {
    left: 6%;
    top: 18.5%;
  }
  &.bottom-left {
    left: 6%;
    bottom: 7.5%;
  }
  &.bottom-center {
    transform: translate(50%, 0);
    right: 50%;
    bottom: 7.5%;
  }
  svg {
    width: 30px;
    height: 12px;
    margin-bottom: 5px;
  }
}
.kv {
  z-index: 5;
  cursor: pointer;
  &.active {
    fill: #e6e6e6;
  }
}
.st0 {
  fill: none;
  stroke: #e6e6e6;
  stroke-width: 2;
  stroke-miterlimit: 10;
  transition: all 0.3s ease;
}
.st1 {
  fill: #e6e6e6;
}
.st2 {
  fill: #e6e6e6;
  stroke: #e6e6e6;
  stroke-width: 2;
  stroke-miterlimit: 10;
}
.st3 {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}
.st4 {
  fill: #ffffff;
}
.st5 {
  fill: #21364d;
}
.st6 {
  fill: #5f3c65;
}
.st7 {
  font-family: "Roboto-Bold";
}
.st8 {
  font-size: 6.8813px;
}
</style>
