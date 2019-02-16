<template>
  <div class="modal-right">
    <div class="modal-heading">
      <div>{{$store.state.rmodal.title}}</div>
      <div class="modal-close" @click="closeRmodal"></div>
    </div>
    <div class="content">
      <mUser :data="user" v-if="$store.state.rmodal.type == 'addUser'"></mUser>
      <div v-if="$store.state.rmodal.type == 'editUser'" class="edit-user-list">
        <mUser :data="$store.state.users[user]" v-for="(user, i) in userIds" :key="i"></mUser>
      </div>
      <div class="text-center">
        <button
          class="btn btn-or btn-md waves-effect"
          v-if="$store.state.rmodal.type == 'addUser'"
          @click="addUser"
        >Добавить пользователя</button>
        <button
          class="btn btn-or btn-md waves-effect"
          v-if="$store.state.rmodal.type == 'editUser'"
          @click="saveUsers"
        >Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import mUser from "@/components/modal/mUser";

export default {
  name: "modalRight",
  props: ["userIds"],
  data() {
    return {
      data: {},
      search: null,
      user: {
        fullname: null,
        email: null,
        internalKey: 0,
        extended: {
          email: null,
          type: 1,
          mainId: this.$store.state.user.internalKey
        },
        dataPer: {}
      }
    };
  },

  components: {
    mUser
  },

  created() {},

  mounted() {},
  computed: {},
  methods: {
    validForm(user = null) {
      if (!user) {
        user = this.user;
      }
      if (!user.fullname) {
        this.mesError("Заполните имя!");
        return false;
      }

      if (!this.isAddress(user.email)) {
        this.mesError("Некорректный Email адресс!");
        return false;
      }

      if (!this.isGmailAddress(user.extended.email)) {
        this.mesError("Некорректный gmail адресс!");
        return false;
      }
      return true;
    },
    addUser() {
      let fillData = this.FilterPremSelected(window.newUserPr);
      // console.log(fillData);
      // return;
      if (!this.validForm()) return;

      $.post(
        this.$store.state.apiurl,
        {
          action: "addUser",
          data: this.user,
          prem: fillData
        },
        data => {
          if (data.type == "success") {
            this.saveOk();
            this.$store.commit("getUsers");
            this.$store.commit("loadUserPermissions");
            this.$store.commit("loadRmodal", {
              type: null
            });
          }
        },
        "json"
      );
    },
    saveUsers() {
      let users = {};
      let pr = {};
      //  console.log(this.userIds, this.$store.state.users);
      for (let user of this.userIds) {
        users[user] = this.$store.state.users[user];
        //  console.log(users[user], user);

        if (!this.validForm(users[user])) return;
      }

      // console.log(pr);
      // return;
      $.post(
        this.$store.state.apiurl,
        {
          action: "saveUsers",
          data: users
          //  prem: pr
        },
        data => {
          if (data.type == "success") {
            this.saveOk();

            //  this.$store.commit("getUsers");
            //  this.$store.commit("loadUserPermissions");

            // this.$store.commit("loadRmodal", {
            //   type: null
            // });
            // this.$bus.emit("clearUsers", []);
          }
        },
        "json"
      );

      for (let user of this.userIds) {
        pr[user] = this.FilterPremSelected(
          this.$store.state.permissionsCMS[user]
        );

        //  console.log(pr[user]);

        $.ajax({
          url: this.$root.mainurl + "/api?action=updateUserPermissions&ut=cms",
          dataType: "json",
          data: {
            permissions_data: JSON.stringify(pr[user]),
            agent_id: user
          },
          method: "POST"
        }).done(response => {
          console.log("save user" + user, response);
        });
      }

      setTimeout(() => {
        location.reload();
        // this.$store.commit("loadPermissionsCMS", this.userIds);
        // setTimeout(() => {
        //   for (let user of this.userIds) {
        //   }
        // }, 1000);
      }, 2000);
    },
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss">
.modal-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 450px;
  background: #fff;
  bottom: 0;
  z-index: 500;
  overflow-y: auto;
  .edit-user-list {
    .item-user {
      margin-bottom: 30px;
      padding-bottom: 10px;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        height: 1px;
        background: #cbd6e2;
        left: -25px;
        right: -25px;
        bottom: 0;
        opacity: 0.5;
      }
      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        &:before {
          content: none;
        }
      }
    }
  }

  .content {
    padding: 30px 25px 30px;
  }

  .modal-close {
    margin-top: -5px;
    cursor: pointer;
    &:before {
      line-height: 1;
      content: "\D7";
      height: 20px;
      font-size: 26px;
      display: block;
    }
  }
}

.modal-heading {
  padding: 20px 30px;
  color: #fff;
  background: linear-gradient(
    to right,
    rgba(0, 171, 182, 1) 0%,
    rgba(0, 188, 165, 1) 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 50;
  top: 0;
  left: 0;
  right: 0;
  font-size: 18px;
}

.js-per-list {
  display: none;
}
.cus-check {
  line-height: 1;
  .title {
    line-height: 1;
    font-size: 15px;
    display: block;
  }
  .t2 {
    font-size: 13px;
    line-height: 1;
    text-decoration: underline;
    color: #33475b;
    &:hover {
      text-decoration: none;
    }
  }
}

.list-obj-m {
  .item-obj {
    margin-top: 10px;
    margin-bottom: 25px;
  }

  .text-border {
    margin-top: 7px;
  }
}
</style>
