<template>
  <div class="f-item" id="status">
    <h4 class="text-center">ПОДМЕНИТЕ СТАТУСЫ КВАРТИР, КОТОРЫЕ НЕ ХОТИТЕ ПОКАЗЫВАТЬ НА САЙТЕ</h4>

    <div class="list-status" v-if="status">
      <div class="row" v-for="(item, i) in status" :key="i">
        <div class="col-6 left-col">
          <div class="color" :style="{'backgroundColor': item.color}"></div>
          <div class="form-control">{{item.name}}</div>
        </div>
        <div class="col-6">
          <select class="form-control" @change="btns = true" v-model="item.status">
            <option
              v-for="(it, i) in status"
              :key="i"
              :value="it.id"
              :selected="it.id == it.status"
            >{{it.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="status-btns text-center" v-if="btns">
      <button class="btn-line btn-md waves-effect" @click="save">Сохранить</button>
      <button class="btn-md btn-outline-primary waves-effect" @click="getStatus">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "status",
  data() {
    return {
      errors: [],
      success: false,
      form: {},
      status: {},
      upd: false,
      btns: false
    };
  },
  created() {
    this.getStatus();
  },
  updated() {},
  mounted() {},
  methods: {
    getStatus() {
      $.post(
        this.$root.apiurl,
        {
          action: "getStatus",
          id: this.$route.params.oid
        },
        data => {
          if (data) {
            this.status = data;
            this.btns = false;
          }
        },
        "json"
      );
    },
    save(e) {
      let status = {};
      this.lodash.forEach(this.status, (value, key) => {
        status[value.id] = value.status;
      });

      $.post(
        this.$root.apiurl,
        {
          action: "setStatus",
          id: this.$route.params.oid,
          data: status
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

<style lang="scss">
.status-btns {
  margin-top: 30px;
  > * {
    margin: 0 10px;
  }
}
.list-status {
  padding-left: 30px;
  padding-right: 30px;
  .row {
    margin-bottom: 25px;
    margin-right: -30px;
    margin-left: -30px;
    > div {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .left-col {
    display: flex;
    justify-content: space-between;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      background-image: url(https://flatris.com.ua/assets/site/images/right-arrow.svg);
      width: 34px;
      height: 33px;
      background-size: cover;
    }
  }
  .color {
    width: 50px;
    margin-right: 15px;
    border-radius: 12px;
  }
  .form-control {
    height: auto !important;
  }
}
</style>
