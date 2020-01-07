<template>
  <NavBar>
    <div slot="left" class="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="center">
      <div
        class="center-item"
        :class="{active: currentIndex === index}"
        v-for="(item,index) in titles"
        :key="index"
        @click="itemClick(index)"
      >{{item}}</div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    },
    // 点击返回
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
}

.center-item {
  flex: 1;
  /* padding: 0 20px; */
  font-size: 14px;
  font-weight: normal;
}

.active {
  color: var(--color-high-text);
}

.left img {
  margin: 10px 0 0 -20px;
}
</style>