<template>
  <div class="main-header">
    <div class="container">
      <div class="left">
        <div class="logo">
          <router-link to="/">
            <img src="https://flatris.com.ua/assets/images/logo/logo_full_w.svg" alt>
          </router-link>
        </div>

        <div class="mob-nav" :class="{'active': mobNav}">
          <div class="close-modal-nav hidden-lg" @click="mobNav = false"></div>
          <div class="main-nav">
            <ul>
              <li>
                <router-link to="/" class="waves-effect">Рабочий стол</router-link>
              </li>
              <li class="parent" @click="slideDW">
                <router-link
                  to="/objects/my"
                  v-if="!$store.state.isMobile"
                  class="waves-effect"
                >Объекты</router-link>
                <a v-else class="waves-effect">Объекты</a>
                <ul>
                  <li>
                    <router-link to="/objects/my">Мои объекты</router-link>
                  </li>
                  <li>
                    <router-link to="/objects/other">Доступные мне объекты</router-link>
                  </li>
                  <li class="line">
                    <router-link
                      :to="{ name: 'new_object', params: { id: 1 }}"
                    >Добавить новый объект</router-link>
                  </li>
                </ul>
              </li>
              <li :class="{'parent': !$store.state.isMobile}">
                <a href="#" v-if="!$store.state.isMobile">Инструменты</a>
                <router-link v-else to="/inst/mob">Инструменты</router-link>
                <ul class="w2" v-if="!$store.state.isMobile">
                  <li>
                    <router-link to="/inst/webchess">Интерактивный каталог для сайта</router-link>
                  </li>
                  <li>
                    <router-link to="/inst/crm">Шахматка для отдела продаж</router-link>
                  </li>
                  <li>
                    <router-link to="/inst/portals">Размещение на порталах недвижимости</router-link>
                  </li>
                  <li>
                    <router-link to="/inst/agent">Подключение агентств недвижимости</router-link>
                  </li>
                  <li class="line">
                    <router-link to="/inst/api">Интеграция по API</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="$store.state.isMobile">
                <router-link to="/settings" class="waves-effect">Настройки</router-link>
              </li>
              <li v-if="$store.state.isMobile">
                <router-link to="/settings/user" class="waves-effect">Профиль</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="icons">
          <a href="#" @click.prevent="mesPop">
            <svg>
              <use xlink:href="#icon-bubble"></use>
            </svg>
          </a>

          <!-- <a href="#">
            <svg>
              <use xlink:href="#icon-bell"></use>
            </svg>
          </a>-->

          <router-link
            v-if="!$store.state.isMobile"
            :to="{ name: 'settings', params: { id: 'user' }}"
            title="Настройки"
          >
            <svg>
              <use xlink:href="#icon-gear"></use>
            </svg>
          </router-link>
        </div>
        <div class="v-line"></div>

        <div class="btn-group">
          <div class="main-nav">
            <ul>
              <li class="parent" :class="{'active': showMenu}">
                <a href="#" @click.prevent="showMenu = !showMenu">
                  <div class="avatar">
                    <img
                      :src="$store.state.mainurl +'/'+$store.state.user.photo"
                      v-if="$store.state.user.photo"
                      alt
                    >
                    <img :src="$store.state.mainurl +'/assets/panel/img/user2.svg'" v-else alt>
                  </div>
                  {{name}}
                </a>
              </li>
            </ul>
          </div>
          <div class="user-nav dropdown-menu dropdown-menu-right" :class="{'show': showMenu}">
            <div class="dropdown-item-text user-header">
              <div class="avatar">
                <img
                  :src="$store.state.mainurl +'/'+$store.state.user.photo"
                  v-if="$store.state.user.photo"
                  alt
                >
                <img :src="$store.state.mainurl +'/assets/panel/img/user2.svg'" v-else alt>
              </div>
              <div class="inf">
                <div class="name">{{$store.state.user.fullname}}</div>
                <div class="email">{{$store.state.user.email}}</div>
                <div class="edit">
                  <router-link
                    class="link"
                    :to="{ name: 'settings', params: { id: 'user' }}"
                    title="Настройки"
                  >Редактировать профиль</router-link>
                </div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item-text info">
              <div>
                <b>Компания:</b>
                {{$store.state.user.fax}}
              </div>
              <div>
                <b>ID компании:</b>
                {{$store.state.user.internalKey}}
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <router-link
              class="dropdown-item"
              :to="{ name: 'settings', params: { id: 'orders' }}"
              title="Настройки"
            >Заказы и оплаты</router-link>

            <a
              class="dropdown-item"
              target="_blank"
              href="https://flatris.com.ua/wiki/poshagovaya-nastrojka/sozdanie-obekta"
            >База знаний</a>
            <a class="dropdown-item" @click.prevent="mesPop" href="#">Служба поддержки</a>
            <div class="dropdown-divider"></div>
            <a
              class="dropdown-item link"
              href="https://test.flatris.com.ua/login?service=logout"
            >Выход с аккаунта</a>
          </div>
        </div>

        <div class="burger" @click="mobNav = true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="mask-site" @click="mobNav = false" :class="{'active': mobNav}"></div>
  </div>
</template>

<script>
export default {
  name: "mainHeader",

  data() {
    return {
      showMenu: false,
      mobNav: false
    };
  },

  watch: {
    $route() {
      this.mobNav = false;

      this.setPosMobNav();
    }
  },

  computed: {
    name() {
      if (this.$store.state.user.fax) {
        return this.$store.state.user.fax;
      } else {
        return this.$store.state.user.fullname;
      }
    }
  },
  created() {},
  updated() {},
  mounted() {
    $(document).on("click", e => {
      if (
        !$(e.target)
          .closest(".btn-group")
          .hasClass("btn-group")
      ) {
        this.showMenu = false;
      }
    });
    this.setPosMobNav();
  },
  methods: {
    slideDW(e) {
      //  console.log(e);
      let parent = $(e.target)
        .parent()
        .find("ul");
      parent.slideToggle(0);
    },
    setPosMobNav() {
      setTimeout(() => {
        if ($(".line-nav").length && $(".line-nav .router-link-active")[0]) {
          let l =
            $(".line-nav .router-link-active")[0].offsetLeft -
            $(".line-nav .router-link-active").outerWidth() / 2;
          $(".line-nav").scrollLeft(l);
        }
      }, 20);
    },
    mesPop() {
      swal({
        title: "Выберете удобный для вас канал связи",
        html: `
        <div class="">
<div class="mes-list">
<a href="https://tele.click/Flatris_bot" target="_blank" class="item">
<div class="ico"><img src="https://flatris.com.ua/assets/site/images/mes/Telegram.png" alt=""></div>
<div class="title">Telegram</div>
</a>
<a href="viber://pa?chatURI=flatris" class="item">
<div class="ico"><img src="https://flatris.com.ua/assets/site/images/mes/viber.png" class="viber" alt=""></div>
<div class="title">Viber</div>
</a>
<a href="http://m.me/2149283131965851" class="item" target="_blank">
<div class="ico"><img src="https://flatris.com.ua/assets/site/images/mes/Facebook_Messenger.png" alt=""></div>
<div class="title">Facebook</div>
</a>
</div>
</div>
        `,
        //   focusConfirm: false,
        showConfirmButton: false
      });
    }
  }
};
</script>

<style lang="scss">
.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  .avatar {
    margin-right: 15px;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 2px solid #cbd6e2;
    }
  }

  .name {
    font-size: 24px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    a {
      margin-left: 10px;
      display: block;
      height: 26px;
      margin-top: -8px;
    }
    svg {
      width: 18px;
      height: 18px;
      fill: #2e3f50;
    }
  }

  .type {
    padding: 6px 12px;
    border: 2px solid #cbd6e2;
    display: inline-block;
    border-radius: 5px;
    background: #fff;
  }
}
.user-nav {
  min-width: 300px;
  font-size: 13px;
  .info {
    > div {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .user-header {
    margin-bottom: 0;
    .avatar {
      margin-left: -5px;
      img {
        width: 48px;
        height: 48px;
      }
    }
    .name {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .email {
      margin-bottom: 4px;
      font-size: 12px;
      color: #cdd8e1;
    }
  }
  a.link {
    color: #40c0a9;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
.main-header {
  border-top: 2px solid #8adbcc;
  background: #2e3f50;
  color: #2e3f50;
  // margin-bottom: 30px;
  // padding-top: 10px;
  //  padding-bottom: 10px;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
  }
  .logo {
    line-height: normal;
    margin-right: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
    img {
      width: 120px;
    }
    a {
      display: block;
      // height: 44px;
    }
    svg {
      width: 36px;
      fill: #fff;
      height: 44px;
    }
  }

  .left {
    display: flex;
    align-items: center;
  }
  a {
    color: #fff;
  }
  .main-nav {
    ul {
      margin: 0;
      list-style: none;
      padding: 0;
    }
    > ul {
      display: flex;

      > li {
        position: relative;
        > a {
          height: 60px;
          display: flex;
          align-items: center;
          padding: 5px 20px;
          transition: all 0.3s ease;
          &.router-link-exact-active {
            background: #1d3751;
          }
          &:hover {
          }
        }
        &.parent {
          > a {
            &:after {
              content: "";
              display: inline-block;
              width: 6px;
              height: 6px;
              border-bottom: 1px solid #fff;
              border-right: 1px solid #fff;
              margin-left: 7px;
              transform: rotate(45deg);
              transition: all 0.3s ease;
            }
          }
        }
        &:hover {
          > a {
            background: #1d3751;
            &:after {
              border-color: #1ab797;
            }
          }
          ul {
            opacity: 1;
            visibility: visible;
            transform: translate(0, 0);
          }
        }
        ul {
          opacity: 0;
          transition: all 0.3s ease;
          visibility: hidden;
          transform: translate(0, 20px);
          position: absolute;
          top: 100%;
          background: rgba(29, 55, 81, 1);
          left: 0px;
          padding: 10px 20px 15px 20px;
          min-width: 210px;
          z-index: 100;
          a {
            padding-top: 5px;
            padding-bottom: 5px;
            transition: all 0.3s ease;
            &:hover {
              text-decoration: underline;
              //  background: rgba(29, 55, 81, 1);
            }
          }
          .line {
            border-top: 1px solid rgba(255, 255, 255, 0.5);
            padding-top: 8px;
            margin-top: 10px;
          }
          &.w2 {
            min-width: 330px;
          }
        }
      }
    }
    a {
      display: block;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  .v-line {
    background: rgba(255, 255, 255, 0.2);
    width: 2px;
    height: 40px;
    margin: 0 40px;
  }

  .icons {
    display: flex;
    align-items: center;
    a {
      display: block;
      margin: 0 10px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    svg {
      width: 26px;
      height: 26px;
      fill: #fff;
    }
  }

  .avatar {
    margin-right: 20px;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #40c0a95b;
    }
  }
}

.dropdown-menu {
  &.show {
    display: block;
  }
  a {
    color: #000;
  }
}

.mes-list {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  text-align: center;

  .item {
    display: block;
    outline: none;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .ico {
    margin-bottom: 15px;

    img {
      width: 100px;
    }

    .viber {
      transform: scale(1.15);
    }
  }
}
@media (min-width: 991px) {
  .main-header {
    .container {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
}

@media (max-width: 768px) {
  .main-header .logo {
    max-width: 34px;
    overflow: hidden;
  }
  .mob-nav .main-nav > ul > li > a {
    background: #3f5a6c !important;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .main-header .main-nav > ul > li ul a.router-link-active {
    background: #1d3751;
  }
  .mob-nav .main-nav > ul > li > ul {
    padding: 0;
  }
  // .main-header .main-nav > ul > li ul .line {
  //   //   display: none;
  //   margin: 0;
  //   padding: 0;
  //   border: none;
  // }

  .mob-nav .parent {
    ul {
      display: none;
    }
  }
}

@media (max-width: 576px) {
  .main-header {
    .v-line,
    .btn-group {
      display: none;
    }
  }
}
</style>
