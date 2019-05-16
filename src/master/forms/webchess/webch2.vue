<template>
  <div class>
    <h4 class="text-center">Выбор страниц веб-шахматки, языка и объектов для вашей шахматки</h4>
    <div class="row">
      <div class="col-lg-4 col-xl-3">
        <h4 class="master-sidebar-title">РАЗДЕЛЫ</h4>
        <div class="master-sidebar">
          <div href="#views" @click="linkScroll('#views')" class="item active">
            <div class="title">
              <div class="num">1</div>Выбор страниц
            </div>
            <div
              class="text"
            >Выберите какие именно страницы Вам нужны и укажите их очередность показа</div>
          </div>
          <div href="#lang" @click="linkScroll('#lang')" class="item">
            <div class="title">
              <div class="num">2</div>Выбор языка
            </div>
            <div class="text">Выберите язык(и) на котором вы хотите разместить шахматку на сайте</div>
          </div>
          <div href="#permission" @click="linkScroll('#permission')" class="item">
            <div class="title">
              <div class="num">3</div>Выбор домов / секций
            </div>
            <div class="text">Выберите дома и секции, которые хотите отображать на сайте</div>
          </div>
          <div href="#fields" @click="linkScroll('#fields')" class="item">
            <div class="title">
              <div class="num">4</div>Выбор полей
            </div>
            <div class="text">Выберите поля, которые хотите отображать на сайте</div>
          </div>
          <div href="#status" @click="linkScroll('#status')" class="item">
            <div class="title">
              <div class="num">5</div>Подмена статусов
            </div>
            <div class="text">Подмените статусы квартир, которые не хотите показывать на сайте</div>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-xl-9">
        <div class="form r-content-master c-sc" @scroll="onScroll">
          <views></views>
          <lang></lang>
          <permission></permission>
          <fields></fields>
          <status></status>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import views from "@/master/forms/webchess/el/views";
import lang from "@/master/forms/webchess/el/lang";
import permission from "@/master/forms/webchess/el/permission";
import status from "@/master/forms/webchess/el/status";
import fields from "@/master/forms/webchess/el/fields";

export default {
  name: "webCh2",
  mixins: [masterMixin],
  components: {
    views,
    lang,
    permission,
    fields,
    status
  },
  data() {
    return {
      errors: [],
      success: false,
      fields: {},
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
