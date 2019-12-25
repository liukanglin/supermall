import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "components/common/toast";
import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;
// 安装自定义封装的插件
Vue.use(toast);

// 解决移动端点击延迟300毫秒
FastClick.attach(document.body);

// 懒加载插件 把需要使用懒加载的img标签的 src属性 替换成 v-lazy
Vue.use(VueLazyLoad, {
  error: require("./assets/img/common/placeholder.png")
});

// 在vue 中$bus 默认是没有的 所以在vue的原型添加$bus
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
