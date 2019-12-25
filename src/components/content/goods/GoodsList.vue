<template>
  <div class="goods-list">
    <GoodsListItem v-for="(item,index) in goodslist" :key="index" :Item="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goodslist: {
      type: Array,
      // 当传入的属性时对象或者是数组时必须是个函数，如果是字符串等简单类型 则不用定义成函数
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods-list {
  display: flex;
  /* 是否换行 */
  flex-wrap: wrap;
  /* 自动分配空间 */
  justify-content: space-around;
  padding: 3px;
}
</style>
