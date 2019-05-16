<template>
  <div class="f-item" id="timeout">
    <h4 class="text-center">СТАРТ ПОКАЗА КНОПКИ "ВЫБРАТЬ КВАРТИРУ"</h4>
    <div class="list">
      <div class="item">
        <label class="cus-check big">
          <input type="radio" v-model="type" value="1" @change="btns = true">
          <span class="ch"></span>
          <div>
            <span class="title">сразу после загрузки страницы</span>
          </div>
        </label>
      </div>
      <div class="item dflex">
        <label class="cus-check big">
          <input type="radio" v-model="type" value="2" @change="btns = true">
          <span class="ch"></span>
          <div>
            <span class="title">с задержкой</span>
          </div>
        </label>
        <input
          type="number"
          class="form-control"
          :disabled="type==1"
          v-model="data"
          @keypress="btns = true"
          @keyup="btns = true"
          @keydown="btns = true"
          @change="btns = true"
        >
        <div class="s">секунды</div>
      </div>
    </div>

    <div class="btns-inner-master text-center" v-if="btns">
      <button class="btn-line btn-md waves-effect" @click="save">Сохранить</button>
      <button class="btn-md btn-outline-primary waves-effect" @click="syng">Отмена</button>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import webchess from "@/mixin/webchess";
export default {
  name: "timeout",
  mixins: [webchess],
  data() {
    return {
      data: 0,
      timeout: 0,
      btns: false,
      type: 1
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
  watch: {
    type() {
      if (this.type == 1) {
        this.data = 0;
      }
    }
  },
  computed: {},
  updated() {},
  mounted() {},
  methods: {
    syng() {
      if (!this.$store.state.webchess.timeout) {
        this.data = this.lodash.cloneDeep(this.timeout);
        this.btns = false;
        this.type = 1;
        return;
      }
      this.data = this.lodash.cloneDeep(this.$store.state.webchess.timeout);
      this.btns = false;
      if (this.data && this.data != 0) {
        this.type = 2;
      } else {
        this.type = 1;
      }
    },
    save() {
      this.saveWebchess(this.data, "timeout");
      this.btns = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.img {
  img {
    display: block;
    width: 100%;
  }
}

.list {
  max-width: 300px;
  margin: 0 auto;
  .item {
    margin-bottom: 15px;
  }
}

.dflex {
  display: flex;
  align-items: center;
  .form-control {
    width: 80px;
    margin: 0 15px;
  }
  .s {
    position: relative;
    top: -4px;
  }
}
</style>
