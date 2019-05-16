<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Интерактивный каталог для сайта</div>

        <div class="r">
          <div class="form-group search">
            <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>

    <toolNav v-if="$store.state.isMobile"></toolNav>

    <div class="main-container container">
      <div v-if="countObjects">
        <div class="inst-list main-list" v-if="!$store.state.isMobile">
          <div class="row">
            <div class="col-md-6 col-lg-4" v-for="(item, i) in list" :key="i">
              <div class="item">
                <div class="title">{{item.name}}</div>
                <div class="img img-m">
                  <img :src="item.logo" v-if="item.logo" alt>
                  <img :src="item.img" v-else-if="item.img" alt>
                  <img :src="$store.state.mainurl+'/assets/panel/img/object.svg'" v-else alt>
                </div>
                <div class="btns" v-if="item.selected">
                  <router-link
                    :to="{ name: 'webchess', params: { id: 1, oid: item.id }}"
                    class="btn btn-outline-primary waves-effect"
                  >Редактировать</router-link>
                  <button
                    class="btn btn-outline-primary2 waves-effect"
                    @click="OffPermissions(item.id)"
                  >Отключить</button>
                </div>

                <div v-else>
                  <router-link
                    :to="{ name: 'new_webchess', params: { id: 1, oid: item.id }}"
                    class="btn btn-line waves-effect"
                  >Создать</router-link>
                  <div class="info">
                    <a href="#">Посмотреть инструкцию</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="list-mod-objects">
          <div
            class="item"
            :class="{'no-active': !item.selected}"
            v-for="(item, i) in list"
            :key="i"
          >
            <router-link :to="{ name: 'webchess', params: { id: 1, oid: item.id }}" class="img">
              <img :src="item.logo" v-if="item.logo" alt>
              <img :src="item.img" v-else-if="item.img" alt>
              <img :src="$store.state.mainurl+'/assets/panel/img/object.svg'" v-else alt>
            </router-link>
            <router-link :to="{ name: 'webchess', params: { id: 1, oid: item.id }}" class="info">
              <div class="title">{{item.name}}</div>
              <div class="site">{{item.sales_department_site}}</div>
            </router-link>
            <div class="bot-btn" v-if="item.selected">
              <span></span>
              <span></span>
              <span></span>
              <div class="a-nav">
                <router-link
                  :to="{ name: 'webchess', params: { id: 1, oid: item.id }}"
                  class="link"
                >Редактировать</router-link>
                <button class="link" @click="OffPermissions(item.id)">Отключить</button>
              </div>
            </div>
            <router-link
              class="off"
              v-else
              :to="{ name: 'webchess', params: { id: 1, oid: item.id }}"
            >
              <img :src="$store.state.mainurl+'/assets/panel/img/off.png'" alt>
            </router-link>
          </div>
        </div>
      </div>

      <noObjedcts v-else></noObjedcts>
    </div>
  </div>
</template>

<script>
export default {
  name: "webchess",
  data() {
    return {
      search: null
    };
  },

  created() {
    if (!this.$store.state.myObjects) {
      //  this.$store.commit("loadMyObjects");
    }

    this.$store.commit("loadPermissions", "web");
    window.routeParam = { name: this.$route.name, params: this.$route.params };
  },

  mounted() {},
  computed: {
    list() {
      let data = this.perObjects("web");
      if (this.search) {
        data = this.lodash.filter(data, o => {
          return this.lodash.includes(
            o.name.toLowerCase(),
            this.search.toLowerCase()
          );
        });
      }
      return data;
    }
  },
  watch: {
    countObjects() {}
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.main-list {
}
.btn-line {
  min-width: 140px;
}
</style>
