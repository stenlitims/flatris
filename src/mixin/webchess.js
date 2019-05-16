export default {
  created() {
    if (!this.$store.state.webchess) {
      this.$store.dispatch("getWebchess", this.$route.params.oid);
    }

  },
  methods: {
    saveWebchess(data, key) {
      if (!this.$store.state.webchess) return;
      let webchess = this.lodash.cloneDeep(this.$store.state.webchess);
      webchess[key] = data;
      $.post(
        this.$store.state.apiurl, {
          action: "setWebchess",
          id: this.$route.params.oid,
          data: webchess
        },
        data => {
          //  console.log(data);
          this.$store.commit('getWebchess', webchess);
          this.saveOk();
        },
        "json"
      );
    },
  }
}