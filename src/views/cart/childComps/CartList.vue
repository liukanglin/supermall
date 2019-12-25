<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  props: {
    cartList: {
      type: Array,
      default() {
        [];
      }
    }
  },
  components: {
    Scroll,
    CartListItem
  }
};
</script>

<style scoped>
.cart-list {
  height: 100vh;
  /* height: calc(100% - 44px - 49px); */
}
.content {
  /* height: 100%; */
  /* height: calc(100% - 44px - 49px -40px);
  overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}
</style>