<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="TabControl"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabcontrol1"
      v-show="istabcontrolfixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="isShowBackTop"
      :pull-up-load="true"
      @pullingUp="LoadMore"
    >
      <home-swiper :banners="banners" @swiperimgload="swiperimgload" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabcontrol" />
      <GoodsList :goodslist="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isshow" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSweiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "@/common/utils";
import { itemImgListener, backTopMixin } from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemImgListener, backTopMixin], // 混入
  data() {
    return {
      banners: [], //轮播图数据
      recommends: [], //推荐数据
      goods: {
        // 首页全部商品数据
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop", // 记录发送请求的商品类型
      // isshow: false, // 记录回到顶部是否显示
      taboffsettop: 0, // 记录选项卡到顶部的距离
      istabcontrolfixed: false, // 记录TabControl 是否吸顶
      scrolly: 0 // 记录组件离开时的y值
    };
  },
  methods: {
    /*
     * 事件监听相关
     */

    // 决定获取哪个类型的数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol.currentIndex = index;
    },
    // 调用scroll子组件中的scrollTo()方法  回到顶部
    /*  backClick() {
      // 获取scroll子组件中的scrollTo()方法  回到顶部
      this.$refs.scroll.scrollTo(0, 0);
    }, */
    // 监听滚动位置 控制是否显示回到顶部
    isShowBackTop(opsition) {
      // 1.回到顶部是否显示
      this.isshow = -opsition.y > 1000;
      // 2.TabControl是否吸顶
      this.istabcontrolfixed = -opsition.y > this.taboffsettop;
    },
    // 上拉加载更多
    LoadMore() {
      // console.log("上拉加载更多------");
      this.getHomeGoods(this.currentType);
    },
    // 轮播图图片加载完成时
    swiperimgload() {
      // console.log(this.$refs.tabcontrol.$el.offsetTop);
      this.taboffsettop = this.$refs.tabcontrol.$el.offsetTop;
    },
    /*
     * 网络请求相关
     */
    // 获取多个数据(轮播图，推荐)
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取商品数据类型
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 多次触发上拉加载事件
        this.$refs.scroll.finishPullUp();
      });
    }
  },
  computed: {
    // 计算显示goods中哪类商品
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    // 进入组件时让页面回到离开时的位置
    this.$refs.scroll.scrollTo(0, this.scrolly, 0);
    // 进入组件活跃时 刷新scroll 避免一些bug
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.组件离开时记录对应的位置
    this.scrolly = this.$refs.scroll.scroll.y;
    // 2.取消首页的图片加载监听
    this.$bus.$off("itemimgload", this.itemImgLoad);
  },
  created() {
    // 1.请求多个数据(轮播图，推荐)
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 防抖函数(当图片加载完成会频繁的调用refresh函数，因此可以控制函数调用的频率，提高性能)
    // const refresh = debounce(this.$refs.scroll.refresh, 20);
    // this.itemImgLoad = () => refresh();
    // 3.监听item图片加载完成
    // this.debounce(this.$refs.scroll.refresh, 50);
    // this.$refs.scroll.refresh();
    /*
     *  BUG 一修改保存代码 就会报错 重新刷新则不会报错
     */
    // this.$bus.$on("itemimgload", this.itemImgLoad);
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  /* width: 100vw; */
  /* position: relative; */
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* 使用原生滚动时的样式 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
  position: relative;
  z-index: 9;
}
.TabControl {
  position: relative;
  top: -1px;
  z-index: 9;
  /* position: sticky; */
  /* top: 40px;
  z-index: 8; */
}
.content {
  position: absolute;
  top: 43px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100% - 49px);
  overflow: hidden;
  margin-bottom: 49px;
} */
</style>
