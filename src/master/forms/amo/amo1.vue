<template>
  <div class :class="{'loader': loader}">
    <div v-if="!original.status">
      <h3 class="text-center">Подключение виджета</h3>
      <div class="status text-center">
        Статус:
        <div
          class="label"
          :class="'label-'+original.crm_config_status_class"
        >{{original.crm_config_status_name}}</div>
      </div>
      <div class>
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label>Логин FLATRIS</label>
              <input
                type="email"
                readonly="readonly"
                class="form-control"
                placeholder="info@flatris.com.ua"
                v-model="$store.state.api.login"
              >
            </div>
            <div class="form-group">
              <label>Ключ API FLATRIS</label>
              <input
                type="text"
                readonly="readonly"
                class="form-control"
                v-model="$store.state.api.key"
              >
            </div>
          </div>
          <div class="col-lg-6">
            <div class="text-border">
              <p>
                <b>Инструкция:</b>
              </p>
              <ol>
                <li>Откройте AmoCRM и зайдите в раздел интеграции в настройках;</li>
                <li>Найдите виджет Flatris в общем списке и откройте его;</li>
                <li>Вставьте Логин Flatris и Ключ API Flatris в соответствующие поля в AmoCRM и нажмите кнопку установить;</li>
                <li>Нажмите кнопку "ПОДКЛЮЧИТЬ" после выполнения пункта 3.</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="btns text-center">
          <button class="btn btn-md waves-effect" @click="update">ПОДКЛЮЧИТЬ</button>
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="text-center">Синхронизация с AmoCRM</h3>
      <div class="status text-center">
        Статус:
        <div
          class="label"
          :class="'label-'+original.crm_config_status_class"
        >{{original.crm_config_status_name}}</div>
      </div>
      <div class>
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label>Субдомен amoCRM</label>
              <input
                type="text"
                readonly="readonly"
                class="form-control"
                v-model="original.crm_config_subdomain"
              >
            </div>
            <div class="form-group">
              <label>Пользователь API amoCRM</label>
              <input type="text" class="form-control" v-model="form.crm_config_amouser">
            </div>
            <!-- @keyup="setChanges('crm_config_amohash')" -->
            <div class="form-group">
              <label>Ключ API amoCRM</label>
              <input type="text" class="form-control" v-model="form.crm_config_amohash">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="text-border">
              <p>
                <b>Важное примечание:</b>
              </p>
              <p>После каждого изменения в конфигурации amoCRM: добавление новых менеджеров, редактирование статусов или воронок - необходимо обязательно "обновлять данные" для синхронизации AmoCRM с FLATRIS</p>
            </div>
            <br>
            <div class="btns text-center form-group">
              <button class="btn btn-md waves-effect" @click="save">ОБНОВИТЬ ДАННЫЕ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errors.length">
      <div class="alert alert-danger text-center" role="alert">
        <p v-for="(item, i) in errors" :key="i">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "amo1",
  mixins: [masterMixin],
  data() {
    return {
      load: true,
      connected: false,
      form: {}
      // required: {
      //   active: ""
      // }
    };
  },
  created() {
    this.checkBtn();
    if (!this.$store.state.api.login) {
      this.$store.commit("getApi");
    }
  },
  computed: {
    loader() {
      if (!this.original.crm_config_status_class || !this.load) return true;
      return false;
    },
    original() {
      if (!this.$store.state.amo) {
        return {
          status: 0
        };
      }
      let data = this.$store.state.amo;
      if (!this.form.status) {
        this.form = { ...data };
      }

      return data;
    }
  },
  updated() {
    this.checkBtn();
  },
  mounted() {},
  methods: {
    update() {
      this.$store.commit("getAmo");
    },
    checkBtn() {
      if (this.original.status == 1) {
        this.$emit("btnActive", true);
      } else {
        this.$emit("btnActive", false);
      }
    },

    updateConfig() {},

    send(e) {
      this.$emit("footerBtn", e);
      return true;
    },

    save(e) {
      this.errors = [];

      setTimeout(() => {
        this.errors = [];
      }, 5000);

      if (!this.isAddress(this.form.crm_config_amouser)) {
        this.errors.push("Неправильный формат имя пользователя");
        return;
      }

      this.load = false;

      //  return;
      $.post(
        this.$store.state.apiurl,
        {
          action: "updateCrmConfig",
          amouser: this.form.crm_config_amouser,
          amohash: this.form.crm_config_amohash,
          subdomain: this.form.crm_config_subdomain
        },
        data => {
          this.$store.commit("getAmo");
          this.load = true;
          if (!data.error) {
            this.saveOk();
          } else {
            console.log(data);
            this.errors.push(data.error.message);
          }
        },
        "json"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.status {
  margin-bottom: 40px;
  .label {
    //  display: inline-block;
  }
}
</style>
