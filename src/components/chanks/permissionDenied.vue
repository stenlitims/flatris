<template>
  <div class="no-objects text-center">
    <h3>Доступ запрещен</h3>
    <router-link
      to="/"
      class="btn btn-lg  btn-or waves-effect"
    >На главную</router-link>
  </div>
</template>

<script>
export default {
  name: "noObjedcts",

  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.no-objects {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}
h3 {
  line-height: 1.4;
  margin-bottom: 40px;
}
.btn {
  padding: 12px 30px;
  font-size: 18px;
}
</style>
