<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Подключение агентств недвижимости</div>
      </div>
    </div>

      <router-link
      :to="{ name: 'new_agent', params: { id: 1 }}"
      class="circle-btn"
      v-if="$store.state.isMobile"
    >
      <div class="plus"></div>
    </router-link>

    <toolNav v-if="$store.state.isMobile"></toolNav>

    <div class="main-container container">
      <div v-if="countObjects">
        <div class="inst-list main-list" v-if="!$store.state.isMobile">
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <div class="item item-add">
                <div class="title">Добавить нового агента</div>
                <div class="img">
                  <img :src="$root.mainurl +'/assets/panel/img/team.png'" alt>
                </div>
                <div class="btns">
                  <router-link
                    :to="{ name: 'new_agent', params: { id: 1 }}"
                    class="btn btn-default btn-md waves-effect"
                  >ДОБАВИТЬ</router-link>
                </div>
                <div class="info">
                  <a href="#">Посмотреть инструкцию</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="list-mod-objects">
            <!-- <div class="item">
            <div class="img">
              <img :src="$store.state.mainurl+'/assets/panel/img/team.png'" alt>
            </div>
             <div class="info">
              <div class>Добавить нового агента</div>
            </div>
            <router-link
              :to="{ name: 'new_agent', params: { id: 1 }}"
              class="btn btn-line waves-effect"
            >ДОБАВИТЬ</router-link>
            </div>-->
          </div>
        </div>
      </div>

      <noObjedcts v-else></noObjedcts>
    </div>
  </div>
</template>

<script>
export default {
  name: "instAgent",
  data() {
    return {
      //  list: []

      search: null
    };
  },

  created() {
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
  methods: {}
};
</script>

<style lang="scss">
</style>
