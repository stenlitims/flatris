<template>
  <div id="app" :class="'page'+$route.name">
    <mainHeader></mainHeader>
    <div class="main">
      <router-view/>
      <!-- <transition name="center" mode="out-in">
       
      </transition>-->
    </div>
    <transition name="fade">
      <div v-if="$store.state.rmodal.type" class="shadow-modal" @click="closeRmodal"></div>
    </transition>
    <svgSp></svgSp>
  </div>
</template>

<script>
import mainHeader from "@/components/mainHeader";
import svgSp from "@/components/svg";
import store from "@/store";
import swal from "sweetalert2";

window.swal = swal;

export default {
  name: "App",
  components: {
    mainHeader,
    svgSp
  },
  created() {
    this.$store.commit("loadUser");
    this.$store.commit("loadMyObjects", "test");
  },
  mounted() {
    // console.log(this.$store.state.user);
    if (this.$root.isMobile) {
      $(document).on(
        "focus",
        "input[type=text], input[type=email]",
        function() {
          $(".page-master").addClass("hide-footer");
        }
      );

      $(document).on("blur", "input[type=text], input[type=email]", function() {
        $(".page-master").removeClass("hide-footer");
      });
    }
  }
};

$(document).on("change", ".up-file input", function() {
  var lbl = $(this)
    .parent()
    .find(".name");
  var file_name;
  file_name = $(this).val();
  if (!file_name.length) return;
  file_name = file_name.replace("C:\\fakepath\\", "");
  lbl.text(file_name);
});
</script>

<style lang="scss">
#app {
  color: #33475b;
  min-height: calc(var(--vh, 1vh) * 100);
}

.shadow-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 400;
  background: rgba(0, 0, 0, 0.7);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.sright-enter-active,
.sright-leave-active {
  transition: all 0.3s ease;
}
.sright-enter,
.sright-leave-to {
  transform: translate(100%, 0);
}

.bottom-panel {
  padding-bottom: 90px;
}

body {
  background: rgb(245, 248, 250);
}

/* width */
.c-sc::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.c-sc::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.c-sc::-webkit-scrollbar-thumb {
  background: rgb(130, 190, 177);
}

/* Handle on hover */
.c-sc::-webkit-scrollbar-thumb:hover {
  background: rgb(95, 190, 170);
}

a {
  color: #40c0a9;
}

.container {
  max-width: 100%;
}

.main-container {
  //  max-width: 1440px;
  padding-left: 25px;
  padding-right: 25px;
}

.search {
  position: relative;
  .fa {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 19px;
    color: #cbd6e2;
  }

  input {
    background: #f5f8fa;
    border-color: #cbd6e2;
    color: #33475b;
  }

  // ::-webkit-input-placeholder {
  //   opacity: 1;
  //   color: #cbd6e2;
  // }
  // ::-moz-placeholder {
  //   opacity: 1;
  //   color: #cbd6e2;
  // }
}

.heading {
  padding-top: 40px;
  font-size: 28px;
  padding-bottom: 30px;
  margin-bottom: 50px;
  border-bottom: 2px solid #e6e6e6;
  background: #fff;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .r {
    > .btn {
      margin-left: 30px;
    }
  }

  .search {
    margin-bottom: 0;
    min-width: 300px;
  }
  // padding-left: 15px;
}

.control-wrap {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  justify-content: space-between;
  border-radius: 5px;
  border: 2px solid #cbd6e2;
  .c-title {
    font-weight: bold;
  }
}

.btn {
  border-radius: 5px;
  border-width: 2px;
  &:focus {
    box-shadow: none;
  }
}

.pass-control {
  margin-top: 20px;
}

.eye {
  width: 30px;
  height: 30px;
  cursor: pointer;
  img {
    width: 100%;
  }
}

.more-dots {
  display: inline-block;
  width: 3px;
  cursor: pointer;

  span {
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #98a6ad;
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.btn-success:not(:disabled):not(.disabled).active,
.btn-success:not(:disabled):not(.disabled):active,
.show > .btn-success.dropdown-toggle {
  background-color: #199c82;
  border-color: #199c82;
}

.btn-outline-primary {
  border-color: #cbd6e2;
  background: #eaf0f6;
  color: #506e91;
  &:hover {
    background: #2e3f50;
    border-color: #2e3f50;
  }
}

.btn-outline-primary2 {
  border-color: #cbd6e2;
  background: #fff;
  color: #506e91;
  &:hover {
    background: #2e3f50;
    border-color: #2e3f50;
    color: #fff;
  }
}

.btn-success {
  background: #5fbeaa;
  border-color: #5fbeaa;
  &:hover {
    background: #58b09d;
    border-color: #58b09d;
  }
}

.btn-outline-success {
  border-color: #5fbeaa;
  color: #5fbeaa;
  &:hover {
    background: #5fbeaa;
    border-color: #5fbeaa;
  }
}

.btn-danger {
  background: #f36b7a;
  border-color: #f36b7a;
  &:hover {
    background: #e46473;
    border-color: #e46473;
  }
}

.search-wrap {
  justify-content: flex-end;
  margin-bottom: 20px;
}

.main-list {
  line-height: 1.2;
  > .row {
    margin-right: -15px;
    margin-left: -15px;
    > div {
      padding-left: 15px;
      padding-right: 15px;
      margin-bottom: 30px;
    }
  }
  .item {
    text-align: center;
    background: #fff;
    padding: 40px 15px 30px;
    border: 1px solid #cbd6e2;
    border-radius: 5px;
    height: 100%;
  }

  .item-add {
    border: 2px dashed #38c0ac;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .img {
      margin-top: 10px;
      margin-bottom: 30px;
    }
    .title {
      font-size: 20px;
      //margin-bottom: 0px;
    }
  }

  .img {
    height: 160px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-height: 160px;
      max-width: 100%;
      min-width: 70%;
      object-fit: contain;
    }
  }

  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .check {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    svg {
      fill: #fff;
      width: 40px;
      height: 40px;
    }
    background: #5fbeaa;
  }

  .btns {
    margin-bottom: 15px;
  }
  .info {
    a {
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.inst-list {
  .item {
    position: relative;
  }
  .soon {
    background: #f36b7a;
    position: absolute;
    top: 10px;
    right: -20px;
    text-transform: uppercase;
    padding: 7px 15px;
    border-radius: 3px;
    color: #fff;
  }
  .title {
    font-size: 20px;
  }
  .info {
    margin-top: 12px;
  }
  .img {
    img {
      max-width: 90%;
    }
  }
  .btns {
    .btn {
      margin: 0 7px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.del-btn {
  background: #ff4124;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  &.abs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
  span {
    transform: rotate(45deg);
    display: block;
    font-size: 20px;
  }
}

body .swal2-popup .btn-line.swal2-cancel {
  font-size: 0.9rem;
}

.btn-line,
body .swal2-popup .btn-line.swal2-cancel {
  background: #fff;
  border: 2px solid #ff7a59;
  color: #ff7a59;
  box-shadow: none;
  outline: none;
  border-radius: 8px;
  &:before {
  }
  &.btn-prev {
    &:before {
      margin-right: 4px;
      content: "";
      width: 5px;
      height: 5px;
      display: inline-block;
      transform: rotate(135deg);
      vertical-align: middle;
      border-right: 1px solid #ff7a59;
      border-bottom: 1px solid #ff7a59;
      margin-top: -1px;
    }
  }
  &.btn-next {
    &:after {
      margin-left: 6px;
      content: "";
      width: 5px;
      height: 5px;
      display: inline-block;
      transform: rotate(-45deg);
      vertical-align: middle;
      border-right: 1px solid #ff7a59;
      border-bottom: 1px solid #ff7a59;
      margin-top: -1px;
    }
  }
  &.not-active {
    background: #eaf0f6 !important;
    border-color: #eaf0f6 !important;
    color: #b0c1d4 !important;
    &:after,
    &:before {
      border-color: #b0c1d4;
    }
  }
}

a.btn-line {
  color: #ff7a59;
}

.btn-or,
.swal2-popup .swal2-styled.swal2-confirm.btn-or {
  background: #ff7a59;
  color: #fff;
  &:hover {
    color: #fff;
  }
}

.swal2-popup .swal2-styled.swal2-confirm.btn-or {
  font-size: 0.9rem;
}

.swal2-popup .swal2-styled:focus {
  outline: 0;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(255, 122, 89, 0.36);
}

.btn-o {
  background: #ff7a59;
}

.hidden{
  display: none;
}

.pagesettings{
  .save-panel{
    z-index: 50;
  }
}

input[type="text"].form-control,
input[type="email"].form-control,
input[type="file"].form-control,
input[type="password"].form-control,
select.form-control,
div.form-control {
  background: #f5f8fa;
  border: 2px solid #cbd6e2;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    border: 2px solid #5fbeaa;
  }
}

div.form-control {
  height: inherit;
}

input[disabled].form-control,
select[disabled].form-control {
  opacity: 0.6;
}
.btn-md {
  padding: 10px 24px;
}

.loader {
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 500;
  }
  &:before {
    background: rgba(255, 255, 255, 0.5);
  }
  &:after {
    z-index: 501;
    background: url(https://flatris.com.ua/assets/images/preloader.svg)
      no-repeat center center;
  }
}

.loader2 {
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 500;
  }
  &:before {
    background: rgba(255, 255, 255, 0.6);
  }
}

.def-modal {
  position: fixed;
  top: 0;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  right: 0;
  left: 0;
  z-index: 999;
  background: #fff;
}

.alert {
  p {
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.up-file {
  position: relative;
  margin-bottom: 3px;
  input {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
  }
}

.img {
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .del-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease;
  }
}

.wrap-input {
  position: relative;
  input {
    //  height: 56px;
    //   padding-top: 13px;
  }
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-left: 12px;
    padding-right: 12px;
  }
}

.wrap-edit {
  .img {
    position: relative;
    min-height: 50px;
    text-align: center;
    margin-top: 0px;
    height: 138px;
    img {
      max-height: 100%;
    }
    &:hover {
      .del-btn {
        opacity: 1;
      }
    }
  }
}

.btn-default {
  border-radius: 5px;
  &.not-active {
    background: #d1d5da !important;
    border-color: #d1d5da !important;
    color: #7f7f7f !important;
    cursor: default !important;
  }
}

.close-modal-all {
  position: absolute !important;
  z-index: 50;
  top: 0px;
  right: 5px;
  padding: 10px 15px;
  font-size: 36px;
  line-height: 1;
  color: #000;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
  }
  &:before {
    line-height: 1;
    content: "\00d7";
    height: 36px;
    display: block;
  }
}

.text-border {
  border: 2px solid #ecf0f4;
  padding: 20px 30px;
  border-radius: 3px;
  ol,
  ul {
    padding-left: 15px;
    margin-bottom: 0;
  }
}

.cus-check {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  &.big {
    font-size: 18px;
    .ch {
      width: 26px;
      height: 26px;
      min-width: 26px;
      margin-right: 12px;
    }
    input:checked + .ch {
      &:before {
        width: 8px;
        height: 11px;
        margin-top: -7px;
        margin-left: -4px;
      }
    }
  }
  input {
    position: absolute;
    opacity: 0;
    &:checked + .ch {
      background: #5fbeaa;
      opacity: 1;
      border-color: #5fbeaa;
      &:before {
        content: "";
        position: absolute;
        width: 6px;
        height: 9px;
        left: 50%;
        top: 50%;
        margin-top: -6px;
        margin-left: -3px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: rotate(40deg);
      }
    }

    &:disabled ~ * {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  .ch {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 2px solid #cbd6e2;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: -1px;
    transition: all 0.3s ease;
    position: relative;
    &.active {
      background: #5fbeaa;
      border-color: #5fbeaa;
      opacity: 0.7;
    }
  }
}

.input-group {
  input {
    border-right: none !important;
  }
}

body .CodeMirror-code{
    color: #e6e1dc;
}

.input-group-append {
  > * {
    height: 100%;
    border-radius: 0 5px 5px 0;
  }
}

.fields_hidden {
  opacity: 0.65;
  pointer-events: none;
}

.form-group {
  margin-bottom: 30px;
  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="file"],
  select.form-control {
    height: 44px;
  }
  .a-dflex {
    display: flex;
    justify-content: space-between;
  }
  a {
    color: #38c0ac;
  }
}
.swal2-modal {
  &.swal2-show {
    //  display: flex !important;
    //  flex-direction: column;
  }
  .swal2-title {
    //  order: -1;
  }
  .swal2-content {
    padding-left: 20px;
    padding-right: 20px;
  }
  .form-group {
    font-size: 14px;
  }
}

.master-footer {
  background: #f5f8fa;
  padding-top: 20px;
  padding-bottom: 20px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  //z-index: 30;
  border-top: 2px solid #cbd6e2;
  a {
    color: #3fc2af;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
  }
  .btn-next {
    //  opacity: 0.6;
  }

  .btn-clear {
    margin-left: 50px;
    font-size: 10px;
    padding: 4px 8px;
  }

  .prev-block,
  .next-block {
    display: flex;
    align-items: center;
  }
  .prev-block {
    button {
      margin-right: 20px;
    }
  }
  .next-block {
    button {
      margin-left: 30px;
    }
  }
}
.finish-btns {
  display: flex;
  align-items: center;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #2e3f50;
  text-decoration: none;
  background-color: #e6f0f6;
}

.pagesettings {
  background: #fff;
}

input[readonly] {
  background: #fff !important;
  cursor: no-drop;
  &:focus {
    border-color: #cbd6e2 !important;
  }
}

body {
  .vue-image-crop-upload .vicp-wrap {
    width: 800px;
    height: 400px;
  }
  .vue-image-crop-upload
    .vicp-wrap
    .vicp-step2
    .vicp-crop
    .vicp-crop-left
    .vicp-img-container {
    width: 340px;
    height: 280px;
  }
  .vue-image-crop-upload
    .vicp-wrap
    .vicp-step2
    .vicp-crop
    .vicp-crop-left
    .vicp-range {
    width: 340px;
  }
  .vue-image-crop-upload
    .vicp-wrap
    .vicp-step2
    .vicp-crop
    .vicp-crop-left
    .vicp-range
    input[type="range"] {
    width: 240px;
  }
}

@media (min-width: 1440px) {
  .main-list {
    > .row {
      > div {
        flex: 0 0 25%;
        max-width: 25%;
      }
    }
  }
}

@media (min-width: 991px) {
  .mob-el {
    display: none;
  }
}

@media (max-width: 991px) {
  .master-footer {
    padding-top: 10px;
    padding-bottom: 10px;
    transition: all 0.3s ease;
    &.hide {
      transform: translate(0, 100%);
    }
    .btn-md {
      padding: 6px 18px;
    }
  }
  .close-master {
    display: none;
  }
  .btn-line.btn-next:after {
    margin-left: -3px;
  }
  .btn-line.btn-next:after,
  .btn-line.btn-prev:before {
    width: 6px;
    height: 6px;
    border-width: 2px;
  }
  .btn-finish {
    &:after {
      content: none !important;
    }
  }
  .btn-line.btn-prev:before {
    margin-right: 0;
  }

  .mob-modal {
    position: fixed;
    top: 0;
    background: #fff;
    left: 0;
    right: 0;
    z-index: 500;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    padding-top: 30px;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    &.active {
      visibility: visible;
      opacity: 1;
    }
  }

  .close-modal {
    position: absolute !important;
    z-index: 50;
    top: 0px;
    right: 5px;
    padding: 10px 15px;
    font-size: 36px;
    line-height: 1;
    color: #000;
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.3s ease;
    &:hover {
      opacity: 1;
    }
    &:before {
      line-height: 1;
      content: "\00d7";
      height: 36px;
      display: block;
    }
  }

  .mob-none {
    display: none;
  }

  .p-modal {
    padding-top: 60px;
  }

  .hide-footer {
    padding-bottom: 0 !important;
    .master-footer {
      transform: translate(0, 100%) !important;
    }
  }

  .burger {
    cursor: pointer;
    display: block;
    width: 35px;
    margin-top: 0px;
    position: relative;
    z-index: 5;
    margin-left: 40px;

    span {
      display: block;
      height: 3px;
      margin-bottom: 6px;
      background: #fff;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .mob-nav {
    height: inherit !important;
    border: none;
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 300px;
    bottom: 0;
    z-index: 1999;
    padding-top: 80px;
    padding-left: 0px;
    box-shadow: 0px 0 40px 0 rgba(0, 0, 0, 0.2);
    overflow: auto;
    transform: translate(-100%, 0);
    transition: all 0.2s ease-in-out;
    visibility: hidden;
    background: #28475b;
    color: #fff;
    padding-right: 0px;

    a {
      color: #fff;
    }

    .close-modal-nav {
      position: absolute;
      top: 5px;
      right: 18px;
      font-size: 50px;
      line-height: 1; //  color: #000;
      cursor: pointer;
      transform: rotate(-45deg);
      transition: all 0.5s ease-in-out;

      &:before {
        line-height: 1;
        content: "\00d7";
        height: 50px;
        display: block;
        color: #fff;
      }
    }

    &.nav-fix {
      padding-top: 80px;

      .close-modal-nav {
        top: 10px;
      }
    }

    &.active {
      transform: translate(0, 0);
      visibility: visible;

      .close-modal-nav {
        transform: rotate(0);
      }
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none; //	text-align: left;
      display: block;

      .active {
        a {
          //	opacity: 1;
        }
      }
    }

    .main-nav {
      padding-right: 0px;
      line-height: 1.3;
      font-size: 14px;

      a {
        padding-left: 28px;
        position: relative;
      }

      .ico {
        position: absolute;
        left: 25px;
        top: 50%;
        transform: translate(0, -50%);

        svg {
          width: 27px;
          height: 22px;
          fill: #ffffff;
        }
      }
    }

    .main-nav > ul {
      display: block;
      > li {
        display: block;
        margin: 0 0 4px;

        > a {
          text-transform: uppercase;
          display: block;
          padding-top: 18px;
          padding-bottom: 18px;
          background: #3f5a6c;
          margin: 0;
          height: inherit;
        }

        &.parent {
          > a {
            display: flex;
            align-items: center;
            &:after {
              content: "";
              position: relative;
              top: 12px;
              margin-left: 20px;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 5px 4.5px 0 4.5px;
              border-color: #fff transparent transparent transparent;
              display: inline-block;
              transform: rotate(0);
              top: 0;
            }
          }
        }

        > ul {
          padding: 10px 0;
          position: static;
          visibility: visible;
          opacity: 1;
          transform: none;
          min-width: inherit !important;
          background: none;

          &:before {
            visibility: hidden;
          }

          a {
            transition: all 0.3s cubic-bezier(0.82, 0, 0.12, 1);
            position: relative;
            display: block;

            &:hover,
            &:active,
            &:focus {
              text-decoration: none;
            }
          }

          .active > a,
          a:hover {
            opacity: 1;
            background: none;
          }
        }

        li {
          display: block;
          padding-top: 5px;
          padding-bottom: 5px;

          a {
            padding-top: 12px;
            padding-bottom: 12px;
            padding-right: 12px;
          }
        }
      }
    }
  }
  .mask-site {
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    z-index: 1990;
    background: 0 0;
    transition: all 0.2s ease-in-out;
    visibility: hidden;
    &.active {
      background: rgba(0, 0, 0, 0.4);
      visibility: visible;
    }
  }

  .heading {
    padding-top: 26px;
    font-size: 24px;
    padding-bottom: 20px;
    margin-bottom: 40px;
    line-height: 1.3;
    display: none;
  }

  .mob-heading {
    display: block;
  }

  .mob-heading2 {
    background: #2e3f50;
    color: #fff;
    padding-top: 20px;
    .title {
      font-size: 24px;
      margin-bottom: 10px;
    }
  }

  .line-nav {
    margin-bottom: 20px;
    overflow-x: auto;
    .inner {
      display: flex;
      padding-top: 10px;
    }
    .item {
      background: none;
      border: none;
      color: #A39F9F;
      padding-bottom: 10px;
      min-width: 33%;
      position: relative;
      text-align: center;
      padding-left: 5px;
      padding-right: 5px;
      line-height: 1.2;
      &.active,
      &.router-link-exact-active, &.router-link-active {
        color: #fff;
        &:before {
          content: "";
          position: absolute;
          height: 5px;
          left: 0;
          right: 0;
          background: #5FBEAA;
          bottom: 0;
        }
      }
    }
  }

  .list-mod-objects {
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
    }
    .img {
      min-width: 33%;
      margin-right: 20px;
      display: block;
      img {
      }
    }
    .title {
      font-size: 20px;
    }
    .bot-btn,
    .btn {
      margin-left: auto;
    }
    .btn-line {
      min-width: auto !important;
    }
    .info {
      display: block;
      color: #33475b;
    }
    .site {
      text-decoration: underline;
    }
  }

  .bot-btn {
    width: 24px;
    min-width: 24px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    position: relative;
    span {
      height: 4px;
      display: block;
      margin-bottom: 5px;
      border-radius: 50%;
      background: #737373;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &:hover {
      .a-nav {
        opacity: 1;
        visibility: visible;
        transform: translate(0, 0);
      }
    }
  }
  .a-nav {
    position: absolute;
    background: #fff;
    border: 1px solid #e6e6e6;
    top: -5px;
    right: 25px;
    padding: 10px 0;
    opacity: 0;
    visibility: hidden;
    transform: translate(0, 15px);
    transition: all 0.3s ease;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    .link {
      color: #33475d;
      padding: 8px 16px;
      display: block;
      font-size: 14px;
      white-space: nowrap;
      border: none;
      background: none;
    }
  }
  .circle-btn {
    position: fixed;
    right: 8vw;
    bottom: 8vw;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    z-index: 10;
    background: #5fbeaa;
    border: none;
    .plus {
      &:before,
      &:after {
        content: "";
        position: absolute;
        background: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &:before {
        width: 8%;
        height: 50%;
      }
      &:after {
        width: 50%;
        height: 8%;
      }
    }
  }
  .container{
    padding-left: 15px;
    padding-right: 15px;
  }
  .list-nav-icons{
    margin-top: -20px;
    .item{
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background: #fff;
      border-bottom: 1px solid #E6E6E6;
          color: #212529;
    }
    .ico{
      min-width: 15%;
      max-width: 15%;
      margin-right: 20px;
      margin-left: 5px;
      img{
        width: 100%;
     //   border-radius: 50%;
        background: #fff;
        object-fit: contain;
      }
    }
    .email{
      color: #CDD8E1;
    }
  }

  #app{
    background: #fff;
  }
  .off{
    width: 86px;
    margin-left: auto;
    img{
      width: 100%;  
    }
  }
}

@media (min-width: 991px) {
  #app{
    padding-bottom: 40px;
  }
}

@media (max-width: 576px) {
  .mob-nav {
    width: 100%;
    padding-top: 60px;
    .close-modal-nav {
      top: 0;
    }
  }
  .heading {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .main-container {
    padding-left: 15px;
    padding-right: 15px;
  }
  .mes-list .ico img {
    width: 50px;
  }
  .swal2-popup .swal2-title {
    font-size: 22px;
    line-height: 1.3;
  }
  .line-nav .item {
    min-width: 50%;
  }

  .list-mod-objects {
    .img {
      margin-right: 15px;
      min-width: 100px;
      img {
        width: 100px;
        height: 100px;
        object-fit: contain;
        border-radius: 50%;
        border: 1px solid #5fbeaa;
        padding: 3px;
        background: #fff;
      }
    }

    .no-active {
      .img {
        img {
          border: 1px dashed #a1a1a1;
        }
      }
    }
  }
}

@media (max-width: 476px) {
  
  .list-mod-objects {
    .img{
      min-width: 70px;
      img{
        height: 70px;
        width: 70px;
      }
    }
  }
}
</style>
