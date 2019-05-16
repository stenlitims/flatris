<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Шахматка для отдела продаж</div>
      </div>
    </div>

    <toolNav v-if="$store.state.isMobile"></toolNav>

    <div class="main-container container">
      <div v-if="countObjects">
        <div class="inst-list main-list" v-if="!$store.state.isMobile">
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <div class="item">
                <div class="title">Интеграция с AmoCRM</div>
                <div class="img img-m">
                  <img :src="$store.state.mainurl+'/assets/panel/img/amocrm.png'" alt>
                </div>
                <div>
                  <router-link
                    :to="{ name: 'new_amo', params: { id: 1 }}"
                    class="btn btn-default waves-effect"
                  >ПОДКЛЮЧИТЬ</router-link>
                  <div class="info">
                    <a href="#">Посмотреть инструкцию</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="item">
                <div class="soon">скоро</div>
                <div class="title">Интеграция с Bitrix24</div>
                <div class="img img-m">
                  <img :src="$store.state.mainurl+'/assets/panel/img/logo-bx24.png'" alt>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="item">
                <div class="soon">скоро</div>
                <div class="title">FlatrisCRM для застройщика</div>
                <div class="img img-m">
                  <img :src="$store.state.mainurl+'/assets/panel/img/flatris.svg'" alt>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="list-mod-objects">
          <div class="item" :class="{'no-active':status}">
            <router-link :to="{ name: 'new_amo', params: { id: 1 }}" class="img">
              <img :src="$store.state.mainurl+'/assets/panel/img/amocrm.png'" alt>
            </router-link>
            <router-link :to="{ name: 'new_amo', params: { id: 1 }}" class="info">
              <div class>Интеграция с AmoCRM</div>
            </router-link>
            <router-link
              :to="{ name: 'new_amo', params: { id: 1 }}"
              class="off"
            ><img :src="$store.state.mainurl+'/assets/panel/img/off.png'" alt></router-link>
          </div>
        </div>
      </div>

      <noObjedcts v-else></noObjedcts>
    </div>
  </div>
</template>

<script>
export default {
  name: "instCRM",
  data() {
    return {};
  },

  created() {
    window.routeParam = { name: this.$route.name, params: this.$route.params };
    this.$store.commit("getAmo");
  },

  mounted() {},
  computed: {
    status() {
      if (!this.$store.state.amo) return false;
      return this.$store.state.amo.status;
    }
    // list() {
    //   let data = this.perObjects("web");
    //   if (this.search) {
    //     data = this.lodash.filter(data, o => {
    //       return this.lodash.includes(
    //         o.name.toLowerCase(),
    //         this.search.toLowerCase()
    //       );
    //     });
    //   }
    //   return data;
    // }
  },
  methods: {}
};
</script>

<style lang="scss">
</style>
