<template>
  <div class="goods-list-item" @click="itemclick">
    <img v-lazy="showImg" alt @load="imgload" />
    <!-- <img v-lazy="Item.img" alt @load="imgload" /> -->
    <div class="goods-info">
      <p>{{ Item.title }}</p>
      <span class="price">¥{{ Item.price }}</span>
      <span class="collect">{{ Item.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    Item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImg() {
      return this.Item.img || this.Item.image || this.Item.show.img;
    }
  },
  methods: {
    // 监听item 图片加载完成触发的函数
    imgload() {
      // console.log("监听item 图片加载完成触发的函数");
      this.$bus.$emit("itemimgload");
    },
    // 点击某个商品
    itemclick() {
      this.$router.push(`/detail/${this.Item.iid}`);
    }
  }
};
</script>

<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
