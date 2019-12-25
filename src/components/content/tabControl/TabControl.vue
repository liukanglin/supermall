<template>
  <div class="tab-Control">
    <div
      class="tab-Control-item"
      :class="{ active: currentIndex === index }"
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 给Home父组件 传值
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style scoped>
.tab-Control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
}
.tab-Control-item {
  flex: 1;
}
.tab-Control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>
