<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    // 封装scrollTo()方法  滚到哪个位置
    scrollTo(x, y, tiem = 500) {
      this.scroll && this.scroll.scrollTo(x, y, tiem);
    },
    // 封装多次触发下拉事件方法
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    // 重新刷新scroll 可刷新高度
    refresh() {
      // console.log("重新刷新scroll");
      this.scroll && this.scroll.refresh();
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // probeType 指定该选项才会监听到滚动的位置 0和1 默认不监听 2不会监听到滑动的位置 3可以监听滑动
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
      // threshold: -80 下拉距离多少刷新
    });
    // 2.监听滚动的位置
    this.scroll.on("scroll", opsition => {
      // console.log(opsition);
      this.$emit("scroll", opsition);
    });
    // 3.监听滚动到底部(上拉事件)
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载更多------");
      this.$emit("pullingUp");
    });
  }
};
</script>

<style scoped>
/* .wrapper {
  height: calc(100% - 49px);
  overflow: hidden;
  margin-bottom: 49px;
} */
</style>