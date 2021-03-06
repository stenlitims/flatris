// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueBus from 'vue-bus'
import App from './App'
//import cusCheckbox from "@/components/global/checkbox"
import cusSwitch from "@/components/global/switch"
import noObjedcts from "@/components/chanks/noObjedcts"
import permissionDenied from "@/components/chanks/permissionDenied"
import toolNav from "@/components/chanks/toolNav"
import mixGlobal from "@/mixin/global"

import router from './router'
import SlideUpDown from 'vue-slide-up-down'
import myUpload from 'vue-image-crop-upload';

import store from './store/index'
import VueLodash from 'vue-lodash'
import VueClipboard from 'vue-clipboard2'



const options = {
  name: 'lodash'
} // customize the way you want to call it

Vue.use(VueLodash, options) // options is optional

Vue.use(VueBus)

Vue.use(VueClipboard)


Vue.config.productionTip = false
Vue.component('cusSwitch', cusSwitch)
Vue.component('noObjedcts', noObjedcts)
Vue.component('permissionDenied', permissionDenied)
Vue.component('toolNav', toolNav)
Vue.component('slide-up-down', SlideUpDown)
Vue.component('myUpload', myUpload)

Vue.mixin(mixGlobal);


window._ = Vue.lodash;

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  data: {
    apiurl: 'https://test.flatris.com.ua/assets/api/api.php',
    mainurl: 'https://test.flatris.com.ua',
  },
  computed: {
    isMobile() {
      if ($(window).width() < 991) {
        return true;
      }
      return false;
    }
  },

  mounted() {
    if (window.innerWidth < 991) {
      this.$store.commit("setIsMobile", true);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 991) {
        this.$store.commit("setIsMobile", true);
      } else {
        this.$store.commit("setIsMobile", false);
      }
    });
  },

  template: '<App/>'
});




let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});