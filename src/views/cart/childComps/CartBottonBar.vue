<template>
  <div class="botton-bar">
    <div class="select-all">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkclick" />
      <span>全选</span>
    </div>
    <div class="total-price">合计({{totalPrice}})</div>
    <div class="calculate" @click="calcclick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";

export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.count * item.newPrice;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 1.过滤
      // return !this.cartList.filter(item => !item.checked).length;
      // 2.查找
      // return !this.cartList.find(item => !item.checked);
      // 3.普通遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    checkclick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    },
    calcclick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品");
      }
    }
  }
};
</script>

<style scoped>
.botton-bar {
  position: relative;
  bottom: 133px;
  display: flex;
  height: 40px;
  background-color: #eee;
  align-items: center;
}
.select-all {
  display: flex;
  width: 90px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin: 0 5px 0 10px;
}
.total-price {
  flex: 1;
}
.calculate {
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-color: #ff4500;
  color: #fff;
  text-align: center;
}
</style>