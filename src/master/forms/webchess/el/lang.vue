<template>
  <div class="f-item" id="lang">
    <h4 class="text-center">ВЫБОР ЯЗЫКА ИЛИ НЕСКОЛЬКИХ ЯЗЫКОВ</h4>

    <div class="list-langs">
      <div class="row">
        <div class="col-sm-4 col-md-3"></div>
        <div class="col-sm-8 col-md-9">
          <div class="list-title">Укажите название объекта на выбранном языке</div>
        </div>
      </div>
      <div class="row" v-for="(item, i) in data" :key="i">
        <div class="col-sm-4 col-md-3">
          <label class="cus-check big">
            <input type="checkbox" v-model="item.ch" @change="btns = true">
            <span class="ch"></span>
            <span class="title">{{item.lang}}</span>
          </label>
        </div>
        <div class="col-sm-8 col-md-9">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              :data-name="name"
              v-model="item.name"
              @keypress="btns = true"
              @keyup="btns = true"
              @keydown="btns = true"
              @change="btns = true"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="btns text-center" v-if="btns">
      <button class="btn-line btn-md waves-effect" @click="save">Сохранить</button>
      <button class="btn-md btn-outline-primary waves-effect" @click="syng">Отмена</button>
    </div>
  </div>
</template>

<script>
import webchess from "@/mixin/webchess";

export default {
  name: "lang",
  mixins: [webchess],
  data() {
    return {
      errors: [],
      success: false,
      langs: {
        //   en: { lang: "Английский" },
        ru: { lang: "Русский", ch: true },
        uk: { lang: "Украинский" }
        //    by: { lang: "Белорусский" },
        //    kz: { lang: "Казахский" }
      },
      data: {},
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
  computed: {
    name() {
      if (!this.$store.state.myObjects) return;
      let name = this.$store.state.myObjects[this.$route.params.oid].name;
      if (!this.data.ru.name) {
        this.data.ru.name = name;
      }
      return name;
    }
  },
  updated() {},
  mounted() {},
  methods: {
    syng() {
      if (!this.$store.state.webchess.lang) {
        this.data = this.lodash.cloneDeep(this.langs);
        this.btns = false;
        return;
      }
      this.data = this.lodash.cloneDeep(this.$store.state.webchess.lang);
      this.btns = false;
    },
    save() {
      this.saveWebchess(this.data, "lang");
      this.btns = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.list-langs {
  margin-top: 40px;
  .cus-check {
    margin-top: 5px;
  }
  .list-title {
    margin-bottom: 8px;
    padding-left: 7px;
  }
}
.form-group {
  margin-bottom: 20px;
}
.btns {
  > * {
    margin: 0 10px;
  }
}
</style>
