<template>
  <div class="form">
    <h4 class="text-center">Выберите объект(ы), которые хотите интегрировать с "Мир Квартир"</h4>

    <div v-if="data">
      <div class="row wrap-list-object">
        <div class="col-lg-6">
          <h4 class="text-center">Объекты, которые еще не размещены</h4>
          <div class="list-object">
            <div>
              <div class="item" v-for="(item, i) in listO.no" :key="i">
                <label class="cus-check big">
                  <input type="checkbox" @change="selMain" v-model="item.selected">
                  <span class="ch"></span>
                  <span class="title">{{item.text}}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <h4 class="text-center">Уже опубликованные объекты</h4>
          <div class="list-object">
            <div>
              <div class="item" v-for="(item, i) in listO.sel" :key="i">
                <label class="cus-check big">
                  <input type="checkbox" @change="selMain" v-model="item.selected">
                  <span class="ch"></span>
                  <span class="title">{{item.text}}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "mir1",
  mixins: [masterMixin],

  data() {
    return {
      errors: [],
      success: false,
      selData: [],
      data: null,

      form: {
        active: ""
      },
      required: {
        active: ""
      }
    };
  },
  created() {
    if (!this.$store.state.permissions.mirkvartir.length) {
      this.$store.commit("loadPermissions", "mirkvartir");
    }
    this.data = this.$store.state.permissions.mirkvartir;
    this.selMain();
    // this.getData();
    // if (window.mkvselData) {
    //   this.selData = window.mkvselData;
    // }
  },
  updated() {},
  watch: {},
  mounted() {
    this.selMain();
    this.$emit("btnActive", !this.error.length);
  },
  computed: {
    listO() {
      if (!this.data) return [];
      let data = {
        sel: [],
        no: []
      };
      for (let item of this.data) {
        if (item.parent == "#") {
          // item.selected = false;
          if (item.state.selected) {
            item.selected = true;
            data.sel.push(item);
          } else {
            item.selected = false;
            data.no.push(item);
          }
        }
      }
      return data;
    }
  },
  methods: {
    // getData() {
    //   if (window.mirKv) {
    //     this.data = window.mirKv;
    //     return;
    //   }
    //   $.get(
    //     this.$root.mainurl + "/api?action=getUserPermissions&ut=mirkvartir",
    //     data => {
    //       //  console.log(data);
    //       this.data = data.data;
    //       window.mirKv = this.data;
    //       this.selMain();
    //     },
    //     "JSON"
    //   );
    // },
    selMain() {
      if (!this.data) return [];
      let data = [];
      for (let item of this.data) {
        if (item.parent == "#" && item.selected) {
          data.push(item.permissions.object_id);
        }
      }

      if (data.length) {
        //  console.log(data);
        this.form.active = true;
      } else {
        this.form.active = false;
      }

      this.errorUpd();
    },
    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      this.errors = [];
      if (this.error.length) {
        this.errors.push("Выберете ЖК");
        setTimeout(() => {
          this.errors = [];
        }, 1500);
        return;
      }

      this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss" scoped>

.wrap-list-object{
  border: 1px solid #ECF0F4;
  margin-top: 40px;
  > div{
     padding: 40px 15px 30px;
    &:first-child{
      border-right: 1px solid #ECF0F4;
    }
  }
  h4{
    margin-bottom: 26px;
    font-size: 1.1rem;
  }
}
.list-object {
  margin-top: 0px;
  display: flex;
  justify-content: space-around;
  .item {
    margin-bottom: 10px;
  }
}
</style>
