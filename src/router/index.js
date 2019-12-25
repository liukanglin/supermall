import Vue from "vue";
import VueRouter from "vue-router";

// 报错原因 可以参考这里  https://blog.csdn.net/weixin_43202608/article/details/98884620
//  下面三行行代码 解决浏览器报错问题 报错信息： vue-router.esm.js?8c4f:2051 Uncaught (in promise)

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const Home = () => import("views/home/Home");
const Cart = () => import("views/cart/Cart");
const Category = () => import("views/category/Category");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    component: Detail
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
