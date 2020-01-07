<template>
  <Scroll id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item ,index) in categories"
        :key="index"
        @click="itemClick(index)"
        :class="{active: index === currentIndex}"
      >{{item.title}}</div>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "common/scroll/Scroll";
export default {
  name: "tab-menu",
  props: {
    categories: Array
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    }
  },
  components: {
    Scroll
  }
};
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>