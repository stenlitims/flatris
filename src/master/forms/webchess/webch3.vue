<template>
  <div class>
    <h4 class="text-center">Создайте свой виджет для сайта</h4>
    <div class="row">
      <div class="col-lg-4 col-xl-3">
        <h4 class="master-sidebar-title">РЕДАКТИРОВАНИЕ ВИДЖЕТА</h4>
        <div class="master-sidebar">
          <div href="#color" @click="linkScroll('#color')" class="item active">
            <div class="title">
              <div class="num">1</div>Цвет кнопки
            </div>
            <div class="text">Выберите цвет кнопки виджета и иконок</div>
          </div>
          <div href="#position" @click="linkScroll('#position')" class="item">
            <div class="title">
              <div class="num">2</div>Положение кнопки
            </div>
            <div class="text">Выберите положение кнопки "Выбрать квартиру" на вашем сайте</div>
          </div>
          <div href="#timeout" @click="linkScroll('#timeout')" class="item">
            <div class="title">
              <div class="num">3</div>Старт показа
            </div>
            <div class="text">Укажите когда кнопка должна появится на вашем сайте.</div>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-xl-9">
        <div class="form r-content-master c-sc" @scroll="onScroll">
          <color></color>
          <position></position>
          <timeout></timeout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import color from "@/master/forms/webchess/el/color";
import position from "@/master/forms/webchess/el/position";
import timeout from "@/master/forms/webchess/el/timeout";
export default {
  name: "webCh3",
  mixins: [masterMixin],
  components: {
    color,
    position,
    timeout
  },
  data() {
    return {
      errors: [],
      success: false,
      data: {},
      form: {},
      upd: false,
      required: {}
    };
  },
  created() {},
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    send(e) {
      this.$emit("footerBtn", e);
      return true;
    }
  }
};
</script>

<style lang="scss">
</style>
