<template>
  <div>
    <div class="heading">
      <div class="main-container container">Настройки</div>
    </div>
    <div class="mob-heading2" v-if="$store.state.isMobile">
      <div class="container">
        <div class="title">Настройки</div>
      </div>
      <div class="line-nav">
        <div class="inner">
          <router-link class="item it1" :to="{ name: 'settings', params: { id: 'user' }}">Аккаунт</router-link>
          <!-- <router-link class="item it2" :to="{ name: 'settings', params: { id: 'notification' }}">Уведомления</router-link> -->
          <router-link class="item it3" :to="{ name: 'settings', params: { id: 'users' }}">Пользователи</router-link>
          <router-link class="item it4" :to="{ name: 'settings', params: { id: 'tarif' }}">Тарифы</router-link>
          <router-link class="item it5" :to="{ name: 'settings', params: { id: 'orders' }}">Заказы и оплаты</router-link>
          
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-3 col-lg-2 wrap-left-nav" v-if="!$store.state.isMobile">
          <div class="left-nav">
            
            <ul>
              <li>
                <router-link :to="{ name: 'settings', params: { id: 'user' }}">Аккаунт</router-link>
              </li>
              <li class="parent" :class="{'open': nav.inst}">
                <a href="#" @click.prevent="nav.inst = !nav.inst">Инструменты</a>
                <slide-up-down :active="nav.inst" :duration="300">
                  <ul>
                    <li>
                      <router-link
                        :to="{ name: 'settings', params: { id: 'webchess' }}"
                      >Интерактивный каталог для сайта</router-link>
                    </li>
                    <li>
                      <router-link
                        :to="{ name: 'settings', params: { id: 'crm' }}"
                      >Шахматка для отдела продаж</router-link>
                    </li>
                    <li>
                      <router-link
                        :to="{ name: 'settings', params: { id: 'portals' }}"
                      >Размещение на порталах недвижимости</router-link>
                    </li>
                    <li>
                      <router-link
                        :to="{ name: 'settings', params: { id: 'agents' }}"
                      >Подключение агентств недвижимости</router-link>
                    </li>
                  </ul>
                </slide-up-down>
              </li>
              <li @click="nav.inst = false" v-if="$sudo">
                <router-link :to="{ name: 'settings', params: { id: 'reports' }}">Отчеты</router-link>
              </li>
              <li @click="nav.inst = false">
                <router-link :to="{ name: 'settings', params: { id: 'users' }}">Пользователи</router-link>
              </li>
              <!-- <li @click="nav.inst = false">
                <router-link :to="{ name: 'settings', params: { id: 'goals' }}">Цели</router-link>
              </li> -->
              <li @click="nav.inst = false" v-if="userType < 3">
                <router-link :to="{ name: 'settings', params: { id: 'tarif' }}">Тарифы</router-link>
              </li>
              <li @click="nav.inst = false">
                <router-link :to="{ name: 'settings', params: { id: 'orders' }}">Заказы и оплаты</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9 col-lg-10 settings-content">
          <!-- <div style="display:none">{{$route.name}} {{$route.params.id}}</div> -->
          <!-- <transition name="center" mode="out-in"></transition> -->
          <component :is="component" @userIds="userIds = $event" ref="comSetting"></component>
        </div>
      </div>
    </div>

    <savePanel v-if="$store.state.changes.count.length"></savePanel>
    <savePanel
      v-if="userIds.length && !$store.state.isMobile"
      @userIds="userIds = []"
      prop="users"
      :ids="userIds"
      :title="'Вы выбрали '+userIds.length+' '+Declension(userIds.length, ['пользователя', 'пользователя', 'пользователей'] )+ '.'"
    ></savePanel>
    <transition name="sright">
      <modalRight @userIds="userIds = $event" v-if="$store.state.rmodal.type" :userIds="userIds"></modalRight>
    </transition>
  </div>
</template>

<script>
import user from "@/components/settings/user";
import notification from "@/components/settings/notification";
import objects from "@/components/settings/objects";
import tarif from "@/components/settings/tarif";
import webchess from "@/components/settings/webchess";
import orders from "@/components/settings/orders";
import crm from "@/components/settings/crm";
import portals from "@/components/settings/portals";
import agents from "@/components/settings/agents";
import reports from "@/components/settings/reports";
import users from "@/components/settings/users";
import goals from "@/components/settings/goals"; // Цели
import savePanel from "@/components/savePanel";
import modalRight from "@/components/settings/modalRight";

export default {
  name: "settings",
  data() {
    return {
      nav: {
        inst: false,
        instItems: ["webchess", "crm", "portals", "agents"]
      },
      userIds: []
    };
  },

  components: {
    user,
    users,
    notification,
    objects,
    tarif,
    webchess,
    orders,
    crm,
    portals,
    agents,
    reports,
    goals,
    savePanel,
    modalRight
  },

  created() {
    window.routeName = this.$route.name;
    if (this.nav.instItems.includes(this.$route.params.id)) {
      this.nav.inst = true;
    }
    if (!this.$store.state.userSettings) {
      this.$store.commit("loadUserSettings", "test");
    }
  },

  beforeDestroy() {},

  watch: {
    // userIds(){
    //   if(!this.userIds.length){
    //   }
    // }
  },

  mounted() {},
  computed: {
    component() {
      if (this.$route.params.id) {
        let id = this.$route.params.id;
        if (this.comPermissions[id]) {
          if (this.comPermissions[id].includes(this.userType)) {
            return "permissionDenied";
          }
        }
        return this.$route.params.id;
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.left-nav {
  padding-left: 10px;
  a {
    color: #33475b;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    ul {
      padding-left: 20px;
    }
    a {
      display: inline-block;
      transition: all 0.3s ease;
      &.router-link-exact-active,
      &:hover {
        background: #c4ede5;
      }
      &.router-link-exact-active {
        font-weight: bold;
      }
    }
  }
  > ul {
    > li {
      margin-bottom: 5px;
      > a {
        padding: 4px 8px;
        font-size: 15px;
      }
      &.parent {
        > a {
          display: inline-flex;
          align-items: center;
          &:after {
            content: "";
            display: inline-block;
            width: 6px;
            height: 6px;
            border-bottom: 1px solid #000;
            border-right: 1px solid #000;
            margin-left: 8px;
            margin-right: 5px;
            //  margin-top: 6px;
            transform: rotate(45deg);
            transition: all 0.3s ease;
          }
        }
        &.open {
          > a {
            &:after {
              margin-top: 6px;
              transform: rotate(-135deg);
            }
          }
        }
      }
      ul {
        margin-top: 5px;
        li {
          margin-bottom: 4px;
        }
        a {
          padding: 4px 8px;
          font-size: 14px;
        }
      }
    }
  }
}

.settings-right {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  h3 {
    margin-top: 0;
    margin-bottom: 30px;
  }
  .row {
    margin-right: -20px;
    margin-left: -20px;
    > div {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
}

.list-settings {
  .item {
    margin-bottom: 30px;
  }
  .c-btns {
    .btn {
      margin: 0 10px;
    }
  }
}

.settings-btns {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  .form-group {
    margin-bottom: 0;
  }
  h3 {
    margin-bottom: 0;
  }
}

@media (max-width: 991px) {
  .settings-right h3{
    display: none;
  }
  .settings-content{
    padding-bottom: 20px;
  }
}
</style>
