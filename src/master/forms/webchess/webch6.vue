<template>
  <div class="form">
    <h3 class="text-center">Веб-шахматка для сайта готова!</h3>
    <div class="text-center">
      <a
        :href="url"
        target="_blank"
        class="btn btn-md btn-cancel waves-effect"
      >Предварительный просмотр</a>
    </div>

    <div class="wrap-code">
      <div class="row-b-code">
        <div class="btns">
          <div class="btn" @click="lang='uk'" :class="{'active': this.lang == 'uk'}">UA</div>
          <div class="btn" @click="lang='ru'" :class="{'active': this.lang == 'ru'}">RU</div>
        </div>
        <p>Чтобы разместить веш-шахматку на вашем сайте - скопируйте и вставьте код на вашем сайте перед закрывающим тегом body</p>
      </div>

      <!-- <textarea id="code" name="code" v-model="code"></textarea> -->
      <codemirror v-model="code" ref="myEditor" :options="editorOption"></codemirror>
    </div>

    <div class="btns text-center">
      <button class="btn btn-md waves-effect" v-clipboard:copy="code">Скопировать код</button>
      <button class="btn btn-md waves-effect" @click="sendToEmail">Отправить на email</button>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import { codemirror } from "vue-codemirror-lite";

export default {
  name: "webCh6",
  mixins: [masterMixin],
  components: {
    codemirror
  },
  data() {
    return {
      errors: [],
      success: false,
      object: {},
      form: {},
      cid: "",
      upd: false,
      required: {},
      lang: "ru",
      editorOption: {
        mode: { name: "xml", alignCDATA: true },
        lineNumbers: true,
        theme: "ambiance"
      }
    };
  },
  created() {
    // if (!window.loadsScriptOb) {
    //   this.loadsScript();
    // }
    this.getCid();
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  computed: {
    editor() {
      return this.$refs.myEditor.editor;
    },
    url() {
      let url =
        this.$root.mainurl +
        "/public/chess/?cid=" +
        this.cid +
        "&ut=web&hl=" +
        this.lang;
      if (this.$store.state.webchess) {
        if (!this.$store.state.webchess.color)  return url;
        let main = this.$store.state.webchess.color.main;
        url = url + "&color=" + main.replace("#", "");
      }
      return url;
    },
    code() {
      let code = `
<script type="text/javascript">
    (function (d,s,u,e,p) {
        p=d.getElementsByTagName(s)[0],e=d.createElement(s),e.async=1,e.src=u,p.parentNode.insertBefore(e, p);
    })(document, 'script', '${this.$root.mainurl}/public/web.js?cid=${
        this.cid
      }&hl=${this.lang}');
&lt;/script>
`;

      code = code.replace("&lt;", "<");
      return code;
    }
  },
  methods: {
    getCid() {
      $.post(
        this.$root.apiurl,
        {
          id: this.object_id,
          action: "getCid"
        },
        data => {
          if (data) {
            this.cid = data.cid;
          }
        },
        "json"
      );
    },

    sendToEmail() {
      (async () => {
        const { value: sw } = await swal({
          title: "Отправить?",

          showCancelButton: true,
          confirmButtonText: "Да, отправить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "btn btn-line btn-md waves-effect",
          confirmButtonClass: "btn btn-or btn-md waves-effect"
        });

        if (sw) {
          $.post(
            this.$root.apiurl,
            {
              action: "sendWebchessCode",
              code: this.code
            },
            data => {
              if ((data.type = "success")) {
                swal("Отправлено!", "", "success");
              }
            },
            "json"
          );
        }
      })();
    },

    send(e) {
      this.$emit("footerBtn", e);
      // if (e == "prev") {
      //   this.$emit("footerBtn", e);

      //   return true;
      // }

      // $.post(
      //   this.$root.apiurl,
      //   {
      //     action: "setWebchessPrLang",
      //     id: this.object_id,
      //     lang: lang
      //   },
      //   data => {
      //     if (data) {
      //       console.log(data);
      //     }
      //   },
      //   "json"
      // );

      //   this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.cm-error {
  color: #e6e1dc;
}
.form {
  max-width: inherit !important;
}
.wrap-code {
  margin-top: 40px;
  margin-bottom: 40px;
  p {
    margin-bottom: 5px;
  }
}

.btns {
  .btn {
    margin: 10px;
  }
}

#code {
  position: absolute;
  opacity: 0;
  display: block !important;
}

.row-b-code {
  display: flex;
  align-items: flex-start;
  .btns {
    margin-right: 30px;
  }
  .btn {
    margin: 0;
    border-radius: 4px 4px 0 0;
    width: 60px;
    border-bottom: none;
    background: #f5f8fa;
    border-color: #cbd6e2;
    color: #33475b;
    &.active {
      background: #cbd6e2;
    }
  }
}
</style>
