export default {
  data() {
    return {

    }
  },

  created() {
    this.clearChenge();
    this.$bus.on(this.$route.params.id, this.send);
    window.routeParam = {
      name: this.$route.name,
      params: this.$route.params
    };
  },

  beforeDestroy() {
  //  console.log(this.$route.params.id);
    this.$bus.off('user', this.send);
    this.$bus.off('notification', this.send);
    this.$bus.off(this.$route.params.id, this.send);
  },

  methods: {
    
  }
}
