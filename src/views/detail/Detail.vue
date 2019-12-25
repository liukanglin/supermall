<template>
  <div id="detail">
    <!--  <ul>
      <li v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</li>
    </ul>-->
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="detailnav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll">
      <detail-seiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-good-info :detail-info="detailInfo" @imageload="imageload" />
      <detail-goods-param :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goodslist="recommends" ref="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isshow" />
    <detail-bottm-bar @addTocart="addTocart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSeiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodInfo from "./childComps/DetailGoodInfo";
import DetailGoodsParam from "./childComps/DetailGoodsParam";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottmBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import { itemImgListener, backTopMixin } from "@/common/mixin";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSeiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailBottmBar,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemImgListener, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTops: [],
      currentIndex: 0
    };
  },
  created() {
    // console.log(this.$route.params.iid);
    this.iid = this.$route.params.iid;

    // 获取商品详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 1.商品轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4. 获取商品图片信息
      this.detailInfo = data.detailInfo;
      // 5. 获取商品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 获取商品推荐
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  methods: {
    ...mapActions(["addCart"]),
    imageload() {
      this.$refs.scroll.refresh();
      this.themeTops = [];
      this.themeTops.push(0);
      // this.themeTops.push(this.$refs.params.$el.offsetTop);
      // this.themeTops.push(this.$refs.comment.$el.offsetTop);
      // this.themeTops.push(this.$refs.recommends.$el.offsetTop);
      this.themeTops.push(this.$refs.params.$el.offsetTop - 50);
      this.themeTops.push(this.$refs.comment.$el.offsetTop - 50);
      this.themeTops.push(this.$refs.recommends.$el.offsetTop - 50);
      this.themeTops.push(Number.MAX_VALUE);
      // console.log(this.themeTops);
    },
    itemClick(index) {
      // console.log(this.themeTops[index]);
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100);
    },
    contentscroll(opsition) {
      /*  [0, 4042, 5022, 5339]
          0 >= 4042   = 0
          4042 >= 5022 = 1
          5022 >= 5339 = 2
          > 5022 = 3
     */
      let opsitionY = -opsition.y;
      const Length = this.themeTops.length;
      // 普通做法
      /* for (let i = 0; i < Length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < Length - 1 &&
            opsitionY >= this.themeTops[i] &&
            opsitionY <= this.themeTops[i + 1]) ||
            (i === Length - 1 && opsitionY >= this.themeTops[i]))
        ) {
          this.currentIndex = i;
        }
      } */
      // back做法
      for (let i = 0; i < Length - 1; i++) {
        if (
          this.currentIndex !== i &&
          (opsitionY >= this.themeTops[i] && opsitionY < this.themeTops[i + 1])
        ) {
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = this.currentIndex;
        }
      }
      // this.$refs.detailnav.currentIndex = this.currentIndex;
      this.isshow = -opsition.y > 1000;
    },
    addTocart() {
      // 1.创建对象
      const probuct = {};
      // 2.对象信息
      probuct.iid = this.iid;
      probuct.imgURL = this.topImages[0];
      probuct.title = this.goods.title;
      probuct.desc = this.goods.desc;
      probuct.newPrice = this.goods.nowPrice;
      // 3.添加到Store中 普通分发actions
      // this.$store.commit("addCart", probuct);
      /* this.$store.dispatch("addCart", probuct).then(res => {
        console.log(res);
      }); */
      // 利用map 辅助函数
      this.addCart(probuct).then(res => {
        this.$toast.show(res, 2000);
      });
    }
  },
  destroyed() {
    this.$bus.$off("itemimgload", this.itemImgLoad);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  top: -1px;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>