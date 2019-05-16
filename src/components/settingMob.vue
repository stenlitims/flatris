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
      <router-link class="item it1" :to="{ name: 'settings', params: { id: 'user' }}">
        <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/settings/1.svg'" alt>
        </div>Аккаунт
      </router-link>
      <router-link class="item it2" :to="{ name: 'settings', params: { id: 'notification' }}">
        <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/settings/2.svg'" alt>
        </div>Уведомления
      </router-link>
      <router-link class="item it3" :to="{ name: 'settings', params: { id: 'users' }}">
        <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/settings/3.svg'" alt>
        </div>Пользователи
      </router-link>
      <router-link class="item it4" :to="{ name: 'settings', params: { id: 'tarif' }}">
        <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/settings/4.svg'" alt>
        </div>Тарифы
      </router-link>
      <router-link class="item it5" :to="{ name: 'settings', params: { id: 'orders' }}">
        <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/settings/5.svg'" alt>
        </div>Заказы и оплаты
      </router-link>
      <a class="item" href="https://test.flatris.com.ua/login?service=logout">
      <div class="ico">
          <img :src="$root.mainurl + '/assets/panel/img/settings/6.svg'" alt>
        </div>
        <div>
  Выход с аккаунта  <br> <span class="email">{{$store.state.user.email}}</span> 
        </div>
    </a>
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
