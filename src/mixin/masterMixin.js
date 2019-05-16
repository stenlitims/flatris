export default {
  props: ["steps", "step", "object_id", "namep"],
  data() {
    return {
      errors: [],
      success: false,
      error: [],
      errorsSer: [],
      dataLoad: false,
      formChange: false,
    }
  },
  created() {
    this.clearChenge();
    this.$bus.on(this.steps[this.step].comp, this.send);
    this.$bus.on('saveForm', this.save);
    if (this.$route.name == 'webchess') {
      this.$store.dispatch("getWebchess", this.$route.params.oid);
    };
  },

  beforeDestroy() {
    this.$bus.off(this.steps[this.step].comp, this.send);
    this.$bus.off('saveForm', this.save);
  },

  updated() {
    this.errorUpd();
  },
  mounted() {

    $(document).on('change keypress keydown', ".form input, .form select", () => {
      this.formChange = true;
      window.formChange = true;
    });
  },
  watch: {

  },

  computed: {
    webchess() {
      if (this.$route.name != 'webchess') return false;
      if (!this.$store.state.webchess) return {};
      let webchess = this.$store.state.webchess;
      if (!this.form.type) {
        this.form = {
          ...webchess
        };
      }
      return webchess;
    }
  },
  methods: {
    errorUpd() {
      this.findError();
      this.$emit("btnActive", !this.error.length);
    },
    findError() {
      this.error = [];
      for (let item in this.required) {
        if (!this.form[item]) {
          this.error.push(item);
        }
        if (this.required[item] == 'email' && !this.isAddress(this.form[item])) {
          this.error.push(item);
        }
        if (this.required[item] == 'phone' && !this.isPhone(this.form[item])) {
          this.error.push(item);
        }
      }
    },

    isPhone(phone) {
      //   let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      let pattern = /^\+?(?=.*\d)[\d ]+$/;
      if (pattern.test(phone)) {
        return true;
      }
      return false;
    },
    post(input) {
      $.post(
        this.$root.apiurl,
        input,
        data => {
          if (data) {
            //  return data;
          }
        },
        "json"
      );
    },
    linkScroll(target) {
    //  $('.r-content-master').off("scroll");
 //     $('.master-sidebar .item').removeClass('active');
  //    $(this).addClass('active');
      $('.r-content-master').scrollTo(target, 300, {margin:true});
    },
    onScroll(event) {
      var scrollPos = $('.r-content-master').scrollTop();
      $('.master-sidebar .item').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if(!refElement.position()) return;
      //  var refElement = $('#lang');
      //  console.log(refElement.position().top, scrollPos);
        if (refElement.position().top <= 0 && refElement.position().top + refElement.height() >= 0) {
          $('.master-sidebar .item').removeClass("active");
          currLink.addClass("active");
        } else {
          currLink.removeClass("active");
        }
      });
    }

  }
}