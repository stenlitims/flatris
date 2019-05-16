<template>
  <div class="f-item" id="views">
    <h4 class="text-center">ВЫБОР СТРАНИЦ И ИХ ОЧЕРЕДНОСТЬ ПОКАЗА</h4>
    <div class="row">
      <div class="col-md-5">
        <h5>ВСЕ СТРАНИЦЫ</h5>
        <div class="list">
          <div class="item" v-for="item in list" :key="item.id">
            <label class="cus-check big">
              <input type="checkbox" v-model="item.ch" @change="setData(item)">
              <span class="ch"></span>
              <div>
                <span class="title">{{item.t}}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <h5>ВЫБРАННЫЕ СТРАНИЦЫ И ИХ ОЧЕРЕДНОСТЬ</h5>
        <draggable v-model="data" class="draggable" @end="btns=true">
          <div v-for="(element, i) in data" class="item" :key="element.id">
            <div class="num">{{i +1}}.</div>
            <div class="d-item">
              <img src="https://flatris.com.ua/assets/panel/img/draggable.png" alt>
              {{element.t}}
            </div>
          </div>
        </draggable>
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
import draggable from "vuedraggable";
export default {
  mixins: [webchess],
  components: {
    draggable
  },
  props: ["views"],
  data() {
    return {
      btns: false,
      list: [
        {
          id: "webchess",
          t: "Шахматка",
          ch: false
        },
        {
          id: "interactive",
          t: "Интерактив",
          ch: true
        },
        {
          id: "plans",
          t: "Планировки",
          ch: true
        },
        {
          id: "list",
          t: "Список",
          ch: false
        }
      ],
      data: []
    };
  },
  created() {
    this.data = this.list.filter(o => {
      return o.ch == true;
    });
    if (this.$store.state.webchess) {
      if (!this.$store.state.webchess.views) return;
      this.syng();
    } else {
      setTimeout(() => {
        this.syng();
      }, 1000);
    }
  },
  computed: {},
  methods: {
    syng() {
      this.data = [...this.$store.state.webchess.views];
      let list = [...this.list];
      for (let item in list) {
        let f = this.lodash.find(this.data, o => {
          return o.id == list[item].id;
        });
        if (f) {
          list[item].ch = f.ch == "true" ? true : false;
        } else {
          list[item].ch = false;
        }
      }
      this.list = list;
      this.btns = false;
    },
    setData(item) {
      let f = this.lodash.find(this.data, o => {
        return o.id == item.id;
      });
      if (f) {
        if (this.data.length > 1) {
          this.lodash.remove(this.data, o => {
            return o.id == item.id;
          });
        }
      } else {
        this.data.push(item);
      }
      this.btns = true;
    },
    save() {
      this.saveWebchess(this.data, "views");
      this.btns = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  .item {
    margin-bottom: 10px;
  }
}
.draggable {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .num {
    margin-right: 8px;
  }
}
.d-item {
  position: relative;
  padding: 8px 20px;
  background: #f5f8fa;
  width: 80%;
  padding-left: 40px;
  border: 1px solid #cbd6e2;
  img {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
  }
}

.btns {
  > * {
    margin: 0 10px;
  }
}
</style>
