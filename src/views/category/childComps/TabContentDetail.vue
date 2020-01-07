<template>
  <grid-view>
    <goods-list-item v-for="(item,index) in categoryDetail" :key="index" :Item="item" />
  </grid-view>
</template>

<script>
import GridView from "common/GridView/GridView";
import GoodsListItem from "../../../components/content/goods/GoodsListItem";
export default {
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GridView,
    GoodsListItem
  }
};
</script>

<style>
</style>