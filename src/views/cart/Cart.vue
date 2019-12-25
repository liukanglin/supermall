<template>
  <div id="cart">
    <nav-bar class="bav-bar">
      <div slot="center">购物车({{Length}})</div>
    </nav-bar>
    <cart-list :cart-list="cartList" />
    <cart-botton-bar />
    <!-- <toast /> -->
  </div>
</template>

<script>
import CartList from "./childComps/CartList";
import CartBottonBar from "./childComps/CartBottonBar";

import NavBar from "components/common/navbar/NavBar";
// import Toast from "components/common/toast/Toast";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottonBar
    // Toast
  },
  computed: {
    ...mapGetters(["Length", "cartList"])
  }
};
</script>

<style scoped>
.bav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}
</style>
