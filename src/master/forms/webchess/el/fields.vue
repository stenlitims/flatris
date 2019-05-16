<template>
  <div class="f-item" id="fields">
    <h4 class="text-center">ВЫБЕРИТЕ ПОЛЯ, КОТОРЫЕ ХОТИТЕ ОТОБРАЖАТЬ НА САЙТЕ</h4>
    <div class="list-fields-wrap">
      <div class="list-fields">
        <div class="item" v-for="(item, i) in fields" :key="i">
          <label class="cus-check" :class="{'fields_hidden': item.hide}">
            <input
              type="checkbox"
              @change="btns = true"
              v-model="item.checked"
              :disabled="item.disabled"
            >
            <span class="ch"></span>
            <span class="title">{{item.name}}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="btns text-center" v-if="btns">
      <button class="btn-line btn-md waves-effect" @click="save">Сохранить</button>
      <button class="btn-md btn-outline-primary waves-effect" @click="getFields">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "fields",
  data() {
    return {
      errors: [],
      success: false,
      fields: {},
      form: {},
      upd: false,
      required: {},
      btns: false
    };
  },
  created() {
    this.getFields();
  },
  updated() {},
  mounted() {},
  methods: {
    getFields() {
      $.post(
        this.$root.apiurl,
        {
          action: "getFields",
          id: this.$route.params.oid
        },
        data => {
          if (data) {
         //   console.log(data);
            data = _.filter(data, { disabled: false });
            this.fields = data;
            this.btns = false;
          }
        },
        "json"
      );
    },

    setInput(key) {
      if (key == "price") {
        this.fields.price_m2.checked = !this.fields.price_m2.checked;
        this.fields.discount_price_m2.checked = !this.fields.discount_price_m2
          .checked;
        this.fields.discount_price.checked = !this.fields.discount_price
          .checked;
      }

      this.setChanges2("fields");
    },
    save(e) {
      let fields = {};

      for (let i in this.fields) {
        if (this.fields[i].checked) {
          fields[i] = 1;
        } else {
          fields[i] = -1;
        }
      }

      // console.log(fields);

      $.post(
        this.$root.apiurl,
        {
          action: "setFields",
          id: this.$route.params.oid,
          data: fields
        },
        data => {
          if (data) {
            this.saveOk();
            this.btns = false;
          }
        },
        "json"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.btns {
  margin-top: 30px;
  > * {
    margin: 0 10px;
  }
}
.list-fields-wrap {
  display: flex;
  justify-content: center;
}
.list-fields {
  .item {
    margin-bottom: 5px;
  }
}
</style>
