<template>
  <div class="form">
    <h3 class="text-center">Настройка воронки</h3>

    <div class="text-inner">
      <div class="text text-center">
        <p>Для завершения интеграции Flatris с AmoCrm необходимо связать Ваши статусы в AmoCRM со статусами Flatris</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Объект</label>
          <select
            class="form-control"
            v-model="form.gproject_id"
            @change="setChanges('gproject_id')"
          >
            <option :value="item.id" v-for="item in myObjects" :key="item.id">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label>Воронка в Amocrm</label>
          <select
            class="form-control"
            v-model="form.crm_pipeline_id"
            @change="setChanges('crm_pipeline_id')"
          >
            <option value="0">Все воронки</option>
            <option :value="item.id" v-for="item in pipelines" :key="item.id">{{item.label}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="list-amo" v-if="form.crm_pipeline_id">
      <div class="list-status">
        <div class="row" v-for="item in statuses" :key="item.id">
          <div class="col-6 left-col">
            <div class="form-control">{{item.name}}</div>
          </div>
          <div class="col-6">
            <select
              class="form-control"
              v-model="form.list[item.id].status_id"
              @change="setChanges('list')"
            >
              <option
                :value="status.id"
                v-for="status in $store.state.amo.statusesCms"
                :key="status.id"
              >{{status.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
export default {
  name: "amo2",
  mixins: [masterMixin],
  data() {
    return {
      form: {
        crm_pipeline_id: null,
        gproject_id: null,
        list: {}
      },
      original: {},
      required: {}
    };
  },
  created() {
    if (!this.$store.state.myObjects) {
      this.$store.commit("loadMyObjects");
    }
  },
  mounted() {},
  computed: {
    pipelines() {
      if (!this.$store.state.amo.pipelines) return [];
      let data = this.$store.state.amo.pipelines;
      return data;
    },
    statuses() {
      let data = this.pipelines.filter(o => {
        return o.id == this.form.crm_pipeline_id;
      });

      if (!data.length) {
        data = this.pipelines;
      }

      return data[0].statuses;
    },
    myObjects() {
      if (!this.$store.state.myObjects) return [];
      let data = this.$store.state.myObjects;
      if (!this.form.gproject_id) {
        let k = Object.keys(data);
        this.form.gproject_id = data[k[0]].id;
        this.form.crm_pipeline_id = data[k[0]].crm_pipeline_id;
        this.form.list = this.$store.state.amo.statuses;
        this.original = { ...this.form };
      }
      return data;
    }
  },
  updated() {},
  methods: {
    save() {
      console.log(this.form);

      $.post(
        this.$store.state.apiurl,
        {
          action: "saveAmoV",
          gproject_id: this.form.gproject_id,
          crm_pipeline_id: this.form.crm_pipeline_id,
          crm_status: this.form.list
        },
        data => {
          if (data.type == "success") {
            this.saveOk();
          //  this.$store.commit("getAmo");
          }
        },
        "json"
      );
    },
    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  margin-bottom: 30px;
}
.list-amo {
  padding: 20px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  .row {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
