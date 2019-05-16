<template>
  <div class="f-item"  id="permission">
    <h4 class="text-center">ВЫБЕРИТЕ ДОМА И СЕКЦИИ, КОТОРЫЕ ХОТИТЕ ПОКАЗАТЬ НА САЙТЕ</h4>
    <div class="row" v-if="data.permissions_tree">
      <div class="col-lg-6">
        <chObList
          class="text-border"
          :data="data.permissions_tree"
          :dataId="$route.params.oid"
          @setPr="btns = true"
        ></chObList>
      </div>
    </div>

    <div class="btns text-center" v-if="btns">
      <button class="btn-line btn-md waves-effect" @click="save">Сохранить</button>
      <button class="btn-md btn-outline-primary waves-effect" @click="getData">Отмена</button>
    </div>
  </div>
</template>

<script>
import webchess from "@/mixin/webchess";
import chObList from "@/master/blocks/chObList";

export default {
  name: "permission",
  mixins: [webchess],
  components: {
    chObList
  },
  data() {
    return {
      errors: [],
      success: false,
      data: {},
      btns: false
    };
  },
  created() {
    this.getData();
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
    getData() {
      $.get(
        this.$root.mainurl + "/api/?action=getUserPermissions&ut=web",
        data => {
          this.data = data.data;
          this.btns = false;
        },
        "JSON"
      );
    },
    getPerm() {
      let f = this.lodash.filter(this.data.permissions_tree, item => {
        return item.state.selected == true;
      });

      let data = [];

      f.forEach(item => {
        data.push(item.permissions);
      });

      return data;
    },
    save() {
      let data_to_send = this.getPerm();
     // console.log(data_to_send);
      this.setPermissions(data_to_send, "web");
      setTimeout(() => {
        this.btns = false;
      }, 500);
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
</style>
