<template>
  <div class="save-panel master-footer">
    <div class="container">
      <div class="l">
        <div v-if="!prop">
          <button class="btn btn-or btn-md waves-effect" @click="save">Сохранить</button>
          <button class="btn btn-line btn-md waves-effect" @click="cancel">Отменить</button>
        </div>

        <div v-if="prop == 'users'">
          <button class="btn btn-or btn-md waves-effect" @click="editUsers">Редактировать</button>
          <button class="btn btn-line btn-md waves-effect" @click="removeUser(ids)">Удалить</button>
        </div>

        <div class="title">{{mtitle}}</div>
      </div>
      <div class="r">
        <a href="#" @click.prevent="closePanel">Закрыть</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "savePanel",
  props: ["prop", "title", "cont", "ids"],
  data() {
    return {};
  },
  created() {},
  mounted() {
    $("#app").addClass("bottom-panel");
  },
  beforeDestroy() {
    $("#app").removeClass("bottom-panel");
  },
  computed: {
    count() {
      return this.$store.state.changes.count.length;
    },
    mtitle() {
      if (this.title) {
        return this.title;
      } else {
        return (
          "Вы внесли " +
          this.count +
          " " +
          this.Declension(this.count, ["изменение", "изменения", "изменений"]) +
          "."
        );
      }
    }
  },
  methods: {
    closePanel() {
      // console.log(3452);
      this.$emit("userIds", []);
      this.$bus.emit("clearUsers");
      this.$store.commit("setChanges", {
        count: []
      });
    },

    cancel() {
      this.$store.commit("setChanges", {
        count: []
      });
    },
    save() {
      this.$bus.emit(this.$route.params.id, "test");
    },
    del() {
      this.$bus.emit(this.$route.params.id, this.prop);
    },
    editUsers() {
      this.$store.commit("loadRmodal", {
        type: "editUser",
        title: "Редактирование"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.l {
  display: flex;
  align-items: center;
  .btn-or {
    margin-right: 30px;
  }
  .title {
    margin-left: 30px;
  }
}
@media (max-width: 991px) {
  .r {
    display: none;
  }
}
@media (max-width: 567px) {
  .l {
    flex-wrap: wrap;
    > div {
      width: 100%;
      text-align: center;
    }
    .title {
      margin: 0 0 10px;
      order: -1;
    }
  }
}
</style>
