<template>
  <div class="form">
    <h4 class="text-center">Выберите вариант дизайна страницы "Выбор квартир" для Вашего сайта</h4>
    <div class="select-type-web" :data-type="webchess.type">
      <div class="item" :class="{'active': form.type == 1}">
        <div class="ch" @click="$set(form, 'type', 1)"></div>
        <div class="title">Вариант 1</div>
        <div class="text">
          <p>В данном варианте у вас в одном интерфейсе будет сразу 4 представления по выбору квартир:</p>

          <ul>
            <li>выбор с ген плана</li>
            <li>список квартир</li>
            <li>планировки квартир</li>
            <li>шахматка квартир</li>
          </ul>
        </div>

        <div class="btns text-center">
          <button class="btn btn-md waves-effect">Посмотреть пример</button>
        </div>
      </div>
      <div class="item" :class="{'active': form.type == 2}">
        <div class="ch" @click="$set(form, 'type', 2)"></div>
        <div class="title">Вариант 2</div>
        <div class="text">
          <p>В данном варианте у вас будет классический подбор квартир как у лучших сайтов жилых комплексов:</p>

          <ul>
            <li>выбор с ген плана</li>
            <li>подбор по параметрам</li>
            <li>избранное</li>
          </ul>
        </div>

        <div class="btns text-center">
          <button class="btn btn-md waves-effect">Посмотреть пример</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "webch1",
  mixins: [masterMixin],
  data() {
    return {
      form: {},
      original: {},
      required: {}
    };
  },

  created() {},
  updated() {
    if (!this.form.type) {
      this.$emit("btnActive", false);
    } else {
      this.$emit("btnActive", true);
    }
  },
  mounted() {},
  methods: {
    save(e){

    },
    send(e) {
      if (!this.form.type) {
        return;
      }
      $.post(
        this.$store.state.apiurl,
        {
          action: "setWebchess",
          id: this.$route.params.oid,
          data: this.form
        },
        data => {
          this.$emit("footerBtn", e);
          return true;
        },
        "json"
      );
    }
  }
};
</script>

<style lang="scss">
.select-type-web {
  display: flex;
  justify-content: center;
  .item {
    position: relative;
    width: 40%;
    padding: 30px 20px;
    margin: 0 5%;
    border-radius: 5px;
    border: 1px solid #5fbeaa;
    transition: all 0.3s ease;

    .ch {
      width: 30px;
      height: 30px;
      position: absolute;
      border: 2px solid #5fbeaa;
      border-radius: 50%;
      right: 10px;
      top: 10px;
      cursor: pointer;
      &.active {
      }
    }
    &.active {
      background: rgba(95, 190, 170, 0.1);
      .ch {
        &:before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 7px;
          height: 12px;
          border-bottom: 2px solid #5fbeaa;
          border-right: 2px solid #5fbeaa;
          transform: translate(-50%, -60%) rotate(45deg);
        }
      }
    }
  }
  .title {
    font-size: 20px;
    margin-bottom: 30px;
    text-align: center;
  }
  .text {
    min-height: 155px;
    margin-bottom: 10px;
  }
}


@media (max-width: 991px) {
  .select-type-web{
    display: block;
    .item{
      width: auto;
      margin-bottom: 15px;
    }
  }
}


</style>
