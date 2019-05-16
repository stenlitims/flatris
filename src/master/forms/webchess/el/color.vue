<template>
  <div class="f-item" id="color">
    <h4 class="text-center">ЦВЕТ КНОПКИ</h4>
    <div class="row">
      <div class="col-md-7">
        <div class="color-list">
          <div class="item row">
            <div class="t col-sm-8">Цвет кнопки "Выбрать квартру":</div>
            <div class="color col-sm-4" @click="btns = true">
              <div class="v" @click="openColor('main')">{{data.main}}</div>
              <verte v-model="data.main" model="hex" ref="main"></verte>
            </div>
          </div>
          <div class="item row">
            <div class="t col-sm-8">Цвет иконок:</div>
            <div class="color col-sm-4" @click="btns = true">
              <div class="v" @click="openColor('icons')">{{data.icons}}</div>
              <verte v-model="data.icons" ref="icons" model="hex"></verte>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="color-img">
          <div class="flatris-btn" :style="{'background': data.main, 'color':data.icons }">
            <div>
              <svg :style="{'fill':data.icons }">
                <use xlink:href="#ico-key"></use>
              </svg>
              <div class="text">
                Выбрать
                квартиру
              </div>
            </div>
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
import Verte from "verte";
import "verte/dist/verte.css";
export default {
  name: "color",
  mixins: [webchess],
  components: { Verte },
  data() {
    return {
      data: {},
      color: {
        main: "#5F3C65",
        icons: "#FFFFFF"
      },
      btns: false
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
  computed: {},
  updated() {},
  mounted() {},
  methods: {
    openColor(name) {
      this.$refs[name].openMenu();
    },
    syng() {
      if (!this.$store.state.webchess.color) {
        this.data = this.lodash.cloneDeep(this.color);
        this.btns = false;
        return;
      }
      this.data = this.lodash.cloneDeep(this.$store.state.webchess.color);
      this.btns = false;
    },
    save() {
      this.saveWebchess(this.data, "color");
      this.btns = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.color-img {
  position: relative;
  img {
    max-width: 100%;
  }
}
.flatris-btn {
  //  position: absolute;
  margin: 0 auto;
  right: 15px;
  bottom: 15px;
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  line-height: 1.2;
  font-weight: bold;
  //  text-transform: uppercase;
  svg {
    width: 40px;
    height: 16px;
    margin-bottom: 10px;
  }
}
.color-list {
  .row {
    margin-bottom: 20px;
    margin-right: -10px;
    margin-left: -10px;
    > div {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  .t {
    text-transform: uppercase;
    font-weight: bold;
  }
  .color {
    display: flex;
    align-items: center;
    cursor: pointer;
    .verte {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .v {
    margin-right: 7px;
    text-decoration: underline;
    cursor: pointer;
    width: 60px;
  }
}
</style>
