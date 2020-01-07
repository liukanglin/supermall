<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tabBar></main-tabBar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar.vue";
import Icon from "content/Icon/Icon.vue";
import SvgIcon from "content/Icon/svg.vue";
export default {
  name: "App",
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
};
</script>
<style scoped>
@import "./assets/css/base.css";
</style>
