<template>
  <div>
    <div class="mob-heading2">
      <div class="container">
        <div class="title">Инструменты</div>
      </div>
      <div class="line-nav">
        <div class="inner"></div>
      </div>
    </div>


      <div class="list-nav-icons">
        <router-link class="item" to="/inst/webchess">
        <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/main/3.png'" alt="">
        </div>
        Интерактивный каталог для сайта</router-link>
        <router-link class="item" to="/inst/crm">
        <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/main/4.png'" alt="">
        </div>
        Шахматка для отдела продаж</router-link>
        <router-link class="item" to="/inst/portals">
         <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/main/5.png'" alt="">
        </div>
        Размещение на порталах недвижимости</router-link>
        <router-link class="item" to="/inst/agent">
         <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/main/6.png'" alt="">
        </div>
        Подключение агентств недвижимости</router-link>
        <router-link class="item" to="/inst/api">
        <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/api.svg'" alt="">
        </div>
        Интеграция по API</router-link>
      </div>
    
  </div>
</template>

<script>
export default {
  name: "instMob",
  data() {
    return {
      search: null
    };
  },

  created() {},

  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
